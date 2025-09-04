const A2WP = require("../A2WP/a2wp.js").A2WP; 

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
        // Builds location 
        let location = "";
        let locationName = "";  
        const locations = item.Schedules[0].Locations; 

        if (locations.length > 0) {
            try {
                let getRes = await fetch(`${input.amUrl.url}locations/${locations[0].Id}`, {
                    method: "GET", 
                    cache: "force-cache",
                    headers: {
                        "Authorization": input.amUrl.auth
                    }
                }); 

                if (!getRes.ok) throw new Error("Failed to fetch location data"); 
                getRes = await getRes.json(); 

                locationName = `at ${getRes.Name}`; 
                location += `<a target="_blank" href="https://www.google.com/maps/dir//'${getRes.Address.Latitude},${getRes.Address.Longitude}'/@${getRes.Address.Latitude},${getRes.Address.Longitude}">${getRes.Name}</a>\n${getRes.Address.Address1}\n${getRes.Address.City}, ${getRes.Address.StateProvince} ${getRes.Address.ZipPostalCode}\n\n`; 
            } catch(error) {
                console.log(error); 
            }
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
            if (item.HasWaitListEnabled) {
                registration_button_text = "Waitlist Here"; 
                spotsMsg = "<strong>All spots are taken.</strong> Click \"Waitlist Here\" and get notified when a spot opens up."; 
            } else {
                registration_button_text = ""; 
                registration_link = ""; 
                spotsMsg = "<strong>All spots are taken.</strong> We are no longer accepting registrations."; 
            }
        }

        // Builds more
        const prereq = (item.Prerequisite) ? item.Prerequisite : ""; 
        const note = (item.Note) ? item.Note : "";
        const more = `${prereq}\n\n${note}`; 

        // Builds main content and alt text
        const ages = (item.AgeSummary) ? `\n<strong>Ages:</strong> ${item.AgeSummary}` : ""; 
        const content = `${spotsMsg}${ages}\n\n${item.Description}`; 
        const altText = `${item.Name} ${locationName}`; 

        let acf = {
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
        input.objPost[index].bodyData["altText"] = altText; 
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

    function formatTime(time) { // Formats HMS to be more user-friendly
        let [hours, mins, secs] = time.split(":"); 
        let meridiem = "AM"; 

        if (hours > 12) {
            hours = hours - 12; 
            meridiem = "PM"; 
        } 

        return `${hours}:${mins} ${meridiem}`; 
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
 
        const startDate = new Date(item.StartDate).toDateString(); 
        const endDate = new Date(item.EndDate).toDateString(); 
        let scheduleSummary = "<ul>"; 

        if (item.Schedules.length > 1) {
            repeating_type = "random"; 

            for (const schedule of item.Schedules) {
                let timePeriod = schedule.TimePeriod; 
                let event_date = new Date(timePeriod.StartDate).toDateString(); 
                let start_time = formatTime(timePeriod.StartTime); 
                let end_time = formatTime(timePeriod.EndTime); 

                scheduleSummary += `<li>${event_date}, ${start_time} - ${end_time}</li>`; 

                let day = {
                    "event_date": formatDate(timePeriod.StartDate), 
                    "event_start_time": timePeriod.StartTime, 
                    "event_end_time": timePeriod.EndTime
                }

                recurring_event_days.push(day); 
            }

            scheduleSummary += "</ul>"; 
        } else if (item.Schedules.length == 1) {
            let timePeriod = item.Schedules[0].TimePeriod; 
            start_time = timePeriod.StartTime; 
            end_time = timePeriod.EndTime; 
            scheduleSummary = item.ScheduleSummary; 

            if (timePeriod.Days.length > 0) {
                repeating_type = "fixed"; 

                for (const day of timePeriod.Days) {
                    repeating_days.push(day); 
                }
            } 
        }

        const datestimes = `${startDate} to ${endDate}\n${scheduleSummary}`; 
        
        const acf = {
            repeating_event, 
            start_date, 
            end_date, 
            start_time, 
            end_time, 
            repeating_days, 
            datestimes
        }; 
        acf["recurring_event_non-consecutive_days"] = recurring_event_days; 
        if (repeating_type) acf["repeating_type"] = repeating_type; 

        input.objPost[index].bodyData["acf"] = {...actAcf, ...acf}; 
    }

    return input; 
}

async function assignCats(input) {
    const objPost = input.objPost; 
    const ageMap = {
        max: [5, 12, 19, 54, 99], 
        id: [2, 3, 4, 5, 6]
    }; 

    // Assigns categories
    try {
        let getRes = await fetch(`${input.wpUrl.url}activity-categories?per_page=100`, {
            method: "GET", 
            cache: "force-cache"
        });

        if (!getRes.ok) throw new Error("Failed to retrieve categories"); 
        getRes = await getRes.json(); 
        let wpCats = {}; 
        const regex1 = /[^\W\d]\w+/ig; 

        // Gets all WP categories
        for (const item of getRes) {
            const names = item.name.match(regex1).filter((item) => item != "and" && item != "amp");

            for (let name of names) {
                name = name.toLowerCase(); 
                if (wpCats[name]) {
                    wpCats[name] = [...wpCats[name], item.id]; 
                } else {
                    wpCats[name] = [item.id]; 
                }
            }
        }

        for (const [index, item] of objPost.entries()) {
            const keywordsOld = [item.Name, item.ProgramName, item.CategoryName, item.SubCategoryName];
            let keywordsNew = []; 
            let categories = []; 
            let ages = []; 

            for (const keyword of item.Keywords) {
                keywordsOld.push(keyword.Name); 
            }

            for (const keyword of keywordsOld) {
                const splitKeys = keyword.toLowerCase().match(regex1); 
                keywordsNew = [...keywordsNew, ...splitKeys]; 
            }

            for (const keyword of keywordsNew) {
                if (wpCats[keyword]) {
                    const exists = wpCats[keyword].some(item => categories.includes(item)); 
                    if (!exists) categories = [...categories, ...wpCats[keyword]];
                } 
            }

            // Assigns ages
            if (item.Age) {
                let max = (item.Age.Max) ? item.Age.Max : 99; 
                let min = (item.Age.Min) ? item.Age.Min : 0; 

                if (max > 54 && min < 13) ageGroups.push(105); // Pushes "family" id

                for (let i = 0; (min <= max) && (i < ageMap.max.length); i++) {
                    if (min <= ageMap.max[i]) {
                        ages.push(ageMap.id[i]); 
                        min = ageMap.max[i];
                    } 
                }
            }

            // 85 sets "event" category by default to allow datetime info
            input.objPost[index].bodyData["activity-categories"] = [85, ...categories]; 
            input.objPost[index].bodyData["age-groups"] = ages; 
        }
    } catch(error) {
        console.log(error); 
    }

    return input; 
}

// Searches Amilia for all new activites that need to be pushed to WP
let vpaCreator = new A2WP({
    amilia: {
        endpoint: "activities"
    }, 
    wp: {
        endpoint: "activities", 
        args: "amilia_id&status=publish&per_page=100"
    }, 
    msg: "Activity created" 
});
vpaCreator.addFunc(buildActACF);  
vpaCreator.addFunc(buildEventACF); 
vpaCreator.addFunc(assignCats);

// Updates data for 1 specific activity
let vpaUpdater = new A2WP({
    amilia: {
        endpoint: "activities/{id}"
    }, 
    wp: {
        endpoint: "activities", 
        args: `amilia_id`
    }, 
    msg: "Activity updated"
}); 
vpaUpdater.addFunc(getId); 
vpaUpdater.addFunc(buildActACF); 
vpaUpdater.addFunc(buildEventACF); 

module.exports = {
    vpaCreator: vpaCreator, 
    vpaUpdater: vpaUpdater
}; 