class A2WP {
    constructor({getEndpoint, postEndpoint, templatePath, customFunc, targetPath, args, timer, catDefs}) {
        this.url1 = "https://amilia-proxy.azurewebsites.net/api/callamilia"; 
        this.url2 = "https://sbvpastg.wpenginepowered.com/wp-json/wp/v2/"; 
        this.url3 = "https://amilia-img-proxy.azurewebsites.net/api/GetImg";
        this.getEndpoint = getEndpoint; 
        this.postEndpoint = postEndpoint; 
        this.templatePath = templatePath; 
        this.customFunc = customFunc; 
        this.targetPath = targetPath; 
        this.args = args; 
        this.timer = timer; 
        this.catDefs = catDefs; 
    }

    checkRun(timer) {
        let check = [false, false, false]; 
        const currentPath = window.location.pathname.split("/"); 

        check[0] = (currentPath[1] == this.targetPath.parent) ? true : false; 
        check[1] = ((currentPath[2] != "") == this.targetPath.child) ? true : false;

        if (localStorage.lastChecked == null) {
            localStorage.setItem("lastChecked", new Date().getTime()); 
            check[2] = true; 
        } else {
            const currentDate = new Date().getTime(); 

            switch(timer) {
                case "hour": 
                    if (((currentDate - localStorage.lastChecked) / 3600000) >= 1) {
                        check[2] = true; 
                        localStorage.lastChecked = currentDate; 
                    }
                    break; 
                case "day": 
                    break; 
                default: 
                    check[2] = true; 
            }
        }

        check[2] = true; // Testing
    
        return (check[0] && check[1] && check[2]); 
    }

    async fetchTemplate(path) {
        try {
            const response = await fetch(path); 
    
            if (!response.ok) {
                throw new Error("Could not find HTML template file"); 
            }
    
            return response.text(); 
        } catch(error) {
            console.log(error); 
        }
    }

    async fetchData({url, method, site, endpoint = null, arg = null}) {
        let fetchInfo = {
            method: method, 
            headers: {
                "Content-Type": "application/json"
            }
        }

        if (endpoint) fetchInfo.body = JSON.stringify({"endpoint": endpoint}); 
        if (arg) url = `${url}?${arg}`; 

        try {
            const response = await fetch(url, fetchInfo).then(function(response) {
                if (!response.ok) {
                    throw new Error(`Unable to fetch data from ${site}`); 
                } 
    
                return response.json(); 
            }).then(function(data) {
                console.log(data); // <-- for debugging
                return data; 
            }); 
    
            return await response;
        } catch(error) {
            console.log(error); 
        }
    }

    async postData({url, endpoint, content = null, author = null, title = null, status = null, slug = null, actCats = null, ageGroups = null, imgUrl = null}) {
        imgUrl = null; // Testing only
        let headers; 
        let body; 

        if (imgUrl) {
            headers = {
                "Content-Type": "image/jpeg" // may be unnecessary
            }

            body = {
                "imgUrl": imgUrl
            }
        } else {
            headers = {
                "Content-Type": "application/json", 
                "X-WP-Nonce": apiData.nonce
            }

            body = {
                "title": title, 
                "status": status,
                "slug": slug,
                "content": content, 
                "author": author, 
                "activity-categories": actCats,
                "age-groups": ageGroups
            }
        }

        try {
            const response = await fetch(`${url}${endpoint}`, {
                method: "POST", 
                headers: headers, 
                body: JSON.stringify(body)
            }).then(function(response) {
                if (!response.ok) {
                    throw new Error("Unable to post data"); 
                }
    
                return (imgUrl) ? response.blob() : response.json(); 
            }).then(function(data) {
                console.log(data); // <-- for debugging
                return data; 
            }); 
    
            return await response; 
        } catch(error) {
            console.log(error); 
        }
    }

    updateActDOM({page, amItem}) {
        let locations = ""; 
        amItem.Schedules[0].Locations.forEach(location => {
            locations += `${location.Name}<br>`; 
        });
        const price = (amItem.Price != 0) ? `$${amItem.Price}` : "Free"; 
    
        page.querySelector("#amilia-wp-activity-schedule-summary").innerHTML = amItem.ScheduleSummary; 
        page.querySelector("#amilia-wp-activity-dates").innerHTML = `${amItem.StartDate} to ${amItem.EndDate}`; 
        page.querySelector("#amilia-wp-activity-location").innerHTML = locations; 
        page.querySelector("#amilia-wp-activity-price").innerHTML = price; 
        page.querySelector("#amilia-wp-activity-register-btn").href = amItem.SecretUrl; 
        page.querySelector("#amilia-wp-activity-responsible-name").innerHTML = amItem.ResponsibleName; 
        page.querySelector("#amilia-wp-activity-note").innerHTML = amItem.Note; 
        page.querySelector("#amilia-wp-activity-img").src = amItem.PictureUrl; 
        page.querySelector("#amilia-wp-activity-img").alt = `${amItem.Name} image`; 
        page.querySelector("#amilia-wp-activity-descript").innerHTML = `<p>${amItem.Description}</p>`; 

        return page; 
    }

    async call() {
        if (!this.checkRun(this.timer)) return; 

        console.log(this.constructor.name, "is running"); 
        let template = await this.fetchTemplate(this.templatePath); 

        if (!template) return; 

        let parser = new DOMParser, 
            page = parser.parseFromString(template, "text/html"); 

        let amObj = await this.fetchData({url: this.url1, method: "POST", site: "Amilia", endpoint: this.getEndpoint}); 
        if (typeof amObj == "undefined") return; // No Amilia data to send

        // Test
        // amObj = [amObj[1], amObj[13], amObj[21]]; 

        let wpObj = await this.fetchData({url: `${this.url2}${this.getEndpoint}`, method: "GET", site: "Wordpress", arg: this.args.wp}); 
        
        amObj.some(amItem => {
            if (amItem.Status != "Hidden") {
                return this.customFunc({page: page, wpObj: wpObj, amItem: amItem, postData: this.postData, updateActDOM: this.updateActDOM, url: this.url2, endpoint: this.postEndpoint, catDefs: this.catDefs});
            }
        });
    }
}