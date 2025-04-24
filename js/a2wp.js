class A2WP {
    constructor({getEndpoint, postEndpoint, templatePath, customFunc, targetPath, args, timer = "none", catDefs = null}) {
        this.url1 = "https://amilia-proxy.azurewebsites.net/api/callamilia"; 
        this.url2 = "https://sbvpastg.wpenginepowered.com/wp-json/wp/v2/"; 
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
        let info = {
            method: method, 
            headers: {
                "Content-Type": "application/json"
            }
        }; 
        if (arg) url = `${url}?${arg}`; 
        if (endpoint) info.body = JSON.stringify({"endpoint": endpoint}); 

        try {
            let getRes = await fetch(url, info); 

            if (!getRes.ok) throw new Error(`Unable to fetch data from ${site}`);
    
            getRes = await getRes.json(); 
            console.log(getRes); // Testing
            return getRes;
        } catch(error) {
            console.log(error); 
        }
    }

    async postData({url, endpoint, title = null, author = null, content = null, status = null, slug = null, actCats = null, ageGroups = null, imgUrl = null}) {
        try {
            // Creates post
            let postRes = await fetch(`${url}${endpoint}`, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json", 
                    "X-WP-Nonce": apiData.nonce
                }, 
                body: JSON.stringify({
                    title, 
                    status, 
                    slug, 
                    content, 
                    author, 
                    "activity-categories": actCats, 
                    "age-groups": ageGroups
                })
            }); 

            if (!postRes.ok) throw new Error("Unable to create post"); 
            postRes = await postRes.json(); 

            // Creates featured media (if not already set)
            if (postRes.featured_media == 0) {
                let postRes2 = fetch("https://amilia-img-proxy.azurewebsites.net/api/GetImg", {
                    method: "POST",
                    body: JSON.stringify({
                        "getUrl": imgUrl, 
                        "postUrl": `${url}${endpoint}${postRes.id}`
                    })
                }); 
    
                if (!postRes2.ok) throw new Error("Unable to create image"); 
            }
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
                return this.customFunc({page: page, wpObj: wpObj, amItem: amItem, postData: this.postData, updateActDOM: this.updateActDOM, createImg: this.createImg, url: this.url2, endpoint: this.postEndpoint, catDefs: this.catDefs});
            }
        });
    }
}