class A2WP {
    constructor({amilia, wp, targetPath, templatePath = null, categories = null}) {
        this.amilia = amilia; 
        this.wp = wp; 
        this.amilia.url = "https://amilia-img-proxy.azurewebsites.net/api/GetAmilia"; 
        this.wp.url = "https://sbvpastg.wpenginepowered.com/wp-json/wp/v2/";
        this.targetPath = targetPath; 
        this.catDefs = categories; 
        this.customFuncs = []; 
    }

    // Checks if script is eligible to run
    checkRun(path) {
        let check = [false, false]; 
        const regex1 = /\{[^\}]*\?*\}/; 
        const regex2 = /\/[^\/]+$/; 
        
        const window = window.location.pathname; 
        const targetChild = path.match(regex1); 
        const currentChild = window.match(regex2); 

        const targetParent = path.replace(targetChild, ""); 
        const currentParent = window.replace(currentChild, ""); 

        // Checks whether or not window path needs a child to run
        const optional = (targetChild && !targetChild.includes("?")) ? false : true; 

        check[0] = (targetParent == currentParent); 
        check[1] = (currentChild) ? true : false; 

        if (!optional) return (check[0] && check[1]); 

        if (!check[0]) check[0] = (targetParent == window); 
        check[1] = true; 

        return (check[0] && check[1]); 
    }

    // Grabs HTML template's contents
    async fetchTemplate(path) {
        try {
            const response = await fetch(path); 
    
            if (!response.ok) throw new Error("Could not find HTML template file"); 
    
            return await response.text(); 
        } catch(error) {
            console.log(error); 
        }
    }

    async fetchData({url, method, site, endpoint = null, args = null}) {
        let info = {
            method: method, 
            headers: {
                "Content-Type": "application/json"
            }
        }; 
        if (args) url = `${url}?${args}`; 
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

    async postData({urlBuilder, bodyData, imgUrl = null}) {
        const url = urlBuilder.url; 
        const endpoint = urlBuilder.endpoint; 
        const id = (urlBuilder.id) ? urlBuilder.id : ""; 

        try {
            // Creates post
            let postRes = await fetch(`${url}${endpoint}/${id}`, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json", 
                    "X-WP-Nonce": apiData.nonce
                }, 
                body: JSON.stringify(bodyData)
            }); 

            if (!postRes.ok) throw new Error("Unable to create post"); 
            postRes = await postRes.json(); 

            // Creates featured media (if not already set)
            if (imgUrl && postRes.featured_media == 0) {
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

    // Adds custom function to iterable array (customFuncs)
    addFunc(func) {
        this.customFuncs.push(func); 
    }

    async call() {
        if (!this.checkRun(this.targetPath)) return;
        console.log("A2WP is running");  

        let template; 
        if (this.templatePath) {
            template = await this.fetchTemplate(this.templatePath)
        } else {
            // Get content from wordpress
        }

        if (!template) return; 

        let parser = new DOMParser, 
            page = parser.parseFromString(template, "text/html"); 

        let amObj = await this.fetchData({url: this.amilia.url, method: "POST", site: "Amilia", endpoint: this.amilia.endpoint, args: this.amilia.args}); 
        if (typeof amObj == "undefined") return; // No Amilia data, quit script
        amObj = (amObj.Items) ? amObj.Items : [amObj]; 

        let wpObj = await this.fetchData({url: `${this.wp.url}${this.wp.endpoint}`, method: "GET", site: "Wordpress", args: this.wp.args}); 
        if (wpObj == "undefined") wpObj = []; 

        // Run data through all custom funcs
        // NOTE: Should always return 1 JSON object with everything inside
        let results = {amObj: amObj, wpObj: wpObj, page: page, catDefs: this.catDefs}; 

        this.customFuncs.forEach(customFunc => {
            results = customFunc({input: results}); 
        }); 

        // Generate url from results
        const urlBuilder = {
            url: this.wp.url, 
            endpoint: this.wp.endpoint, 
            id: results.id
        }

        const newAmObj = results.amObj; 

        for (const amItem in newAmObj) {
            // May need to put this in an async function? 
            const imgUrl = amItem.PictureUrl; 
            const bodyData = {
                "title": `API TEST: ${amItem.Name}`,
                "author": 43,
                "content": amItem.content, 
                "status": "publish", 
                "slug": `activity-${amItem.Id}`,
                "activity-categories": amItem.catIds, 
                "age-groups": amItem.ageGroups
            }; 

            // Post with resulting data 
            this.postData({urlBuilder: urlBuilder, bodyData: bodyData, imgUrl: imgUrl}); 
        }
    }
}