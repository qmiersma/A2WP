// ---- Make your custom functions here ----
function checkExists({input}) {
    const wpObj = input.wpObj; 
    const amObj = input.amObj; 
    let amObj2 = []; 

    amObj.forEach(amItem => {
        let check = false; 

        for (let i = 0; i < wpObj.length; i++) {
            if (wpObj[i].slug.includes(amItem.Id)) {
                check = true; 
                break; 
            }
        }

        // If activity does not yet exist in WP, adds to the "to make" list
        if (!check) amObj2.push(amItem); 
    }); 

    input.amObj = amObj2; 
    return input; 
}

function getId({input}) {

}

// ---- Create your categories here ----
const actCategories = {
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

// ---- Call your objects here ----
let actCreator = new A2WP({
    amilia: {
        endpoint: "activities"
    }, 
    wp: {
        endpoint: "activities", 
        args: "status=publish&per_page=100"
    }, 
    targetPath: "things-to-do-2", 
    templatePath: `${apiData.path}/html/activity-template.html`, 
    categories: actCategories
});
actCreator.addFunc(checkExists); 
actCreator.call(); 

const slugName = window.location.pathname.split("/")[2]; 
const amiliaId = (slugName.split("-")[1]) ? slugName.split("-")[1] : null; 

let actUpdater = new A2WP({
    amilia: {
        endpoint: `activities/${amiliaId}`
    }, 
    wp: {
        endpoint: "activities", 
        args: `slug=${slugName}`
    }, 
    targetPath: "things-to-do/{path}", 
    templatePath: `${apiData.path}/html/activity-template.html`, 
    categories: actCategories
}); 
// add funcs 
actUpdater.call(); 