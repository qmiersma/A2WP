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

            // Gets pagination info
            let getRes2 = {}; 
            const totalPages = getRes.headers.get("X-WP-TotalPages"); 

            getRes2.data = await getRes.json(); 
            const nextPage = (getRes2.data.Paging) ? getRes2.data.Paging.Next : ""; 

            getRes2.totalPages = totalPages; 
            getRes2.nextPage = nextPage; 
            return getRes2;
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

            console.log(`${postRes.id}: ${msg}`);
        } catch(error) {
            console.log(error); 
        }
    }

    // Adds custom function to iterable array (customFuncs)
    addFunc(func) {
        this.customFuncs.push(func); 
    }

    async fetchMorePages({url, method, site, args, obj, fetchData, totalPages, nextPage}) {
        let count = 2; 
        while (nextPage != "" || totalPages >= count) {
            let getRes = await fetchData({url: url, method: method, site: site, args: `page=${count}&${args}`});
            console.log(getRes); 
            nextPage = getRes.nextPage; 

            for (const item of getRes.data) {
                console.log("Pushing item -->", item); 
                obj.push(item); 
            }

            count++; 
        }

        return obj; 
    }

    async call() {
        if (!this.checkRun(this.targetPath, this.window)) return;
        console.trace("A2WP is running");

        let wpObj = await this.fetchData({url: `${this.wp.url}${this.wp.endpoint}`, method: "GET", site: "Wordpress", args: this.wp.args}); 
        const totalPages = wpObj.totalPages; 
        wpObj = (wpObj.data) ? wpObj.data : []; 

        if (totalPages > 1) {
            wpObj = await this.fetchMorePages({url: `${this.wp.url}${this.wp.endpoint}`, method: "GET", site: "Wordpress", args: this.wp.args, obj: wpObj, fetchData: this.fetchData, totalPages: totalPages, nextPage: ""}); 
        }

        // Adds Amilia id to endpoint if updating only 1 post
        const amEndpoint = await new Promise((resolve) => {
            const endpoint = this.amilia.endpoint; 
            const placeholder = endpoint.match(/\{[^\}]*\?*\}/); 

            if (placeholder && wpObj.length == 1) resolve(endpoint.replace(placeholder, wpObj[0].amilia_id)); 

            resolve(endpoint); 
        }); 

        let amObj = await this.fetchData({url: this.amilia.url, method: "POST", site: "Amilia", endpoint: amEndpoint, args: this.amilia.args}); 
        if (!amObj) return; // No Amilia data, quit script

        const nextPage = amObj.nextPage; 
        amObj = (amObj.data && amObj.data.Items) ? amObj.data.Items : [amObj]; 
        // amObj = [amObj[0], amObj[1], amObj[2], amObj[3], amObj[4]]; // Testing, 0 1 & 4 are hidden

        if (nextPage != "") {
            amObj = await this.fetchMorePages({url: this.amilia.url, method: "POST", site: "Amilia", endpoint: amEndpoint, args: this.amilia.args, obj: amObj, fetchData: this.fetchData, totalPages: 0, nextPage: nextPage}); 
        }

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