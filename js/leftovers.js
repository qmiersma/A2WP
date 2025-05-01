
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

