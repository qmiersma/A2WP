class A2WP {
       constructor({getEndpoint, postEndpoint, templatePath, customFunc, targetPath, timer}) {
           this.url1 = "https://amilia-proxy.azurewebsites.net/api/callamilia"; 
           this.url2 = "https://sbvpastg.wpenginepowered.com/wp-json/wp/v2/"; 
           this.getEndpoint = getEndpoint; 
           this.postEndpoint = postEndpoint; 
           this.templatePath = templatePath; 
           this.customFunc = customFunc; 
           this.targetPath = targetPath; 
           this.timer = timer; 
       }
   
       checkRun(timer) {
           let check = [false, false]; 
           const currentPath = window.location.pathname.split("/")[1]; 
   
           check[0] = (currentPath == this.targetPath) ? true : false; 
   
           if (localStorage.lastChecked == null) {
               localStorage.setItem("lastChecked", new Date().getTime()); 
               check[1] = true; 
           } else {
               const currentDate = new Date().getTime(); 
   
               switch(timer) {
                   case "hour": 
                       if (((currentDate - localStorage.lastChecked) / 3600000) >= 1) {
                           check[1] = true; 
                           localStorage.lastChecked = currentDate; 
                       }
                       break; 
                   case "day": 
                       break; 
                   default: 
                       check[1] = true; 
               }
           }
       
           return (check[0] && check[1]); 
       }
   
       async fetchTemplate(path) {
           try {
               const response = await fetch(path); 
       
               if (!response.ok) {
                   throw new Error("Could not find HTML template file"); 
               }
       
               return response.text(); 
           } catch(error) {
               console.log(error); 
           }
       }
   
       async fetchData({url, method, site, endpoint = null, arg = null}) {
           let fetchInfo = {
               method: method, 
               headers: {
                   "Content-Type": "application/json"
               }
           }
   
           if (endpoint) fetchInfo.body = JSON.stringify({"endpoint": endpoint}); 
           if (arg) url = `${url}?${arg}`; 
   
           try {
               const response = await fetch(url, fetchInfo).then(function(response) {
                   if (!response.ok) {
                       throw new Error(`Unable to fetch data from ${site}`); 
                   } 
       
                   return response.json(); 
               }).then(function(data) {
                   console.log(data); // <-- for debugging
                   return data; 
               }); 
       
               return await response;
           } catch(error) {
               console.log(error); 
           }
       }
   
       // ADD TO POST: activity categories, age groups
       async postData({url, endpoint, content = null, author = null, title = null, status = null, slug = null, imgUrl = null}) {
           let postInfo; 
   
           postInfo = {
               method: "POST",
               headers: {
                   "Content-Type": "application/json", 
                   "X-WP-Nonce": apiData.nonce
               }, 
               body: JSON.stringify({
                   "title": title, 
                   "status": status,
                   "slug": slug,
                   "content": content, 
                   "author": author
               })
           }
   
           try {
               const response = await fetch(`${url}${endpoint}`, postInfo).then(function(response) {
                   if (!response.ok) {
                       throw new Error("Unable to post data"); 
                   }
       
                   return response.json(); 
               }).then(function(data) {
                   console.log(data); // <-- for debugging
                   return data; 
               }); 
       
               return await response; 
           } catch(error) {
               console.log(error); 
           }
       }
   
       async call() {
           // if (!this.checkRun(this.timer)) return; 
   
           console.log("A2WP script is running"); 
           let template = await this.fetchTemplate(this.templatePath); 
   
           if (!template) return; 
   
           let parser = new DOMParser, 
               page = parser.parseFromString(template, "text/html");
   
           this.customFunc({page: page, fetchData: this.fetchData, postData: this.postData, url1: this.url1, url2: this.url2, getEndpoint: this.getEndpoint, postEndpoint: this.postEndpoint}); 
       }
   }
   
   // ---- Make your custom functions here ----
   
   // Modifies activity-template.html and pushes the new activity to WP
   function createAct({page, fetchData, postData, url1, url2, getEndpoint, postEndpoint}) {
       fetchData({url: url1, method: "POST", site: "Amilia", endpoint: "activities"}).then(amObj => {
           if (typeof amObj == "undefined") return; 
           let check; 
   
           amObj.forEach((amItem) => {
               if (amItem.Status != "Hidden") {
                   fetchData({url: `${url2}${getEndpoint}`, method: "GET", site: "Wordpress", arg: "per_page=100"}).then(wpObj => {
                       if (typeof wpObj == "undefined") return; 
   
                       wpObj.some(function(wpItem) {
                           check = (`activity-${amItem.Id}` == `${wpItem.slug}`); 
                           console.log(`activity-${amItem.Id} == ${wpItem.slug}`, (`activity-${amItem.Id}` == `${wpItem.slug}`));
   
                           return check; 
                       }); 
   
                       if (!check) {
                           let locations = ""; 
                           amItem.Schedules[0].Locations.forEach(location => {
                               locations += `${location.Name}<br>`; 
                           });
                           const price = (amItem.Price != 0) ? `$${amItem.Price}` : "Free"; 
   
                           page.querySelector(".amilia-wp-activity-schedule-summary").innerHTML = amItem.ScheduleSummary; 
                           page.querySelector(".amilia-wp-activity-dates").innerHTML = `${amItem.StartDate} to ${amItem.EndDate}`; 
                           page.querySelector(".amilia-wp-activity-location").innerHTML = locations; 
                           page.querySelector(".amilia-wp-activity-price").innerHTML = price; 
                           page.querySelector(".amilia-wp-activity-register-btn").href = amItem.SecretUrl; 
                           page.querySelector(".amilia-wp-activity-responsible-name").innerHTML = amItem.ResponsibleName; 
                           page.querySelector(".amilia-wp-activity-note").innerHTML = amItem.Note; 
                           page.querySelector(".amilia-wp-activity-img").src = amItem.PictureUrl; 
                           page.querySelector(".amilia-wp-activity-img").alt = `${amItem.Name} image`; 
                           page.querySelector(".amilia-wp-activity-descript").innerHTML = `<p>${amItem.Description}</p>`; 
   
                           // Creates featured media
                           // postData({url: url, endpoint: "media", imgUrl: amItem.PictureUrl})
                           //     .then(data => {
                           //         console.log("IMG ID -->", data); 
                           //     }); 
                           
                           // *** API TEST will be removed from title field once out of testing stage
                           postData({url: url2, endpoint: postEndpoint, content: page.querySelector("body").innerHTML, author: 43, title: `API TEST: ${amItem.Name}`, status: "publish", slug: `activity-${amItem.Id}`}); 
   
                           console.log(`Activity ${amItem.Id} created`);
                       }
                   }); 
               }
           }); 
       }); 
   }
   
   function updateAct({page, fetchData, postData, url1, url2, getEndpoint, postEndpoint}) {
       fetchData({url: `${url2}${getEndpoint}`, method: "GET", site: "Wordpress", arg: "slug="})
   
       fetchData({url: url1, method: "POST", site: "Amilia", endpoint: "activities"}).then(amObj => {
           if (typeof amObj == "undefined") return; 
   
   
       }); 
   }
   
   // ---- Call your objects here ----
   
   let actCreator = new A2WP({
       getEndpoint: "activities",
       postEndpoint: "activities/", 
       templatePath: `${apiData.path}/html/activity-template.html`, 
       customFunc: createAct, 
       targetPath: "things-to-do-2", 
       timer: "hour"
   });
   actCreator.call(); 
   
   let actUpdater = new A2WP({
       getEndpoint: "activities", 
       postEndpoint: "activities/", 
       templatePath: `${apiData.path}/html/activity-template.html`, 
       customFunc: updateAct, 
       targetPath: "things-to-do", 
       timer: "none"
   });  
 
 
 
 
 
 
 
 
 
 
 
 // if (!imgUrl) {
        //     postInfo = {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json", 
        //             "X-WP-Nonce": apiData.nonce
        //         }, 
        //         body: JSON.stringify({
        //             "title": title, 
        //             "status": status,
        //             "slug": slug,
        //             "content": content, 
        //             "author": author
        //         })
        //     }
        // } else {
        //     console.log("Hey!"); 
        //     let idString = "1234567890abcdefghijklmnopqrstuvwxyz"; 
        //     let imgId = ""; 
        //     for (let i = 0; i < 5; i++) {
        //         imgId += idString[Math.floor(Math.random() * idString.length)]; 
        //     }

        //     let imgFileName = `${imgId}.${imgUrl.split(".").pop()}`; 


        //     let fetchTest = {
        //         method: "GET", 
        //         headers: {
        //             "Content-Type": "image/jpeg", 
        //             "X-WP-Nonce": apiData.nonce
        //         }
        //     }

        //     const response = await fetch(imgUrl, fetchTest);
        //     const blob = await response.blob();
        //     const formData = new FormData();
        //     formData.append('image', blob, imgFileName); 

        //     postInfo = {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "image/jpeg",
        //             "X-WP-Nonce": apiData.nonce
        //         }, 
        //         body: formData
        //     }
        // }

        function createAct({page, amItem, postData, url, endpoint}) {
              let locations = ""; 
              amItem.Schedules[0].Locations.forEach(location => {
                  locations += `${location.Name}<br>`; 
              });
              const price = (amItem.Price != 0) ? `$${amItem.Price}` : "Free"; 
          
              page.querySelector(".amilia-wp-activity-schedule-summary").innerHTML = amItem.ScheduleSummary; 
              page.querySelector(".amilia-wp-activity-dates").innerHTML = `${amItem.StartDate} to ${amItem.EndDate}`; 
              page.querySelector(".amilia-wp-activity-location").innerHTML = locations; 
              page.querySelector(".amilia-wp-activity-price").innerHTML = price; 
              page.querySelector(".amilia-wp-activity-register-btn").href = amItem.SecretUrl; 
              page.querySelector(".amilia-wp-activity-responsible-name").innerHTML = amItem.ResponsibleName; 
              page.querySelector(".amilia-wp-activity-note").innerHTML = amItem.Note; 
              page.querySelector(".amilia-wp-activity-img").src = amItem.PictureUrl; 
              page.querySelector(".amilia-wp-activity-img").alt = `${amItem.Name} image`; 
              page.querySelector(".amilia-wp-activity-descript").innerHTML = `<p>${amItem.Description}</p>`; 
          
              // Creates featured media
              postData({url: url, endpoint: "media", imgUrl: amItem.PictureUrl})
                  .then(data => {
                      console.log("IMG ID -->", data); 
                  }); 
              
              // *** API TEST will be removed from title field once out of testing stage
              postData({url: url, endpoint: endpoint, content: page.querySelector("body").innerHTML, author: 43, title: `API TEST: ${amItem.Name}`, status: "publish", slug: `activity-${amItem.Id}`}); 
          
              console.log(`Activity ${amItem.Id} created`);
          }

        this.fetchData({url: this.url1, method: "POST", site: "Amilia", endpoint: "activities", arg: this.args.amilia}).then(amObj => {
              if (typeof amObj == "undefined") return; 
  
              // amObj = [amObj[0], amObj[1]]; // <-- for debugging
  
              amObj.forEach((amItem, amIndex, amArray) => {
                  if (amItem.Status != "Hidden") {
                      this.fetchData({url: `${this.url2}${this.getEndpoint}`, method: "GET", site: "Wordpress", arg: this.args.wp}).then(wpObj => {
                          if (typeof wpObj == "undefined") return; 
      
                          wpObj.some(function(wpItem) {
                              check = (`activity-${amItem.Id}` == `${wpItem.slug}`); 
                              console.log(`activity-${amItem.Id} == ${wpItem.slug}`, (`activity-${amItem.Id}` == `${wpItem.slug}`));
      
                              return check; 
                          }); 
      
                          if (!check) {
                              this.customFunc({page: page, amItem: amItem, amIndex: amIndex, amArray: amArray, wrapper1: wrapper1, postData: this.postData, url: this.url2, endpoint: this.postEndpoint}); 
                          }
                      }); 
                  }
              }); 
          }); 