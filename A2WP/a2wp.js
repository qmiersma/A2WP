module.exports = {
    A2WP: class A2WP {
        constructor({amilia, wp, auth, categories = null, msg = null}) {
            this.amilia = amilia; 
            this.wp = wp; 
            this.amilia.url = "https://a2wp.azurewebsites.net/api/GetAmilia"; 
            this.auth = auth; 
            this.catDefs = categories; 
            this.customFuncs = []; 
            //this.window = window.location.pathname; 
            this.msg = msg; 
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
    
        // Check what activities need to be added/deleted
        checkExists(input) {
            let amObj = input.amObj; 
            const wpObj = input.wpObj; 
            let objPost = []; 
            let objDel = []; 
    
            amObj = amObj.filter(item => item.Status != "Hidden"); 
    
            // Finds new activities to add
            for (const amItem of amObj) {
                let exists = false; 
    
                for (const wpItem of wpObj) {
                    if (amItem.Id == wpItem.amilia_id) {
                        exists = true; 
                        break; 
                    }
                }
    
                if (!exists) objPost.push(amItem);
            }
    
            // Finds old activities to remove
            for (const wpItem of wpObj) {
                let exists = false; 
    
                for (const amItem of amObj) {
                    if (wpItem.amilia_id == amItem.Id) {
                        exists = true; 
                        break; 
                    }
                }
    
                if (!exists) objDel.push(wpItem);
            }
    
            input.objPost = objPost; 
            input.objDel = objDel; 
    
            return input; 
        }
    
        async delete(url, auth) {
            try {
                let delRes = await fetch(url, {
                    method: "DELETE", 
                    headers: {
                        "Authorization": auth
                    }
                }); 
    
                if (!delRes.ok) throw new Error("Failed to delete item"); 
                delRes = await delRes.json(); 
    
                console.log(`${delRes.id}: Deleted`);
            } catch(error) {
                console.log(error); 
            }
        }
    
        async postData({urlBuilder, bodyData, auth, imgUrl = null, msg = null}) {
            const url = urlBuilder.url; 
            const endpoint = urlBuilder.endpoint; 
            const id = (urlBuilder.id) ? urlBuilder.id : ""; 
    
            try {
                // Creates post
                let postRes = await fetch(`${url}${endpoint}/${id}`, {
                    method: "POST", 
                    headers: {
                        "Content-Type": "application/json", 
                        "Authorization": auth
                    }, 
                    body: JSON.stringify(bodyData)
                }); 
    
                if (!postRes.ok) throw new Error("Unable to create post"); 
                postRes = await postRes.json(); 
    
                // Creates featured media (if not already set)
                if (imgUrl && postRes.featured_media == 0) {
                    let postRes2 = fetch("https://a2wp.azurewebsites.net/api/GetImg", {
                        method: "POST",
                        body: JSON.stringify({
                            "getUrl": imgUrl, 
                            "postUrl": `${url}${endpoint}/${postRes.id}`, 
                            "mediaUrl": `${url}media`, 
                            "auth": auth
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
                nextPage = getRes.nextPage; 
    
                obj = obj.concat(getRes.data); 
                count++; 
            }
    
            return obj; 
        }
    
        async call() {
            console.trace("A2WP is running");
    
            let wpObj = await this.fetchData({url: `${this.wp.url}${this.wp.endpoint}`, method: "GET", site: "Wordpress", args: this.wp.args}); 
            const totalPages = wpObj.totalPages; 
            wpObj = (wpObj.data) ? wpObj.data : []; 
    
            if (totalPages > 1) {
                wpObj = await this.fetchMorePages({url: `${this.wp.url}${this.wp.endpoint}`, method: "GET", site: "Wordpress", args: this.wp.args, obj: wpObj, fetchData: this.fetchData, totalPages: totalPages, nextPage: ""}); 
            }
    
            const endpoint = this.amilia.endpoint;
            const placeholder = endpoint.match(/\{[^\}]*\?*\}/);
    
            // Adds Amilia id to endpoint if updating only 1 post
            this.amilia.endpoint = await new Promise((resolve) => {  
                if (placeholder && wpObj.length == 1) resolve(endpoint.replace(placeholder, wpObj[0].amilia_id)); 
    
                resolve(endpoint); 
            }); 
    
            let amObj = []; 
    
            // If true, fetches data for 1 item; otherwise fetches for all
            if (placeholder) {
                let getRes = await this.fetchData({url: this.amilia.url, method: "POST", site: "Amilia", endpoint: this.amilia.endpoint, args: this.amilia.args}); 
                getRes = (getRes.data) ? [getRes.data] : []; 
                
                amObj = amObj.concat(getRes); 
            } else {
                let programs = await this.fetchData({url: this.amilia.url, method: "POST", site: "Amilia", endpoint: "programs"}); 
                if (!programs) return; // No Amilia data, quit script
                programs = (programs.data.Items) ? programs.data.Items : [programs.data]; 
    
                console.log("Programs -->", programs); // Debug
    
                // Reads thru visible programs, fetches activities for each, and adds to amObj
                for (const program of programs) {
                    if (program.IsVisible) {
                        let getRes = await this.fetchData({url: this.amilia.url, method: "POST", site: "Amilia", endpoint: `programs/${program.Id}/${this.amilia.endpoint}`, args: this.amilia.args}); 
                        const nextPage = getRes.nextPage; 
                        getRes = (getRes.data && getRes.data.Items) ? getRes.data.Items : [getRes.data]; 
    
                        console.log(`Activities of program ${program.Id} -->`, getRes); // Debug
                        amObj = amObj.concat(getRes); 
    
                        if (nextPage != "") {
                            amObj = await this.fetchMorePages({url: this.amilia.url, method: "POST", site: "Amilia", endpoint: this.amilia.endpoint, args: this.amilia.args, obj: amObj, fetchData: this.fetchData, totalPages: 0, nextPage: nextPage}); 
                        }
                    }
                }
            }
    
            if (amObj.length < 1) return; 
    
            // Run data through all custom funcs
            let results = {amObj: amObj, wpObj: wpObj, catDefs: this.catDefs};
            results = this.checkExists(results); 
            
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
    
            console.log("objPost -->", objPost); // Debug
            console.log("objDel -->", objDel); // Debug
    
            for (const item of objPost) {
                const imgUrl = item.PictureUrl; 
                const bodyData = item.bodyData; 
    
                await this.postData({urlBuilder: urlBuilder, bodyData: bodyData, auth: this.auth, imgUrl: imgUrl, msg: this.msg}); 
            }
    
            // Deleting WP items that no longer exist in Amilia
            for (const item of objDel) {
                await this.delete(`${this.wp.url}${this.wp.endpoint}/${item.id}`, this.auth); 
            }
        }
    }
}; 