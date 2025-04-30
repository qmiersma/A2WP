// ---- Make your custom functions here ----

// Modifies activity-template.html and pushes the new activity to WP
function createAct({page, wpObj, amItem, postData, updateActDOM, url, endpoint, catDefs}) {
    let check = true; 
    if (wpObj == "undefined") wpObj = []; 

    for (let i = 0; i < wpObj.length; i++) {
        if (wpObj[i].slug.includes(amItem.Id)) {
            check = false; 
            break; 
        }
    }

    if (check) {
        const newPage = updateActDOM({page: page, amItem: amItem}); 

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
        postData({url: url, endpoint: endpoint, title: `API TEST: ${amItem.Name}`, author: 43, content: newPage.querySelector("body").innerHTML, status: "publish", slug: `activity-${amItem.Id}`, actCats: actCats, ageGroups: ageGroups, imgUrl: amItem.PictureUrl}); 
    }

    return false; 
}

function updateAct({page, wpObj, amItem, postData, updateActDOM, url, endpoint, catDefs}) {
    let id = wpObj[0].id; 

    const newPage = updateActDOM({page: page, amItem: amItem}); 

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

    postData({url: url, endpoint: endpoint, title: `API TEST: ${amItem.Name}`, author: 43, content: newPage.querySelector("body").innerHTML, status: "publish", slug: `activity-${amItem.Id}`, actCats: actCats, ageGroups: ageGroups, imgUrl: amItem.PictureUrl, id: id}); 

    return true; 
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
    amEndpoint: "activities",
    wpEndpoint: "activities", 
    templatePath: `${apiData.path}/html/activity-template.html`, 
    customFunc: createAct, 
    targetPath: {
        "parent": "things-to-do-2", 
        "child": false
    }, 
    args: {
        "amilia": null, 
        "wp": "status=publish&per_page=100"
    },
    timer: "hour", 
    catDefs: actCats
});
actCreator.call(); 

const slugName = window.location.pathname.split("/")[2]; 
const amiliaId = (slugName.split("-")[1]) ? slugName.split("-")[1] : null; 

let actUpdater = new A2WP({
    amEndpoint: `activities/${amiliaId}`, 
    wpEndpoint: "activities", 
    templatePath: `${apiData.path}/html/activity-template.html`, 
    customFunc: updateAct, 
    targetPath: {
        "parent": "things-to-do", 
        "child": true
    }, 
    args: {
        "amilia": null, 
        "wp": `slug=${slugName}`
    },
    timer: "none", 
    catDefs: actCats
});  
actUpdater.call(); 