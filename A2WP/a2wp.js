const getImg = require("../A2WP/get-img.js").getImg; 
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');

module.exports = {
    A2WP: class A2WP {
        constructor({amilia, wp, auth, msg = null}) {
            this.amilia = amilia; 
            this.wp = wp; 
            this.amilia.url = "https://app.amilia.com/api/V3/en/org/sbvpa/"; 
            this.amilia.auth = `Bearer ${process.env.AUTH_TOKEN}`; 
            this.auth = auth; 
            this.customFuncs = []; 
            this.msg = msg; 
        } 
    
        async fetchData({url, site, auth = null, args = null}) {
            let info = {
                method: "GET",
                cache: "no-cache", 
                headers: {
                    "Content-Type": "application/json"
                }
            }; 
            if (auth) info.headers["Authorization"] = auth; 
            if (args) url = `${url}?${args}`; 
    
            try {
                let getRes = await fetch(url, info); 
    
                if (!getRes.ok) {
                    getRes = await getRes.json(); 
                    console.log(getRes); 
                    throw new Error(`Unable to fetch data from ${site}`);
                }
    
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
    
        async delete({url, auth}) {
            try {
                let delRes = await fetch(url, {
                    method: "DELETE", 
                    headers: {
                        "Authorization": auth
                    }
                }); 

                if (!delRes.ok) {
                    delRes = await delRes.json(); 
                    console.log(delRes); 
                    throw new Error("Failed to delete item");
                }
     
                localStorage.removeItem(`img${delRes.id}`); // Removing img url from /scratch
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
                // Creates featured media
                if (imgUrl) {
                    if ((id && (imgUrl != localStorage.getItem(`img${id}`))) || !id) {
                        let mediaId = await getImg({getUrl: imgUrl, postUrl: `${url}media`, altText: bodyData.altText, auth: auth}); 

                        bodyData["featured_media"] = mediaId; 
                        bodyData.acf["event_image"] = mediaId; 

                        localStorage.setItem(`img${id}`, imgUrl); // Stores URL for next comparison
                    } 
                }

                // Creates post
                let postRes = await fetch(`${url}${endpoint}/${id}`, {
                    method: "POST", 
                    headers: {
                        "Content-Type": "application/json", 
                        "Authorization": auth
                    }, 
                    body: JSON.stringify(bodyData)
                }); 
    
                if (!postRes.ok) {
                    postRes = await postRes.json(); 
                    console.log(postRes); 
                    throw new Error("Unable to create post"); 
                }
                postRes = await postRes.json(); 
    
                console.log(`${postRes.id}: ${msg}`);
            } catch(error) {
                console.log(error); 
            }
        }
    
        // Adds custom function to iterable array (customFuncs)
        addFunc(func) {
            this.customFuncs.push(func); 
        }
    
        async fetchMorePages({url, site, args, auth = null, obj, fetchData, totalPages, nextPage}) {
            let count = 2; 
            while (nextPage != "" || totalPages >= count) {
                let getRes = await fetchData({url: url, site: site, auth: auth, args: `page=${count}&${args}`});
                nextPage = getRes.nextPage; 
    
                obj = obj.concat(getRes.data); 
                count++; 
            }
    
            return obj; 
        }
    
        async call() {
            console.trace("A2WP is running");
    
            console.log("Fetching WordPress items..."); 
            let wpObj = await this.fetchData({url: `${this.wp.url}${this.wp.endpoint}`, site: "Wordpress", args: this.wp.args}); 
            const totalPages = wpObj.totalPages; 
            wpObj = (wpObj.data) ? wpObj.data : []; 
    
            if (totalPages > 1) {
                wpObj = await this.fetchMorePages({url: `${this.wp.url}${this.wp.endpoint}`, site: "Wordpress", args: this.wp.args, obj: wpObj, fetchData: this.fetchData, totalPages: totalPages, nextPage: ""}); 
            }
            
            //console.log("GET URL -->", `${this.wp.url}${this.wp.endpoint}?${this.wp.args}`);
            const endpoint = await this.amilia.endpoint; 
            const placeholder = await endpoint.match(/\{[^\}]*\?*\}/);

            // Adds Amilia id to endpoint if updating only 1 post
            if (placeholder) this.amilia.endpoint = await endpoint.replace(placeholder, wpObj[0].amilia_id); 
    
            let amObj = []; 
            console.log("Fetching Amilia items..."); 
    
            // If true, fetches data for 1 item; otherwise fetches for all
            if (placeholder) {
                let getRes = await this.fetchData({url: `${this.amilia.url}${this.amilia.endpoint}`, site: "Amilia", auth: this.amilia.auth, args: this.amilia.args}); 
                getRes = (getRes.data) ? [getRes.data] : []; 
                
                amObj = amObj.concat(getRes); 
                this.amilia.endpoint = endpoint; // Resetting endpoint
            } else {
                let programs = await this.fetchData({url: `${this.amilia.url}programs`, site: "Amilia", auth: this.amilia.auth}); 
                if (!programs) return; // No Amilia data, quit script
                programs = (programs.data.Items) ? programs.data.Items : [programs.data]; 
    
                // Reads thru visible programs, fetches activities for each, and adds to amObj
                for (const program of programs) {
                    if (program.IsVisible) {
                        let getRes = await this.fetchData({url: `${this.amilia.url}programs/${program.Id}/${this.amilia.endpoint}`, site: "Amilia", auth: this.amilia.auth, args: this.amilia.args}); 
                        const nextPage = getRes.nextPage; 
                        getRes = (getRes.data && getRes.data.Items) ? getRes.data.Items : [getRes.data]; 
    
                        amObj = amObj.concat(getRes); 
    
                        if (nextPage != "") {
                            amObj = await this.fetchMorePages({url: `${this.amilia.url}${this.amilia.endpoint}`, site: "Amilia", auth: this.amilia.auth, args: this.amilia.args, obj: amObj, fetchData: this.fetchData, totalPages: 0, nextPage: nextPage}); 
                        }
                    }
                }
            }
    
            if (amObj.length < 1) return; 
    
            // Run data through all custom funcs
            let results = {amObj: amObj, wpObj: wpObj, amUrl: this.amilia, wpUrl: this.wp};
            results = await this.checkExists(results); 
            
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
    
                await this.postData({urlBuilder: urlBuilder, bodyData: bodyData, auth: this.auth, imgUrl: imgUrl, msg: this.msg}); 
            }
    
            // Deleting WP items that no longer exist in Amilia
            for (const item of objDel) {
                await this.delete({url: `${this.wp.url}${this.wp.endpoint}/${item.id}`, auth: this.auth}); 

                if (item.featured_media) await this.delete({url: `${this.wp.url}media/${item.featured_media}?force=true`, auth: this.auth}); // Deletes post thumbnail
            }
        }
    }
}; 