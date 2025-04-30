
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
        "args": "per_page=100" // Optional, if null then "" // ARGS ARE ONLY FOR FETCHING DATA
    }, 
    wp: {
        "endpoint": "activities", 
        "args": "status=publish" // Optional
    }, 
    templatePath: whatever, // optional
    targetPath: "things-to-do-2/{path?}", // CHANGE THIS TO FULL URL!!
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

