class A2WP {
    constructor({amilia, wp, targetPath, categories = null, msg = null}) {
        this.amilia = amilia; 
        this.wp = wp; 
        this.amilia.url = "https://amilia-img-proxy.azurewebsites.net/api/GetAmilia"; 
        this.wp.url = "https://sbvpastg.wpenginepowered.com/wp-json/wp/v2/";
        this.targetPath = targetPath; 
        this.catDefs = categories; 
        this.customFuncs = []; 
        this.window = window.location.pathname; 
        this.msg = msg; 
    }

    // Checks if script is eligible to run
    checkRun(path, window) {
        let check = [false, false]; 
    
        const targetChild = path.match(/\{[^\}]*\?*\}*\//); 
        const currentChild = window.match(/[^\/]*\/*$/); 

        const targetParent = path.replace(targetChild, ""); 
        const currentParent = (targetChild) ? window.replace(currentChild, "") : window; 

        // console.table({targetParent, currentParent, targetChild, currentChild});

        // Checks whether or not window path needs a child to run
        const optional = (targetChild && !targetChild.includes("?")) ? false : true; 

        check[0] = (targetParent == currentParent); 
        check[1] = (currentChild) ? true : false; 

        if (!optional) return (check[0] && check[1]); 

        if (!check[0]) check[0] = (targetParent == window); 
        check[1] = true; 

        return (check[0] && check[1]); 
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
            // console.log(getRes); // Testing
            return getRes;
        } catch(error) {
            console.log(error); 
        }
    }

    async delete(url) {
        try {
            let delRes = await fetch(url, {
                method: "DELETE", 
                headers: {
                    "X-WP-Nonce": apiData.nonce
                }
            }); 

            if (!delRes.ok) throw new Error("Failed to delete item"); 
            delRes = await delRes.json(); 
            console.log(delRes); 

            console.log(`${delRes.id}: Deleted`);
        } catch(error) {
            console.log(error); 
        }
    }

    async postData({urlBuilder, bodyData, imgUrl = null, msg = null}) {
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
            // console.log(postRes); // Testing

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

            console.log(`${postRes.id}: ${this.msg}`);
        } catch(error) {
            console.log(error); 
        }
    }

    // Adds custom function to iterable array (customFuncs)
    addFunc(func) {
        this.customFuncs.push(func); 
    }

    async call() {
        if (!this.checkRun(this.targetPath, this.window)) return;
        console.trace("A2WP is running");

        let wpObj = await this.fetchData({url: `${this.wp.url}${this.wp.endpoint}`, method: "GET", site: "Wordpress", args: this.wp.args}); 
        if (wpObj == "undefined") wpObj = []; 

        // Adds Amilia id to endpoint if updating only 1 post
        const amEndpoint = await new Promise((resolve) => {
            const endpoint = this.amilia.endpoint; 
            const placeholder = endpoint.match(/\{[^\}]*\?*\}/); 

            if (placeholder && wpObj.length == 1) resolve(endpoint.replace(placeholder, wpObj[0].amilia_id)); 

            resolve(endpoint); 
        }); 

        let amObj = await this.fetchData({url: this.amilia.url, method: "POST", site: "Amilia", endpoint: amEndpoint, args: this.amilia.args}); 
        if (typeof amObj == "undefined") return; // No Amilia data, quit script
        amObj = (amObj.Items) ? amObj.Items : [amObj]; 
        // amObj = [amObj[0], amObj[1], amObj[2], amObj[3], amObj[4]]; // Testing, 0 1 & 4 are hidden

        // Run data through all custom funcs
        let results = {amObj: amObj, wpObj: wpObj, catDefs: this.catDefs};
        
        for (const customFunc of this.customFuncs) {
            results = await customFunc(results); 
        }

        // Generate url from results
        const urlBuilder = {
            url: this.wp.url, 
            endpoint: this.wp.endpoint, 
            id: results.id
        }

        const objPost = results.objPost; 
        const objDel = results.objDel; 

        for (const item of objPost) {
            const imgUrl = item.PictureUrl; 
            const bodyData = item.bodyData; 

            await this.postData({urlBuilder: urlBuilder, bodyData: bodyData, imgUrl: imgUrl, msg: this.msg}); 
        }

        // Deleting WP items that no longer exist in Amilia
        for (const item of objDel) {
            await this.delete(`${this.wp.url}${this.wp.endpoint}/${item.id}`); 
        }
    }
}