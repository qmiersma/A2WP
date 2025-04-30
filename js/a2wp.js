class A2WP {
    constructor({amEndpoint, wpEndpoint, templatePath, customFunc, targetPath, args, timer = "none", catDefs = null}) {
        this.url1 = "https://amilia-img-proxy.azurewebsites.net/api/GetAmilia"; 
        this.url2 = "https://sbvpastg.wpenginepowered.com/wp-json/wp/v2/"; 
        this.amEndpoint = amEndpoint; 
        this.wpEndpoint = wpEndpoint; 
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

            // console.log(localStorage.lastChecked); 
            // console.log(currentDate); 
            // console.log(((currentDate - localStorage.lastChecked) / 3600000)); 

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
    
            if (!response.ok) throw new Error("Could not find HTML template file"); 
    
            return await response.text(); 
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

    async postData({url, endpoint, title = null, author = null, content = null, status = null, slug = null, actCats = null, ageGroups = null, imgUrl = null, id = ""}) {
        try {
            // Creates post
            let postRes = await fetch(`${url}${endpoint}/${id}`, {
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
            if (imgUrl && postRes.featured_media == 0) {
                console.log("running"); 
                let postRes2 = fetch("https://amilia-img-proxy.azurewebsites.net/api/GetImg", {
                    method: "POST",
                    body: JSON.stringify({
                        "getUrl": imgUrl, 
                        "postUrl": `${url}${endpoint}/${postRes.id}`
                    })
                });  
            }

            console.log(`Activity ${postRes.id} created/updated`);
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

        const startDate = new Date(amItem.StartDate).toLocaleDateString(); 
        const endDate = new Date(amItem.EndDate).toLocaleDateString(); 
    
        page.querySelector("#amilia-wp-activity-schedule-summary").innerHTML = amItem.ScheduleSummary; 
        page.querySelector("#amilia-wp-activity-dates").innerHTML = `${startDate} to ${endDate}`; 
        page.querySelector("#amilia-wp-activity-location").innerHTML = locations; 
        page.querySelector("#amilia-wp-activity-price").innerHTML = price; 
        page.querySelector("#amilia-wp-activity-register-btn > a").href = amItem.SecretUrl; 
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

        let amObj = await this.fetchData({url: this.url1, method: "POST", site: "Amilia", endpoint: this.amEndpoint}); 
        if (typeof amObj == "undefined") return; // No Amilia data to send

        amObj = (amObj.Items) ? amObj.Items : [amObj]; 

        let wpObj = await this.fetchData({url: `${this.url2}${this.wpEndpoint}`, method: "GET", site: "Wordpress", arg: this.args.wp}); 
        
        amObj.some(amItem => {
            if (amItem.Status != "Hidden") {
                return this.customFunc({page: page, wpObj: wpObj, amItem: amItem, postData: this.postData, updateActDOM: this.updateActDOM, url: this.url2, endpoint: this.wpEndpoint, catDefs: this.catDefs});
            }
        });
    }
}