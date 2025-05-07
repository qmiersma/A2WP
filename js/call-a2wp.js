// ---- Make your custom functions here ----
// Checks if activity already exists in WP
function checkExists(input) {
    const amObj = [input.amObj[0], input.amObj[1], input.amObj[12], input.amObj[35]]; 
    // const amObj = input.amObj; 
    const wpObj = input.wpObj; 
    let amObj2 = []; 

    amObj.forEach(amItem => {
        if (amItem.Status != "Hidden") {
            let check = false; 

            for (let i = 0; i < wpObj.length; i++) {
                if (amItem.Id == wpObj[i].meta.amilia_id) {
                    check = true; 
                    break; 
                }
            }

            // If activity does not yet exist in WP, adds to the "to make" list
            if (!check) amObj2.push(amItem); 
        }
    }); 

    input.amObj = amObj2; 
    return input; 
}

// Gets id of WP activity to be updated
function getId(input) {
    input.id = input.wpObj[0].id; 
    return input; 
}

// Builds a JSON object for ACF data and adds to each new amItem
async function buildActACF(input) {
    const amObj = input.amObj; 

    for (const [index, amItem] of amObj.entries()) {
        // Builds datestimes
        const startDate = new Date(amItem.StartDate).toLocaleDateString(); 
        const endDate = new Date(amItem.EndDate).toLocaleDateString(); 

        const datestimes = `${startDate} to ${endDate}\n${amItem.ScheduleSummary}`; 
        
        // Builds location 
        let location = ""; 
        for (const loc of amItem.Schedules[0].Locations) {
            let getRes = await fetch("https://amilia-img-proxy.azurewebsites.net/api/GetAmilia", {
                method: "POST", 
                body: JSON.stringify({"endpoint": `locations/${loc.Id}`})
            }); 

            if (!getRes.ok) break; 
            getRes = await getRes.json(); 

            location += `<a target="_blank" href="https://www.google.com/maps/dir//'${getRes.Address.Latitude},${getRes.Address.Longitude}'/@${getRes.Address.Latitude},${getRes.Address.Longitude}">${getRes.Name}</a>\n${getRes.Address.Address1}\n${getRes.Address.City}, ${getRes.Address.StateProvince} ${getRes.Address.ZipPostalCode}\n\n`; 
        }

        // Builds fees
        const dropIn = (amItem.HasDropInEnabled) ? `Drop-In Price: $${amItem.DropInPrice}` : ""; 
        const price = (amItem.Price != 0) ? `$${amItem.Price}` : "Free";

        const fees = `Price: ${price}\n${dropIn}`; 

        // Builds contact_info and registration button
        const contact_info = amItem.ResponsibleName; 
        const registration_button_text = "Register Here"; 
        const registration_link = amItem.Url; 

        // Builds more
        const prereq = (amItem.Prerequisite) ? amItem.Prerequisite : ""; 
        const note = (amItem.Note) ? amItem.Note : "";
        const more = `${prereq}\n\n${note}`; 

        // Builds main content
        const max = (amItem.MaxAttendance == 2147483647) ? "Unlimited" : amItem.MaxAttendance; 
        const content = `<strong>Spots Reserved:</strong> ${amItem.SpotsReserved}/${max}\n<strong>Ages:</strong> ${amItem.AgeSummary}\n\n${amItem.Description}`; 

        let acf = {
            datestimes, 
            location, 
            fees, 
            contact_info, 
            registration_button_text, 
            registration_link, 
            more
        }

        // Sets body content for eventual post to WP
        input.amObj[index].bodyData = {}; 
        input.amObj[index].bodyData["title"] = `API TEST: ${amItem.Name}`; 
        input.amObj[index].bodyData["author"] = 43; 
        input.amObj[index].bodyData["status"] = "publish"; 
        input.amObj[index].bodyData["slug"] = `activity-${amItem.Id}`; 
        input.amObj[index].bodyData["meta"] = {"amilia_id": `${amItem.Id}`}; 
        input.amObj[index].bodyData["content"] = content; 
        input.amObj[index].bodyData["acf"] = acf; 
    }

    return input; 
}

function assignCats(input) {
    const amObj = input.amObj; 
    const catDefs = input.catDefs; 

    amObj.forEach((amItem, index) => {
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

        input.amObj[index].bodyData["activity-categories"] = catIds; 
        input.amObj[index].bodyData["age-groups"] = ageGroups; 
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
    targetPath: "/things-to-do-2/", 
    categories: actCategories, 
    msg: "Activity created" 
});
actCreator.addFunc(checkExists);
actCreator.addFunc(buildActACF);  
actCreator.addFunc(assignCats);
actCreator.call(); 

const slugName = window.location.pathname.split("/")[2]; // Use regex instead

let actUpdater = new A2WP({
    amilia: {
        endpoint: "activities/{id}"
    }, 
    wp: {
        endpoint: "activities", 
        args: `slug=${slugName}`
    }, 
    targetPath: "/things-to-do/{path}/",
    categories: actCategories, 
    msg: "Activity updated"
}); 
actUpdater.addFunc(getId); 
actUpdater.addFunc(buildActACF); 
actUpdater.addFunc(assignCats); 
actUpdater.call(); 