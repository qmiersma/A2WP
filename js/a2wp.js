class A2WP {
    constructor(getEndpoint, postEndpoint, templatePath, customFunc, targetPath) {
        this.url1 = "https://amilia-proxy.azurewebsites.net/api/callamilia"; 
        this.url2 = "https://sbvpastg.wpenginepowered.com/wp-json/wp/v2/"; 
        this.getEndpoint = getEndpoint; 
        this.postEndpoint = postEndpoint; 
        this.templatePath = templatePath; 
        this.customFunc = customFunc; 
        this.targetPath = targetPath; 
    }

    checkRun() {
        const currentPath = window.location.pathname.split("/")[1]; 

        return (currentPath == this.targetPath) ? true : false; 
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

    async fetchData(url, method, site, endpoint = null) {
        let fetchInfo = {
            method: method, 
            headers: {
                "Content-Type": "application/json"
            }
        }

        if (endpoint) fetchInfo.body = JSON.stringify({"endpoint": endpoint}); 

        try {
            const response = await fetch(url, fetchInfo).then(function(response) {
                if (!response.ok) {
                    throw new Error(`Unable to fetch data from ${site}`); 
                } 
    
                return response.json(); 
            }).then(function(data) {
                // console.log(data); <-- for debugging
                return data; 
            }); 
    
            return await response;
        } catch(error) {
            console.log(error); 
        }
    }

    // ADD TO POST: activity categories, age groups
    async postData({url, endpoint, content, author = null, title = null, status = null, slug = null}) {
        try {
            const response = await fetch(`${url}${endpoint}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json", 
                  "X-WP-Nonce": apiData.nonce
                }, 
                body: JSON.stringify({
                    "title": title, 
                    "status": status,
                    "slug": slug,
                    "content": content, 
                    "author": author
                })
            }).then(function(response) {
                if (!response.ok) {
                    throw new Error("Unable to post data"); 
                }
    
                return response.json(); 
            }).then(function(data) {
                // console.log(data); <-- for debugging
                return data; 
            }); 
    
            return await response; 
        } catch(error) {
            console.log(error); 
        }
    }

    async call() {
        if (!this.checkRun()) return; 

        console.log("A2WP script is running"); 
        let template = await this.fetchTemplate(this.templatePath); 

        if (!template) return; 

        let parser = new DOMParser, 
            page = parser.parseFromString(template, "text/html"), 
            wrapper1 = page.querySelector(".amilia-wp-page-wrapper-1"),
            check;  

        this.fetchData(this.url1, "POST", "Amilia", "activities").then(amObj => {
            if (typeof amObj == "undefined") return; 

            // *** Remove this when done testing; 
            // currently only allows posting of 2 items
            amObj = [amObj[0], amObj[1]]; 

            amObj.forEach((amItem, amIndex, amArray) => {
                this.fetchData(`${this.url2}${this.getEndpoint}`, "GET", "Wordpress").then(wpObj => {
                    if (typeof wpObj == "undefined") return; 

                    wpObj.some(function(wpItem) {
                        check = (`activity-${amItem.Id}` == `${wpItem.slug}`); 
                        // console.log(`activity-${amItem.Id} == ${wpItem.slug}`, check); <-- for debugging

                        return check; // If true, breaks loop
                    }); 

                    if (!check) {
                        // Everything that a custom function would possibly need 
                        // should be passed in here
                        this.customFunc({page: page, amItem: amItem, amIndex: amIndex, amArray: amArray, wrapper1: wrapper1, postData: this.postData, url: this.url2, endpoint: this.postEndpoint}); 
                    }
                }); 
            }); 
        }); 
    }
}

// ---- Make your custom functions here ----

// Modifies activity-template.html and pushes the new activity to WP
function updateAct({page, amItem, postData, url, endpoint}) {
    let locations = ""; 
    amItem.Schedules[0].Locations.forEach(location => {
        locations += `${location.Name}<br>`; 
    });
    const price = (amItem.Price != 0) ? `$${amItem.Price}` : "Free"; 

    page.querySelector(".amilia-wp-activity-schedule-summary").innerHTML = amItem.ScheduleSummary; 
    page.querySelector(".amilia-wp-activity-dates").innerHTML = `${amItem.StartDate} to ${amItem.EndDate}`; 
    page.querySelector(".amilia-wp-activity-location").innerHTML = locations; 
    page.querySelector(".amilia-wp-activity-price").innerHTML = price; 
    page.querySelector(".amilia-wp-activity-register-btn").href = amItem.SecretUrl; 
    page.querySelector(".amilia-wp-activity-responsible-name").innerHTML = amItem.ResponsibleName; 
    page.querySelector(".amilia-wp-activity-note").innerHTML = amItem.Note; 
    page.querySelector(".amilia-wp-activity-img").src = amItem.PictureUrl; 
    page.querySelector(".amilia-wp-activity-img").alt = `${amItem.Name} image`; 
    page.querySelector(".amilia-wp-activity-descript").innerHTML = `<p>${amItem.Description}</p>`; 
    
    // *** API TEST will be removed from title field once out of testing stage
    postData({url: url, endpoint: endpoint, content: page.documentElement.innerHTML, author: 43, title: `API TEST: ${amItem.Name}`, status: "publish", slug: `activity-${amItem.Id}`}); 

    console.log(`Activity ${amItem.Id} created`);
}

// Modifies page-template.html and updates the things-to-do page
function updatePage({page, amItem, amIndex, amArray, wrapper1, postData, url, endpoint}) {
    let wrapper2 = page.createElement("div"); 
    wrapper2.setAttribute("class", "amilia-wp-page-wrapper-2"); 

    wrapper2.innerHTML =    `<a class="amilia-wp-page-img-wrapper" href="https://sbvpastg.wpenginepowered.com/things-to-do/activity-${amItem.Id}">
                                <img class="amilia-wp-page-img" src="${amItem.PictureUrl}" alt="${amItem.Name} image">
                            </a>
                            <h3 class="amilia-wp-page-name">${amItem.Name}</h3>
                            <p class="amilia-wp-page-schedule">${amItem.ScheduleSummary}</p>`;
    wrapper1.appendChild(wrapper2); 

    if (amIndex >= amArray.length - 1) {
        postData({url: url, endpoint: endpoint, content: page.documentElement.innerHTML}); 
    }
}

// ---- Call your objects here ----

let actUpdater = new A2WP("activities", "activities/", `${apiData.path}/html/activity-template.html`, updateAct, "things-to-do"); 
actUpdater.call(); 

let pageUpdater = new A2WP("activities", "pages/14323", `${apiData.path}/html/page-template.html`, updatePage, "things-to-do"); 
pageUpdater.call(); 