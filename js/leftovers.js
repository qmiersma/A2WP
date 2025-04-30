
// checkRun remove timer, work something else out
// Build your url with JSON 
// Change querySelector body innner html so this happens in class, not object
// More queries I can add? 


// REBUILD
// NOTES: 
// You will never push to amilia, so that's only a POST endpoint
// wp endpoint is also mainly for POST, and when using GET it's getting items 
// from where you'd be posting

let actCreator = new A2WP({
    amilia: {
        "endpoint": "activities", 
        "args": "per_page=100" // Optional, if null then ""
    }, 
    wp: {
        "endpoint": "activities", 
        "args": "status=publish" // Optional
    }, 
    targetPath: "things-to-do-2{?path}", 
    categories: {} // Optional
});
actCreator.call(); 

// call()
// checkRun
// getTemplate if not null
// DOMparser for whatever's being returned, template or WP content
// fetch amilia and wp, send through customFuncs
// Generate what you send to postData (from what you receive from funcs)

// createFunc function? That acts kind of like enqueue scripts? 
//  Pushes function name to global class array, then executed in call
//  Returned information moves into next function (can I add another parameter to a function already made?)    

// Every customFunc passes additional parameters: fetchData, amObj, wpObj, results

// if create, create checkExists / if update, create getId
// create updateActDOM
// create assignCats
// create getLocation
// call









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



          const axios = require('axios');

module.exports = async function (context, req) {
    
    // Created on 2-7-25, should be valid for up to 1 year
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1MjY5NDc4IiwiZXhwIjoxNzcwNDc3MzMzLCJpYXQiOjE3Mzg5NDEzMzMsImp0aSI6IlFrdEduWm9OZlBMcGR4N3E3Tk04TVcxTHlackhvRGllQmxEeGx1Z2pWVFpvWjVXc2JHIn0.GLixjhgo-yjQxFbLHiAszZ9eRgzIlearNvASmhuFVTM";
    const baseUrl = `https://app.amilia.com/api/V3/en/org/sbvpa/${req.body.endpoint}`;

    let response = await axios({
        url: baseUrl,
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }, 
    });
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: response.data.Items
    };
}
