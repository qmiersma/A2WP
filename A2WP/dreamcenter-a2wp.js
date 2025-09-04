const A2WP = require("../A2WP/a2wp.js").A2WP; 

function filterMLK(input) {
    input.objPost = input.objPost.filter(item => {
        const locations = item.Schedules[0].Locations; 
        if (locations.length < 1) return false; 

        return locations[0].Id == 2137969; 
    }); 

    input.locationId = 2137969; 
    return input; 
}

function buildEventACF(input) {
    const objPost = input.objPost; 

    function formatDate(date) { // Formats to remove HMS and hyphens
        return date.split("T")[0].replaceAll("-", ""); 
    }

    for (const [index, item] of objPost.entries()) {
        let timePeriod = item.Schedules[0].TimePeriod; // Change this once more time periods

        const content = item.Description; 
        const amilia_link = item.Url; 
        const event_start_date = formatDate(item.StartDate); 
        const event_end_date = formatDate(item.EndDate); 
        const event_start_time = timePeriod.StartTime; 
        const event_end_time = timePeriod.EndTime; 
        const price = item.Price; 

        let acf = {
            amilia_link, 
            event_start_date, 
            event_end_date, 
            event_start_time, 
            event_end_time, 
            price
        }; 

        // Sets body content for eventual post to WP
        input.objPost[index].bodyData = {}; 
        input.objPost[index].bodyData["title"] = item.Name; 
        input.objPost[index].bodyData["status"] = "publish"; 
        input.objPost[index].bodyData["slug"] = `event-${item.Id}`; 
        input.objPost[index].bodyData["content"] = content; 
        input.objPost[index].bodyData["acf"] = acf; 
        input.objPost[index].bodyData["amilia_id"] = `${item.Id}`; 
    }

    return input; 
}

async function buildLocationACF(input) {
    const objPost = input.objPost; 

    for (const [index, item] of objPost.entries()) {
        let oldAcf = item.bodyData["acf"]; 

        // Builds location 
        let event_location = ""; 
        let locationName = ""; 

        try {
            let getRes = await fetch(`${input.amUrl.url}locations/${input.locationId}`, {
                method: "GET", 
                cache: "force-cache",
                headers: {
                    "Authorization": input.amUrl.auth
                }
            }); 

            if (!getRes.ok) throw new Error("Failed to fetch location data"); 
            getRes = await getRes.json(); 

            locationName = `at ${getRes.Name}`; 
            event_location += `${getRes.Address.Address1}, ${getRes.Address.City}, ${getRes.Address.StateProvince} ${getRes.Address.ZipPostalCode}`; 
        } catch(error) {
            console.log(error); 
        }

        let acf = {event_location}; 
        const altText = `${item.Name} ${locationName}`; 

        input.objPost[index].bodyData["acf"] = {...oldAcf, ...acf};
        input.objPost[index].bodyData["altText"] = altText; 
    }

    return input; 
}


let mlkCreator = new A2WP({
    amilia: {
        endpoint: "activities"
    }, 
    wp: {
        endpoint: "events", 
        args: "amilia_id&status=publish&per_page=100"
    }, 
    msg: "Event created" 
});
mlkCreator.addFunc(filterMLK);
mlkCreator.addFunc(buildEventACF);  
mlkCreator.addFunc(buildLocationACF); 

module.exports = {
    mlkCreator: mlkCreator
}; 