const A2WP = require("../A2WP/a2wp.js").A2WP; 

function filterMLK(input) {
    input.objPost = input.objPost.filter(item => item.CategoryId == "5843999"); 

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
        const schedules = (item.Schedules) ? item.Schedules[0].Locations : []; 
        for (const loc of schedules) {
            let getRes = await fetch("https://amilia-img-proxy.azurewebsites.net/api/GetAmilia", {
                method: "POST", 
                body: JSON.stringify({"endpoint": `locations/${loc.Id}`})
            }); 

            if (!getRes.ok) break; 
            getRes = await getRes.json(); 

            event_location += `${getRes.Address.Address1}, ${getRes.Address.City}, ${getRes.Address.StateProvince} ${getRes.Address.ZipPostalCode}`; 
        }

        let acf = {event_location}; 
        input.objPost[index].bodyData["acf"] = {...oldAcf, ...acf};
    }

    return input; 
}


let mlkCreator = new A2WP({
    amilia: {
        endpoint: "activities"
    }, 
    wp: {
        url: "https://dreamcente2dev.wpenginepowered.com/wp-json/wp/v2/",
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