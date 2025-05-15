// ---- Make your custom functions here ----
// Check what activities need to be added/deleted
function checkExists(input) {
    let amObj = input.amObj; 
    const wpObj = input.wpObj; 
    let objPost = []; 
    let objDel = []; 

    amObj = amObj.filter(item => item.Status != "Hidden"); 

    // Finds new activities to add
    for (const amItem of amObj) {
        let exists = false; 

        for (const wpItem of wpObj) {
            // console.log(`${amItem.Id} == ${wpItem.amilia_id}`); 
            if (amItem.Id == wpItem.amilia_id) {
                // console.log("Exists in WP -- won't make"); 
                exists = true; 
                break; 
            }
        }

        if (!exists) {
            // console.log("THIS IS BEING ADDED", amItem); 
            objPost.push(amItem);
        }
    }

    // Finds old activities to remove
    for (const wpItem of wpObj) {
        let exists = false; 

        for (const amItem of amObj) {
            // console.log(`${amItem.Id} == ${wpItem.amilia_id}`); 
            if (wpItem.amilia_id == amItem.Id) {
                // console.log("Exists in Amilia -- won't delete"); 
                exists = true; 
                break; 
            }
        }

        if (!exists) {
            // console.log("THIS IS BEING DELETED", amItem); 
            objDel.push(wpItem);
        }
    }

    input.objPost = objPost; 
    input.objDel = objDel; 

    return input; 
}

// Gets id of WP activity to be updated
function getId(input) {
    input.id = input.wpObj[0].id; 
    input.objPost = input.amObj; 
    input.objDel = []; 

    return input; 
}

// Builds a JSON object for ACF data and adds to each new amItem
async function buildActACF(input) {
    const objPost = input.objPost; 

    for (const [index, item] of objPost.entries()) {
        // Builds datestimes
        const startDate = new Date(item.StartDate).toLocaleDateString(); 
        const endDate = new Date(item.EndDate).toLocaleDateString(); 

        const datestimes = `${startDate} to ${endDate}\n${item.ScheduleSummary}`; 
        
        // Builds location 
        let location = ""; 
        for (const loc of item.Schedules[0].Locations) {
            let getRes = await fetch("https://amilia-img-proxy.azurewebsites.net/api/GetAmilia", {
                method: "POST", 
                body: JSON.stringify({"endpoint": `locations/${loc.Id}`})
            }); 

            if (!getRes.ok) break; 
            getRes = await getRes.json(); 

            location += `<a target="_blank" href="https://www.google.com/maps/dir//'${getRes.Address.Latitude},${getRes.Address.Longitude}'/@${getRes.Address.Latitude},${getRes.Address.Longitude}">${getRes.Name}</a>\n${getRes.Address.Address1}\n${getRes.Address.City}, ${getRes.Address.StateProvince} ${getRes.Address.ZipPostalCode}\n\n`; 
        }

        // Builds fees
        const dropIn = (item.HasDropInEnabled) ? `Drop-In Price: $${item.DropInPrice}` : ""; 
        const price = (item.Price != 0) ? `$${item.Price}` : "Free";

        const fees = `Price: ${price}\n${dropIn}`; 

        // Builds contact_info and registration button
        const contact_info = item.ResponsibleName; 
        const registration_button_text = "Register Here"; 
        const registration_link = item.Url; 

        // Builds more
        const prereq = (item.Prerequisite) ? item.Prerequisite : ""; 
        const note = (item.Note) ? item.Note : "";
        const more = `${prereq}\n\n${note}`; 

        // Builds main content
        const max = (item.MaxAttendance == 2147483647) ? "Unlimited" : item.MaxAttendance; 
        const content = `<strong>Spots Reserved:</strong> ${item.SpotsReserved}/${max}\n<strong>Ages:</strong> ${item.AgeSummary}\n\n${item.Description}`; 

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
        input.objPost[index].bodyData = {}; 
        input.objPost[index].bodyData["title"] = item.Name; 
        input.objPost[index].bodyData["author"] = 43; 
        input.objPost[index].bodyData["status"] = "publish"; 
        input.objPost[index].bodyData["slug"] = `activity-${item.Id}`; 
        input.objPost[index].bodyData["content"] = content; 
        input.objPost[index].bodyData["acf"] = acf; 
        input.objPost[index].bodyData["amilia_id"] = `${item.Id}`; 
    }

    return input; 
}

function assignCats(input) {
    const objPost = input.objPost; 
    const catDefs = input.catDefs; 

    objPost.forEach((item, index) => {
        const catIds = catDefs["Categories"][item.ProgramName]; 
        let ageGroups = []; 

        if (item.Age) {
            let max = item.Age.Max; 
            let min = item.Age.Min; 

            for (let i = 0; (min <= max) && (i < catDefs["Ages"]["Max"].length); i++) {
                if (min <= catDefs["Ages"]["Max"][i]) {
                    ageGroups.push(catDefs["Ages"]["Id"][i]); 
                    min = catDefs["Ages"]["Max"][i];
                } 
            }
        }

        input.objPost[index].bodyData["activity-categories"] = catIds; 
        input.objPost[index].bodyData["age-groups"] = ageGroups; 
    });
    
    return input; 
}

// "I say we take off and nuke the entire site from orbit. It's the only way to be sure."
// (Removes all Amilia activities from WP)
function nukeEverything(input) {
    const wpObj = input.wpObj; 
    let objDel = []; 

    for (const wpItem of wpObj) {
        // if (wpItem.amilia_id != "") objDel.push(wpItem); 
        if (wpItem.slug.match(/(?<=activity-)[^\/]+-+[^\D]*$/)) objDel.push(wpItem); 
    }

    input.objPost = []; 
    input.objDel = objDel; 

    console.log("objDel -->", objDel); 

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
        args: "amilia_id&status=publish&per_page=100"
    }, 
    targetPath: "/things-to-do-2/", 
    categories: actCategories, 
    msg: "Activity created" 
});
actCreator.addFunc(checkExists);
actCreator.addFunc(buildActACF);  
actCreator.addFunc(assignCats);
// actCreator.addFunc(nukeEverything); 
actCreator.call(); 

let slug = window.location.pathname.match(/(?<=\/)[^\/]*(?=\/*(?=$))/); 

let actUpdater = new A2WP({
    amilia: {
        endpoint: "activities/{id}"
    }, 
    wp: {
        endpoint: "activities", 
        args: `amilia_id&slug=${slug}`
    }, 
    targetPath: "/things-to-do/{path}/",
    categories: actCategories, 
    msg: "Activity updated"
}); 
actUpdater.addFunc(getId); 
actUpdater.addFunc(buildActACF); 
actUpdater.addFunc(assignCats); 
actUpdater.call(); 