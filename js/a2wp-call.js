// ---- Make your custom functions here ----
// Checks if activity already exists in WP
function checkExists({input}) {
    const wpObj = input.wpObj; 
    const amObj = input.amObj; 
    let amObj2 = []; 

    amObj.forEach(amItem => {
        let check = false; 

        for (let i = 0; i < wpObj.length; i++) {
            if (wpObj[i].slug.includes(amItem.Id)) {
                check = true; 
                break; 
            }
        }

        // If activity does not yet exist in WP, adds to the "to make" list
        if (!check) amObj2.push(amItem); 
    }); 

    input.amObj = amObj2; 
    return input; 
}

// Gets id of WP activity to be updated
function getId({input}) {
    input.id = input.wpObj[0].id; 
    return input; 
}

// Reads HTML template and populates it with activity data
function updateActDOM({input}) {
    const amObj = input.amObj; 
    const page = input.page; 

    for (const amItem of amObj) {
        let locations = ""; 
        // TODO: Grab location address with fetch using id
        // OR just grab all locations and parse from that?
        for (const location of amItem.Schedules[0].Locations) {
            locations += `${location.Name}<br>`;
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

        input.amObj.amItem.content = page.querySelector("body").innerHTML; 
    }
 
    return input; 
}

function assignCats({input}) {
    const amObj = input.amObj; 
    const catDefs = input.catDefs; 

    amObj.forEach(amItem => {
        const catIds = catDefs["Categories"][amItem.ProgramName]; 
        let ageGroups = []; 

        if (amItem.Age) {
            let max = amItem.Age.Max; 
            let min = amItem.Age.Min; 

            for (let i = 0; (min <= max) && (i < catDefs["Ages"]["Max"].length); i++) {
                if (min <= catDefs["Ages"]["Max"][i]) {
                    ageGroups.push(catDefs["Ages"]["Id"][i]); 
                    min = catDefs["Ages"]["Max"][i];
                } 
            }
        }

        input.amObj.amItem.catIds = catIds; 
        input.amObj.amItem.ageGroups = ageGroups; 
    });
    
    return input; 
}

// ---- Create your categories here ----
const actCategories = {
    "Categories" : {
        "Arts, Culture, and Education 2025": 67, 
        "Aquatics 2025": [83, 69],
        "Athletics 2025": 66, 
        "Day Camps Summer 2025": 68, 
        "Events 2025": 85, 
        "Health and Wellness 2025": 69
    }, 
    "Ages": {
        "Max": [5, 12, 19, 54, 55, 99], 
        "Id": [2, 3, 4, 5, 105, 6]
    }
}

// ---- Call your objects here ----
let actCreator = new A2WP({
    amilia: {
        endpoint: "activities"
    }, 
    wp: {
        endpoint: "activities", 
        args: "status=publish&per_page=100"
    }, 
    targetPath: "things-to-do-2", 
    templatePath: `${apiData.path}/html/activity-template.html`, 
    categories: actCategories
});
actCreator.addFunc(checkExists);
actCreator.addFunc(updateActDOM);  
actCreator.addFunc(assignCats);
actCreator.call(); 

const slugName = window.location.pathname.split("/")[2]; 
const amiliaId = (slugName.split("-")[1]) ? slugName.split("-")[1] : null; 

let actUpdater = new A2WP({
    amilia: {
        endpoint: `activities/${amiliaId}`
    }, 
    wp: {
        endpoint: "activities", 
        args: `slug=${slugName}`
    }, 
    targetPath: "things-to-do/{path}", 
    templatePath: `${apiData.path}/html/activity-template.html`, 
    categories: actCategories
}); 
actUpdater.addFunc(getId); 
actUpdater.addFunc(updateActDOM); 
actUpdater.addFunc(assignCats); 
actUpdater.call(); 