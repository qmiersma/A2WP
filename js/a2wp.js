class A2WP {
    constructor(getEndpoint, postEndpoint, templatePath, customFunc) {
        this.url1 = "https://amilia-proxy.azurewebsites.net/api/callamilia"; 
        this.url2 = "https://sbvpastg.wpenginepowered.com/wp-json/wp/v2/"; 
        this.getEndpoint = getEndpoint; 
        this.postEndpoint = postEndpoint; 
        this.templatePath = templatePath; 
        this.customFunc = customFunc; 
    }

    // Change this!!
    checkTimePassed() {
        if (localStorage.previousDay == "undefined") {
            localStorage.setItem("previousDay", new Date().toDateString());
            return true; 
        } 
    
        const currentDate = new Date().toDateString(); 
    
        if (currentDate <= localStorage.previousDay) return false; 
    
        localStorage.previousDay = currentDate; 
        return true; 
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

    // Endpoint becomes part of url in one case
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
                console.log(data); 
                return data; 
            }); 
    
            return await response;
        } catch(error) {
            console.log(error); 
        }
    }

    // ADD TO POST: activity categories, age groups
    async postData(url, endpoint, content, id = undefined, author = undefined, title = undefined, status = undefined, slug = undefined) {
        if (id !== "undefined") endpoint = endpoint + `/${id}`; 

        try {
            const response = await fetch(`${url}${endpoint}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json", 
                  "X-WP-Nonce": apiData.nonce
                }, 
                body: JSON.stringify({
                    "title": `${title}`, 
                    "status": `${status}`,
                    "slug": `${slug}`,
                    "content": `${content}`, 
                    "author": `${author}`
                })
            }).then(function(response) {
                if (!response.ok) {
                    throw new Error("Unable to post data"); 
                }
    
                return response.json(); 
            }).then(function(data) {
                console.log(data); 
                return data; 
            }); 
    
            return await response; 
        } catch(error) {
            console.log(error); 
        }
    }

    async call() {
        //if (!this.checkTimePassed()) return; 

        console.log("Getting HTML templates"); 
        let template = await this.fetchTemplate(this.templatePath); 

        if (!template) return; 

        let parser = new DOMParser, 
            page = parser.parseFromString(template, "text/html"), 
            check; 

        this.fetchData(this.url1, "POST", "Amilia", "activities").then(amObj => {
            if (typeof amObj == "undefined") return; // Will this work?

            // [amObject[0]] for testing only, change back to amObj once done
            [amObj[0]].forEach(amItem => {
                this.fetchData(`${this.url2}${this.getEndpoint}`, "GET", "Wordpress").then(wpObj => {
                    if (typeof wpObj == "undefined") return; // Not receiving anything

                    wpObj.some(function(wpItem) {
                        console.log(`Checking if activity ${amItem.Id} already exists`); 

                        check = (`activity-${amItem.Id}` == `${wpItem.slug}`); 
                        console.log(`activity-${amItem.Id} == ${wpItem.slug}`, check);

                        return check; // If true, breaks loop
                    }); 

                    if (!check) {
                        // Everything that a custom function would possibly need 
                        // should be passed in here

                        // Maybe save to global, then post if checked, 
                        // but this is a last ditch solution
                        this.customFunc([page, amItem, this.postData, this.url2, this.postEndpoint]); 
                    }
                }); 
            }); 
        }); 
    }
}

// ---- Make your custom functions here ----

// Modifies activity-template.html and pushes the new activity to WP
function updateAct(data = [page => page, amItem => amItem, postData => postData, url => url, endpoint => endpoint]) {
    let locations = ""; 
    data.amItem.Schedules[0].Locations.forEach(location => {
        locations += `${location.Name}<br>`; 
    });

    const amItem = data.amItem; 
    let page = data.page; 

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
    
    data.postData({url: data.url, endpoint: data.endpoint, content: page.documentElement.innerHTML, status: "publish", slug: `activity-${amItem.Id}`, author: "appsadmin"}); 

    console.log(`Activity ${amItem.Id} created`);
}

// Modifies page-template.html and updates the things-to-do page
function updatePage(data = [page => page, amItem => amItem, postData => postData, url => url, endpoint => endpoint]) {
    let page = data.page; 
    let amItem = data.amItem; 

    // Pass index in forEach so I know which item is last

    let wrapper2 = page.createElement("div"); 
    wrapper2.setAttribute("class", "amilia-wp-page-wrapper-2"); 

    wrapper2.innerHTML =    `<a class="amilia-wp-page-img-wrapper" href="https://sbvpastg.wpenginepowered.com/things-to-do/activity-${amItem.Id}">
                                <img class="amilia-wp-page-img" src="${amItem.PictureUrl}" alt="${amItem.Name} image">
                            </a>
                            <h3 class="amilia-wp-page-name">${amItem.Name}</h3>
                            <p class="amilia-wp-page-schedule">${amItem.ScheduleSummary}</p>`; 
}

// ---- Call your objects here ----

let actUpdater = new A2WP("activities", "activities", `${apiData.path}/html/activity-template.html`, updateAct); 
actUpdater.call(); 

let pageUpdater = new A2WP("activities", "pages/14323", `${apiData.path}/html/page-template.html`, updatePage); 
pageUpdater.call(); 