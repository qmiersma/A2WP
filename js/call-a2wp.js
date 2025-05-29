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

// Gets id of WP activity to be updated
function getId(input) {
    input.id = input.wpObj[0].id; 
    input.objPost = input.amObj; 
    input.objDel = []; 

    return input; 
}

// Builds a JSON object for activity ACF data 
async function buildActACF(input) {
    const objPost = input.objPost; 

    for (const [index, item] of objPost.entries()) {
        // Builds datestimes // TODO: Move this
        const startDate = new Date(item.StartDate).toLocaleDateString(); 
        const endDate = new Date(item.EndDate).toLocaleDateString(); 

        const datestimes = `${startDate} to ${endDate}\n${item.ScheduleSummary}`; 
        
        // Builds location 
        let location = ""; 
        const schedules = (item.Schedules) ? item.Schedules[0].Locations : []; 
        for (const loc of schedules) {
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
        let registration_button_text = "Register Here"; 
        let registration_link = item.Url; 
        let spotsMsg = "<strong>Spots are still available!</strong> Click \"Register Here\" to sign up."; 

        if (item.SpotsRemaining != null && item.SpotsRemaining < 1) {
            registration_button_text = "Spots Unavailable"; 
            registration_link = ""; 
            spotsMsg = "<strong>All spots are taken.</strong> We are no longer accepting registrations."; 
        }

        // Builds more
        const prereq = (item.Prerequisite) ? item.Prerequisite : ""; 
        const note = (item.Note) ? item.Note : "";
        const more = `${prereq}\n\n${note}`; 

        // Builds main content
        const ages = (item.AgeSummary) ? `\n<strong>Ages:</strong> ${item.AgeSummary}` : ""; 
        const content = `${spotsMsg}${ages}\n\n${item.Description}`; 

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

// Builds a JSON object for event ACF data 
function buildEventACF(input) {
    const objPost = input.objPost; 

    function formatDate(date) { // Formats to remove HMS and hyphens
        return date.split("T")[0].replaceAll("-", ""); 
    }

    for (const [index, item] of objPost.entries()) {
        let actAcf = input.objPost[index].bodyData["acf"]; 

        let repeating_event = item.NumberOfOccurrences > 1; // Boolean value
        let repeating_type = null; 
        const start_date = formatDate(item.StartDate); 
        const end_date = formatDate(item.EndDate); 
        let start_time = ""; 
        let end_time = ""; 
        let recurring_event_days = []; 
        let repeating_days = []; 

        if (item.Schedules.length > 1) {
            repeating_type = "random"; 

            for (const schedule of item.Schedules) {
                let timePeriod = schedule.TimePeriod; 

                let day = {
                    "event_date": formatDate(timePeriod.StartDate), 
                    "event_start_time": timePeriod.StartTime, 
                    "event_end_time": timePeriod.EndTime
                }

                recurring_event_days.push(day); 
            }
        } else if (item.Schedules.length == 1) {
            let timePeriod = item.Schedules[0].TimePeriod; 
            start_time = timePeriod.StartTime; 
            end_time = timePeriod.EndTime; 

            if (timePeriod.Days.length > 0) {
                repeating_type = "fixed"; 

                for (const day of timePeriod.Days) {
                    repeating_days.push(day); 
                }
            } 
        }

        const acf = {
            repeating_event, 
            start_date, 
            end_date, 
            start_time, 
            end_time, 
            repeating_days
        }; 
        acf["recurring_event_non-consecutive_days"] = recurring_event_days; 
        if (repeating_type) acf["repeating_type"] = repeating_type; 

        input.objPost[index].bodyData["acf"] = {...actAcf, ...acf}; 
    }

    return input; 
}

function assignCats(input) {
    const objPost = input.objPost; 
    const catDefs = input.catDefs; 

    objPost.forEach((item, index) => {
        // Always includes event category so event ACFs are available
        const ids = (catDefs["Categories"][item.ProgramName]) ? catDefs["Categories"][item.ProgramName] : []; 
        const catIds = [85, ...ids]; 

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
        "Arts, Culture, and Education 2025": [67], 
        "Aquatics 2025": [83, 69],
        "Athletics 2025": [66], 
        "Day Camps Summer 2025": [68], 
        // "Events 2025": [85], 
        "Health and Wellness 2025": [69]
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
actCreator.addFunc(buildEventACF); 
actCreator.addFunc(assignCats);
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
actUpdater.addFunc(buildEventACF); 
actUpdater.addFunc(assignCats); 
actUpdater.call(); 