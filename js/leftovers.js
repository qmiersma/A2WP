
// EDGE CASES 
// - What if amObj returns nothing once checked (no new activities)

// REBUILD
// NOTES: 
// You will never push to amilia, so that's only a POST endpoint
// wp endpoint is also mainly for POST, and when using GET it's getting items 
// from where you'd be posting
// MAYBE in the future call() returns data and then user can call post() to push data
// ^^ Makes a2wp more flexible


// call()
// checkRun
// getTemplate if not null
// DOMparser for whatever's being returned, template or WP content
// fetch amilia and wp, send through customFuncs
// Generate what you send to postData (from what you receive from funcs)

// createFunc function? That acts kind of like enqueue scripts? 
//  Pushes function name to global class array, then executed in call
//  Returned information moves into next function (can I add another parameter to a function already made?)    


if (wpObj[i].slug.includes(amItem.Id)) {
                    check = true; 
                    break; 
                }

                this.customFuncs.forEach(customFunc => {
                    console.log(`4. Running func: ${customFunc.name}`); // TESTING
                    results = customFunc(results); 
                    console.log("5. Results -->", results); 
                }); 


                const template = await this.fetchTemplate(this.templatePath)
        if (!template) return; 

        let parser = new DOMParser, 
            page = parser.parseFromString(template, "text/html"); 

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

    templatePath: `${apiData.path}/html/activity-template.html`, 

    // const bodyData = {
            //     "title": `API TEST: ${amItem.Name}`,
            //     "author": 43,
            //     "content": amItem.content, 
            //     "acf": amItem.acf,
            //     "status": "publish", 
            //     "slug": `activity-${amItem.Id}`,
            //     "activity-categories": amItem.catIds, 
            //     "age-groups": amItem.ageGroups, 
            //     "meta": {"amilia_id": `${amItem.Id}`}
            // }; 


    // const amiliaId = (slugName.split("-")[1]) ? slugName.split("-")[1] : null; 

// Reads HTML template and populates it with activity data
async function updateActDOM(input) {
    const amObj = input.amObj; 
    const page = input.page; 

    for (const [index, amItem] of amObj.entries()) {
        let locations = ""; 

        for (const location of amItem.Schedules[0].Locations) {
            let getRes = await fetch("https://amilia-img-proxy.azurewebsites.net/api/GetAmilia", {
                method: "POST", 
                body: JSON.stringify({"endpoint": `locations/${location.Id}`})
            }); 

            if (!getRes.ok) break; 
            getRes = await getRes.json(); 

            page.querySelector("#amilia-wp-activity-location-name").innerHTML = getRes.Name; 
            page.querySelector("#amilia-wp-activity-location-address1").innerHTML = getRes.Address.Address1; 
            page.querySelector("#amilia-wp-activity-location-address2").innerHTML = `${getRes.Address.City}, ${getRes.Address.StateProvince} ${getRes.Address.ZipPostalCode}<br><br>`; 

            locations += page.querySelector("#amilia-wp-activity-location").innerHTML; 
        }
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

        input.amObj[index].page = page.querySelector("body").innerHTML; 
    }
 
    return input; 
}








check = wpObj.some(function(wpItem) {
    check = (`activity-${amItem.Id}` == `${wpItem.slug}`); 
    console.log(`activity-${amItem.Id} == ${wpItem.slug}`, (`activity-${amItem.Id}` == `${wpItem.slug}`));

    return check; 
}); 

       
       
       Object.entries(arguments[0]).forEach(([key, value]) => {
              console.log(key, value); 
              switch(key) {
                  case "actCats": 
                      eval(`${key} = '"activity-categories": ${value}'`); 
                      break; 
                  case "ageGroups": 
                      eval(`${key} = '"age-groups": ${value}'`); 
                      break; 
                  case ("url" || "endpoint" || "imgUrl"): 
                      break;
                  default: 
                      eval(`${key} = '"${key}": ${value}'`); 
              }
          });

