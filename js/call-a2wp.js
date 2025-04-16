// ---- Make your custom functions here ----

// Modifies activity-template.html and pushes the new activity to WP
function createAct({page, wpObj, amItem, postData, updateActDOM, url, endpoint, catDefs}) {
    let check = false; 
    if (wpObj == "undefined") wpObj = []; 

    check = wpObj.some(function(wpItem) {
        check = (`activity-${amItem.Id}` == `${wpItem.slug}`); 
        console.log(`activity-${amItem.Id} == ${wpItem.slug}`, (`activity-${amItem.Id}` == `${wpItem.slug}`));

        return check; 
    }); 

    if (!check) {
        const newPage = updateActDOM({page: page, amItem: amItem}); 
    
        // Creates featured media
        // postData({url: url, endpoint: "media", imgUrl: amItem.PictureUrl})
        //     .then(data => {
        //         console.log("IMG ID -->", data); 
        //     }); 

        let actCats = catDefs["Categories"][amItem.ProgramName]; 
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
        
        // *** API TEST will be removed from title field once out of testing stage
        postData({url: url, endpoint: endpoint, content: newPage.querySelector("body").innerHTML, author: 43, title: `API TEST: ${amItem.Name}`, status: "publish", slug: `activity-${amItem.Id}`, actCats: actCats, ageGroups: ageGroups}); 
    
        console.log(`Activity ${amItem.Id} created`);
    }

    return false; 
}

function updateAct({page, wpObj, amItem, postData, updateActDOM, url, endpoint, catDefs}) {
    let check = false; 
    let id; 
    if (wpObj == "undefined") wpObj = []; 

    check = wpObj.some(function(wpItem) {
        check = (`activity-${amItem.Id}` == `${wpItem.slug}`); 
        id = wpItem.id; 

        return check; 
    }); 

    if (check) {
        const newPage = updateActDOM({page: page, amItem: amItem}); 

        // Creates featured media
        // postData({url: url, endpoint: "media", imgUrl: amItem.PictureUrl})
        //     .then(data => {
        //         console.log("IMG ID -->", data); 
        //     }); 

        let actCats = catDefs["Categories"][amItem.ProgramName]; 
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
    
        postData({url: url, endpoint: `${endpoint}${id}`, content: newPage.querySelector("body").innerHTML, author: 43, title: `API TEST: ${amItem.Name}`, status: "publish", slug: `activity-${amItem.Id}`, actCats: actCats, ageGroups: ageGroups}); 
    
        console.log(`Activity ${amItem.Id} updated`);

        return true; 
    }

    return false; 
}

// ---- Call your objects here ----

// Links VPA programs to 1 or more WP post categories
const actCats = {
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

let actCreator = new A2WP({
    getEndpoint: "activities",
    postEndpoint: "activities/", 
    templatePath: `${apiData.path}/html/activity-template.html`, 
    customFunc: createAct, 
    targetPath: {
        "parent": "things-to-do-2", 
        "child": false
    }, 
    args: {
        "amilia": null, 
        "wp": "per_page=100"
    },
    timer: "hour", 
    catDefs: actCats
});
actCreator.call(); 

let actUpdater = new A2WP({
    getEndpoint: "activities", 
    postEndpoint: "activities/", 
    templatePath: `${apiData.path}/html/activity-template.html`, 
    customFunc: updateAct, 
    targetPath: {
        "parent": "things-to-do", 
        "child": true
    }, 
    args: {
        "amilia": null, 
        "wp": `slug=${window.location.pathname.split("/")[2]}`
    },
    timer: "none", 
    catDefs: actCats
});  
actUpdater.call(); 