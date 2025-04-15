// ---- Make your custom functions here ----

// Modifies activity-template.html and pushes the new activity to WP
function createAct({page, wpObj, amItem, postData, updateActDOM, url, endpoint}) {
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
        
        // *** API TEST will be removed from title field once out of testing stage
        postData({url: url, endpoint: endpoint, content: newPage.querySelector("body").innerHTML, author: 43, title: `API TEST: ${amItem.Name}`, status: "publish", slug: `activity-${amItem.Id}`}); 
    
        console.log(`Activity ${amItem.Id} created`);
    }

    return false; 
}

function updateAct({page, wpObj, amItem, postData, updateActDOM, url, endpoint}) {
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
    
        postData({url: url, endpoint: `${endpoint}${id}`, content: newPage.querySelector("body").innerHTML, author: 43, title: `API TEST: ${amItem.Name}`, status: "publish", slug: `activity-${amItem.Id}`}); 
    
        console.log(`Activity ${amItem.Id} updated`);

        return true; 
    }

    return false; 
}

// ---- Call your objects here ----

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
    timer: "hour"
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
    timer: "none"
});  
actUpdater.call(); 