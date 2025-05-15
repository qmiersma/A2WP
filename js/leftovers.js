function checkExists2(input) {
    const amObj = [input.amObj[0], input.amObj[1], input.amObj[12], input.amObj[35]]; 
    // const amObj = input.amObj; 
    const wpObj = input.wpObj; 
    let newAmObj = []; 

    amObj.forEach(amItem => {
        if (amItem.Status != "Hidden") {
            let check = false; 

            for (let i = 0; i < wpObj.length; i++) {
                if (amItem.Id == wpObj[i].meta.amilia_id) {
                    check = true; 
                    break; 
                }
            }

            // If activity does not yet exist in WP, adds to the "to make" list
            if (!check) newAmObj.push(amItem); 
        }
    }); 

    input.amObj = newAmObj; 
    return input; 
}





if (wpObj[i].slug.includes(amItem.Id)) {
                    check = true; 
                    break; 
                }

                this.customFuncs.forEach(customFunc => {
                    console.log(`4. Running func: ${customFunc.name}`); // TESTING
                    results = customFunc(results); 
                    console.log("5. Results -->", results); 
                }); 


                const template = await this.fetchTemplate(this.templatePath)
        if (!template) return; 

        let parser = new DOMParser, 
            page = parser.parseFromString(template, "text/html"); 

                 // Grabs HTML template's contents
    async fetchTemplate(path) {
        try {
            const response = await fetch(path); 
    
            if (!response.ok) throw new Error("Could not find HTML template file"); 
    
            return await response.text(); 
        } catch(error) {
            console.log(error); 
        }
    }

    templatePath: `${apiData.path}/html/activity-template.html`, 

    // const bodyData = {
            //     "title": `API TEST: ${amItem.Name}`,
            //     "author": 43,
            //     "content": amItem.content, 
            //     "acf": amItem.acf,
            //     "status": "publish", 
            //     "slug": `activity-${amItem.Id}`,
            //     "activity-categories": amItem.catIds, 
            //     "age-groups": amItem.ageGroups, 
            //     "meta": {"amilia_id": `${amItem.Id}`}
            // }; 


    // const amiliaId = (slugName.split("-")[1]) ? slugName.split("-")[1] : null; 

// Reads HTML template and populates it with activity data
async function updateActDOM(input) {
    const amObj = input.amObj; 
    const page = input.page; 

    for (const [index, amItem] of amObj.entries()) {
        let locations = ""; 

        for (const location of amItem.Schedules[0].Locations) {
            let getRes = await fetch("https://amilia-img-proxy.azurewebsites.net/api/GetAmilia", {
                method: "POST", 
                body: JSON.stringify({"endpoint": `locations/${location.Id}`})
            }); 

            if (!getRes.ok) break; 
            getRes = await getRes.json(); 

            page.querySelector("#amilia-wp-activity-location-name").innerHTML = getRes.Name; 
            page.querySelector("#amilia-wp-activity-location-address1").innerHTML = getRes.Address.Address1; 
            page.querySelector("#amilia-wp-activity-location-address2").innerHTML = `${getRes.Address.City}, ${getRes.Address.StateProvince} ${getRes.Address.ZipPostalCode}<br><br>`; 

            locations += page.querySelector("#amilia-wp-activity-location").innerHTML; 
        }
        const price = (amItem.Price != 0) ? `$${amItem.Price}` : "Free"; 

        const startDate = new Date(amItem.StartDate).toLocaleDateString(); 
        const endDate = new Date(amItem.EndDate).toLocaleDateString(); 

        page.querySelector("#amilia-wp-activity-schedule-summary").innerHTML = amItem.ScheduleSummary; 
        page.querySelector("#amilia-wp-activity-dates").innerHTML = `${startDate} to ${endDate}`; 
        page.querySelector("#amilia-wp-activity-location").innerHTML = locations; 
        page.querySelector("#amilia-wp-activity-price").innerHTML = price; 
        page.querySelector("#amilia-wp-activity-register-btn > a").href = amItem.SecretUrl; 
        page.querySelector("#amilia-wp-activity-responsible-name").innerHTML = amItem.ResponsibleName; 
        page.querySelector("#amilia-wp-activity-note").innerHTML = amItem.Note; 
        page.querySelector("#amilia-wp-activity-descript").innerHTML = `<p>${amItem.Description}</p>`;  

        input.amObj[index].page = page.querySelector("body").innerHTML; 
    }
 
    return input; 
}








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




          [
            {
                "Tags": [],
                "Description": "<p>The goal of Friday Night Hoops is to provide middle school boys and girls with a fun and supportive enviorment to improve their basketball skills, build friendships, and recive mentorship. This program aims to inspire personal growth, resiliance, and confidance by teaching core values that help youth become strong positive leaders in their communities.&nbsp;&nbsp;</p>\n",
                "Prerequisite": null,
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 0,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": null,
                "MaxAttendance": 2147483647,
                "SpotsRemaining": null,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 7,
                "StartDate": "2025-04-25T17:00:00-04:00",
                "EndDate": "2025-10-24T20:00:00-04:00",
                "ScheduleSummary": "Fourth Friday of every month, 5:00 PM - 8:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": false,
                "AgeSummary": "",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 54832,
                        "Type": "Children",
                        "Name": "MLK_Friday Night Hoops at Dream Center "
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=ydzQ0Q8",
                "PictureUrl": null,
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "17:00:00",
                            "EndTime": "20:00:00",
                            "StartDate": "2025-04-25T00:00:00",
                            "EndDate": "2025-10-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-10-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [],
                            "RecurrenceUnitType": "month",
                            "MonthType": "DayOfTheWeek"
                        },
                        "Staff": [
                            {
                                "Object": "Person",
                                "State": "Normal",
                                "FullName": null,
                                "FirstName": "Cedrick",
                                "LastName": "Joseph-Pauline",
                                "Type": "PhysicalPerson",
                                "Id": 72340531
                            }
                        ],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5836165,
                "Name": "Friday Night Hoops",
                "ProgramId": 113926,
                "ProgramName": "Athletics 2025",
                "CategoryId": 5836163,
                "CategoryName": "Basketball",
                "SubCategoryId": 5836164,
                "SubCategoryName": "Middle School Basketball",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5836165",
                "Status": "Hidden"
            },
            {
                "Tags": [],
                "Description": "<p>A gathering place at the Dream Center for artists to connect with their musical passions, while engaging with an audience. Evidence that there is a safe place in the community that nurtures the Mind, Body, and Soul.</p>\n\n<p>Opening Night with Brollision: An upcoming Cover Band of Brothers, providing an electrical sound of R&amp;B, Funk, and Pop Faves!</p>\n",
                "Prerequisite": "Age 21 and older.",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "dmarshall@southbendin.gov",
                "Price": 0,
                "DropInPrice": 10,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 100,
                    "Min": 21,
                    "Months": false
                },
                "MaxAttendance": 2147483647,
                "SpotsRemaining": null,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 6,
                "StartDate": "2025-05-02T19:00:00-04:00",
                "EndDate": "2025-06-06T20:30:00-04:00",
                "ScheduleSummary": "Fridays, 7:00 PM - 8:30 PM",
                "HasSessionEnabled": false,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": true,
                "AgeSummary": "21-100",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 8856636,
                        "StartTime": "2025-04-11T19:00:00-04:00",
                        "EndTime": "2025-04-11T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 8856637,
                        "StartTime": "2025-04-18T19:00:00-04:00",
                        "EndTime": "2025-04-18T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 8856638,
                        "StartTime": "2025-04-25T19:00:00-04:00",
                        "EndTime": "2025-04-25T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 8856639,
                        "StartTime": "2025-05-02T19:00:00-04:00",
                        "EndTime": "2025-05-02T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 8856640,
                        "StartTime": "2025-05-09T19:00:00-04:00",
                        "EndTime": "2025-05-09T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 8856641,
                        "StartTime": "2025-05-16T19:00:00-04:00",
                        "EndTime": "2025-05-16T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 8856642,
                        "StartTime": "2025-05-23T19:00:00-04:00",
                        "EndTime": "2025-05-23T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 8856643,
                        "StartTime": "2025-05-30T19:00:00-04:00",
                        "EndTime": "2025-05-30T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xW54jnv",
                "PictureUrl": "https://8ecc6f20896b2edeb466-34ce08a98758d5663214f59d2b5e929f.ssl.cf2.rackcdn.com//088a2b1a-4723-485d-954b-c4dfb50b6c0d_Brollision.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "19:00:00",
                            "EndTime": "20:30:00",
                            "StartDate": "2025-05-02T00:00:00",
                            "EndDate": "2025-06-06T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-06T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [
                            {
                                "Object": "Person",
                                "State": "Normal",
                                "FullName": null,
                                "FirstName": "Daniel",
                                "LastName": "Marshall",
                                "Type": "PhysicalPerson",
                                "Id": 71452425
                            }
                        ],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5842199,
                "Name": "Fireside Friday May 2nd",
                "ProgramId": 114039,
                "ProgramName": "Events 2025",
                "CategoryId": 5842197,
                "CategoryName": "Adult Programming",
                "SubCategoryId": 5842198,
                "SubCategoryName": "Fireside Fridays",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5842199",
                "Status": "Hidden"
            },
            {
                "Tags": [],
                "Description": "<p>Our camp is designed to empower young minds through a variety of dynamic activities, ensuring a summer filled with creativity, exploration, and personal development.</p>\n",
                "Prerequisite": "Must have completed Kindergarten",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "Tamela Weatherspoon",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 12,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 60,
                "SpotsRemaining": 57,
                "SpotsReserved": 3,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-06-16T08:30:00-04:00",
                "EndDate": "2025-06-20T17:00:00-04:00",
                "ScheduleSummary": "Every day, 8:30 AM - 5:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-12",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 54747,
                        "Type": "Children",
                        "Name": "CP-CBC-ChildForm-2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xYX0LlD",
                "PictureUrl": "https://cc96a7209c1bf1f0f358-8b793bb0bebc8139f782f424df842a23.ssl.cf2.rackcdn.com//b9cadd2c-7f8b-4da6-8407-ada6dc402376_Screenshot_2025_05_07_144821.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "08:30:00",
                            "EndTime": "17:00:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "08:30:00",
                            "EndTime": "17:00:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-16T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "08:30:00",
                            "EndTime": "17:00:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-20T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [],
                            "RecurrenceUnitType": "day",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2179681,
                                "Name": "Charles Black Center"
                            }
                        ]
                    }
                ],
                "Id": 5843705,
                "Name": "All Stars Summer Camp - Week 1",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5843703,
                "CategoryName": "Charles Black Community Center",
                "SubCategoryId": 6006233,
                "SubCategoryName": "All Stars Summer Camp ",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5843705",
                "Status": "Normal"
            },
            {
                "Tags": [
                    {
                        "Id": 8054049,
                        "Name": "kids"
                    }
                ],
                "Description": "<p>Summer camp at the Dream Center locted at 1522 Linden Ave is a full day of fun open to students from ages 5-12! Between the hours of 7am and 6pm our campers will have opportunties to indulge sports, wellness, arts, and enrichment opportunities. There will also be fun field trip days were we will boraden our campers horzions by teching them through real life experiences! Lunch and dinner will be provided, we hope to see you there!</p>\n",
                "Prerequisite": null,
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 60,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 12,
                    "Min": 4,
                    "Months": false
                },
                "MaxAttendance": 150,
                "SpotsRemaining": 139,
                "SpotsReserved": 11,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-06-09T07:00:00-04:00",
                "EndDate": "2025-06-13T18:00:00-04:00",
                "ScheduleSummary": "Weekdays, 7:00 AM - 6:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "4-12",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 8858688,
                        "StartTime": "2025-05-06T00:00:00-04:00",
                        "EndTime": "2025-08-11T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 54029,
                        "Type": "Adult",
                        "Name": "MLK_Adult Dreamers Membership Form"
                    },
                    {
                        "Id": 54825,
                        "Type": "Children",
                        "Name": "MLK_Dream Academy Summer Camp Form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xAo0YY1",
                "PictureUrl": "https://76fd57acd92498ce0128-b6faf3c00eee5c4389582c8ba35c41fa.ssl.cf2.rackcdn.com//69741329-d9cd-4255-92b5-ff03c17d94a3_313868655_490036636482669_3071123672927260803_n.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "07:00:00",
                            "EndTime": "18:00:00",
                            "StartDate": "2025-06-09T00:00:00",
                            "EndDate": "2025-06-13T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-13T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5844001,
                "Name": "MLK Dream Academy Summer Camp - Week 1",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5843999,
                "CategoryName": "Dream Academy",
                "SubCategoryId": 5844000,
                "SubCategoryName": "MLK Dream Academy Summer Camp",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5844001",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": null,
                "Prerequisite": null,
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 20,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 12,
                    "Min": 8,
                    "Months": false
                },
                "MaxAttendance": 30,
                "SpotsRemaining": 30,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 1,
                "StartDate": "2025-07-21T10:00:00-04:00",
                "EndDate": "2025-07-21T16:00:00-04:00",
                "ScheduleSummary": "Monday, July 21, 2025, 10:00 AM - 4:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": false,
                "AgeSummary": "8-12",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 8858728,
                        "StartTime": "2025-07-01T00:00:00-04:00",
                        "EndTime": "2025-07-14T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xYX0LEe",
                "PictureUrl": null,
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "16:00:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-21T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5844049,
                "Name": "Pinhook Glam Camp 2025",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5844047,
                "CategoryName": "Pinhook Community Center",
                "SubCategoryId": 5844048,
                "SubCategoryName": "Pinhook Glam Camp",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5844049",
                "Status": "Hidden"
            },
            {
                "Tags": [],
                "Description": "<p>Middle School - After School programming is from --- until --- pm and includes the following programming</p>\n\n<p>- sports</p>\n\n<p>- arts</p>\n",
                "Prerequisite": null,
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 0,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": null,
                "MaxAttendance": 50,
                "SpotsRemaining": 50,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 40,
                "StartDate": "2025-04-14T15:00:00-04:00",
                "EndDate": "2025-06-06T17:00:00-04:00",
                "ScheduleSummary": "Weekdays, 3:00 PM - 5:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": false,
                "AgeSummary": "",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xAo0Rw3",
                "PictureUrl": null,
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "15:00:00",
                            "EndTime": "17:00:00",
                            "StartDate": "2025-04-14T00:00:00",
                            "EndDate": "2025-06-06T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-06T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [
                            {
                                "Object": "Person",
                                "State": "Normal",
                                "FullName": null,
                                "FirstName": "Phillip",
                                "LastName": "Williams",
                                "Type": "PhysicalPerson",
                                "Id": 70732662
                            }
                        ],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5846445,
                "Name": "Middle School After School ",
                "ProgramId": 114062,
                "ProgramName": "After School Programs Spring 2025",
                "CategoryId": 5846443,
                "CategoryName": "Dream Academy (MLK Dream Center After School Program)",
                "SubCategoryId": 5846444,
                "SubCategoryName": "Dream Academy (Middle School)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5846445",
                "Status": "Hidden"
            },
            {
                "Tags": [],
                "Description": "<p>Middle School - After School programming is from --- until --- pm and includes the following programming</p>\n\n<p>- sports</p>\n\n<p>- arts</p>\n",
                "Prerequisite": null,
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 0,
                "DropInPrice": 0,
                "DisplayOrder": 2,
                "Age": null,
                "MaxAttendance": 50,
                "SpotsRemaining": 50,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 40,
                "StartDate": "2025-04-14T15:00:00-04:00",
                "EndDate": "2025-06-06T17:00:00-04:00",
                "ScheduleSummary": "Weekdays, 3:00 PM - 5:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": false,
                "AgeSummary": "",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yQ9qEG0",
                "PictureUrl": null,
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "15:00:00",
                            "EndTime": "17:00:00",
                            "StartDate": "2025-04-14T00:00:00",
                            "EndDate": "2025-06-06T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-06T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [
                            {
                                "Object": "Person",
                                "State": "Normal",
                                "FullName": null,
                                "FirstName": "Phillip",
                                "LastName": "Williams",
                                "Type": "PhysicalPerson",
                                "Id": 70732662
                            }
                        ],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5846448,
                "Name": "Elementary After School ",
                "ProgramId": 114062,
                "ProgramName": "After School Programs Spring 2025",
                "CategoryId": 5846443,
                "CategoryName": "Dream Academy (MLK Dream Center After School Program)",
                "SubCategoryId": 5846449,
                "SubCategoryName": "Dream Academy (Elementary)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5846448",
                "Status": "Hidden"
            },
            {
                "Tags": [],
                "Description": null,
                "Prerequisite": null,
                "Note": "21+ Only Event! \n",
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "Kelli Austin ",
                "Price": 0,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": null,
                    "Min": 21,
                    "Months": false
                },
                "MaxAttendance": 200,
                "SpotsRemaining": 200,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 1,
                "StartDate": "2025-07-11T18:00:00-04:00",
                "EndDate": "2025-07-11T20:00:00-04:00",
                "ScheduleSummary": "Friday, July 11, 2025, 6:00 PM - 8:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": false,
                "AgeSummary": "21+",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9079900,
                        "StartTime": "2025-05-01T00:00:00-04:00",
                        "EndTime": "2025-07-11T12:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xwZvrp8",
                "PictureUrl": null,
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "18:00:00",
                            "EndTime": "20:00:00",
                            "StartDate": "2025-07-11T00:00:00",
                            "EndDate": "2025-07-11T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2179681,
                                "Name": "Charles Black Center"
                            }
                        ]
                    }
                ],
                "Id": 5849231,
                "Name": "Adult Recess Summer 2025 ",
                "ProgramId": 114039,
                "ProgramName": "Events 2025",
                "CategoryId": 5842197,
                "CategoryName": "Adult Programming",
                "SubCategoryId": 5849230,
                "SubCategoryName": "Adult Recess",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5849231",
                "Status": "Hidden"
            },
            {
                "Tags": [],
                "Description": "<p>This chair aerobics class is designed for our Silver Dreamer community. Lead by a fellow Silver Dreamer member this class focuses on improving quality of life by challanging you to improve your overall fitness level through a full body low impact workout that will leave you sweating. Through this class our Silver Dreamers will improve their overall health, gain a sense of community, and most importantly enjoy a fun filled morning of exercise.&nbsp;</p>\n",
                "Prerequisite": null,
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "ajohnson@southbendin.gov",
                "Price": 0,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": null,
                    "Min": 55,
                    "Months": false
                },
                "MaxAttendance": 2147483647,
                "SpotsRemaining": null,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 16,
                "StartDate": "2025-05-02T10:00:00-04:00",
                "EndDate": "2025-06-06T11:00:00-04:00",
                "ScheduleSummary": "Mondays, Wednesdays, Fridays, 10:00 AM - 11:00 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": false,
                "AgeSummary": "55+",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 8867811,
                        "StartTime": "2025-04-04T08:00:00-04:00",
                        "EndTime": null,
                        "RegistrationCriterionType": "Memberships",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53985,
                        "Type": "Adult",
                        "Name": "MLK_Silver Dreamers Form"
                    },
                    {
                        "Id": 54028,
                        "Type": "Children",
                        "Name": "MLK_Youth Dreamers Membership Form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xjvGKlL",
                "PictureUrl": null,
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "11:00:00",
                            "StartDate": "2025-05-02T00:00:00",
                            "EndDate": "2025-06-06T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-06T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Wednesday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [
                            {
                                "Object": "Person",
                                "State": "Normal",
                                "FullName": null,
                                "FirstName": "Anaya",
                                "LastName": "Johnson",
                                "Type": "PhysicalPerson",
                                "Id": 71059350
                            }
                        ],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5850776,
                "Name": " Chair Aerobics",
                "ProgramId": 113581,
                "ProgramName": "Senior (55+) 2025",
                "CategoryId": 5850774,
                "CategoryName": "Silver Dreamers",
                "SubCategoryId": 5850775,
                "SubCategoryName": "Fitness",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5850776",
                "Status": "Hidden"
            },
            {
                "Tags": [],
                "Description": "<p>Whether you&#39;re wanting a great cardio burn, to hit a new pr on the weights, or are just begining on your fitness journey our top of the line fitness room has something for you. Eqiupped with rowers, tredmils, squat racks, free weights, and so much more we encourgae you to come check us out! In the mood for a good walk? Come enjoy a stroll on our indoor track!</p>\n",
                "Prerequisite": null,
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "Twenty dollar monthly fee for Adult dreamers ",
                "ResponsibleName": "Anaya Johnson",
                "Price": 0,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 101,
                    "Min": 18,
                    "Months": false
                },
                "MaxAttendance": 2147483647,
                "SpotsRemaining": null,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 53,
                "StartDate": "2025-06-09T09:00:00-04:00",
                "EndDate": "2025-08-08T21:00:00-04:00",
                "ScheduleSummary": "Weekdays, 9:00 AM - 9:00 PM, Saturdays, 9:00 AM - 5:00 PM",
                "HasSessionEnabled": false,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": false,
                "AgeSummary": "18-101",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 8903453,
                        "StartTime": "2025-05-01T11:08:50-04:00",
                        "EndTime": null,
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 54029,
                        "Type": "Adult",
                        "Name": "MLK_Adult Dreamers Membership Form"
                    },
                    {
                        "Id": 54028,
                        "Type": "Children",
                        "Name": "MLK_Youth Dreamers Membership Form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xELdN2X",
                "PictureUrl": null,
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "09:00:00",
                            "EndTime": "21:00:00",
                            "StartDate": "2025-06-09T00:00:00",
                            "EndDate": "2025-08-08T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-08-08T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [
                            {
                                "Object": "Person",
                                "State": "Normal",
                                "FullName": null,
                                "FirstName": "Anaya",
                                "LastName": "Johnson",
                                "Type": "PhysicalPerson",
                                "Id": 71059350
                            }
                        ],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "09:00:00",
                            "EndTime": "17:00:00",
                            "StartDate": "2025-06-09T00:00:00",
                            "EndDate": "2025-08-08T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-08-08T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Saturday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [
                            {
                                "Object": "Person",
                                "State": "Normal",
                                "FullName": null,
                                "FirstName": "Anaya",
                                "LastName": "Johnson",
                                "Type": "PhysicalPerson",
                                "Id": 71059350
                            }
                        ],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5871373,
                "Name": "Fitness Studio and Track",
                "ProgramId": 114092,
                "ProgramName": "Health and Wellness 2025",
                "CategoryId": 5871371,
                "CategoryName": "Dream Center Fitness ",
                "SubCategoryId": 5871372,
                "SubCategoryName": "Fitness Studio and Track",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5871373",
                "Status": "Hidden"
            },
            {
                "Tags": [],
                "Description": "<p>Discover a midweek ritual designed just for you&mdash;a space to breathe, move, and connect with both your community and the beauty of nature.</p>\n\n<p>&nbsp;</p>\n\n<p>Whether you&#39;re seeking self-care, social connection, or simply an hour to unwind, this weekly class offers a playful yet nourishing blend of Yin and&nbsp;Vinyasa Yoga, supporting both strength and restoration.</p>\n\n<p>&nbsp;</p>\n\n<p>Join us for a Free Yoga Flow on the Earth at Howard Park each Wednesday, guided by Lindsey Frick @flowwithfrick. A motivator and mentor for movers of all experience levels - she is excited to offer outdoor yoga to the community for a fifth season.&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>Mark your calendar and share with a friend! Make Wednesday Outdoor Yoga part of your weekly routine from May &ndash; July 2025.&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>You&#39;ll get to flow beneath the trees, near wildflowers, with both sun and shade available.</p>\n",
                "Prerequisite": "No prior experience is necessary—just come as you are, move as you need, and leave feeling refreshed! ??",
                "Note": "What to bring: A yoga mat + a blanket or sheet for extra comfort. (Extra mats available!)\nWear something breathable and flowy as we will be outside.  Don't forget a water bottle to keep you hydrated!",
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "Howard Park (574) 299-4765",
                "Price": 30,
                "DropInPrice": 5,
                "DisplayOrder": 1,
                "Age": {
                    "Max": null,
                    "Min": 18,
                    "Months": false
                },
                "MaxAttendance": 50,
                "SpotsRemaining": 50,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 18,
                "StartDate": "2025-06-04T18:30:00-04:00",
                "EndDate": "2025-10-01T19:30:00-04:00",
                "ScheduleSummary": "Wednesdays, 6:30 PM - 7:30 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": false,
                "AgeSummary": "18+",
                "Keywords": [
                    {
                        "Id": 615,
                        "Name": "Flow Yoga"
                    }
                ],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9025006,
                        "StartTime": "2025-03-29T16:23:17-04:00",
                        "EndTime": "2025-03-30T18:15:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 55340,
                        "Type": "Adult",
                        "Name": "REC - Howard Park Classes 2025"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xW5jdoZ",
                "PictureUrl": "https://fc7a70746bb307e89b69-5b270a6c3476c46f1436ceb5da2e67e7.ssl.cf2.rackcdn.com//2f837971-7e39-410e-8923-9093174f76c6_Yoga_Flow.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "18:30:00",
                            "EndTime": "19:30:00",
                            "StartDate": "2025-06-04T00:00:00",
                            "EndDate": "2025-10-01T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-10-01T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Wednesday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [
                            {
                                "Object": "Person",
                                "State": "Normal",
                                "FullName": null,
                                "FirstName": "Lindsey",
                                "LastName": "Frick",
                                "Type": "PhysicalPerson",
                                "Id": 73833820
                            }
                        ],
                        "Locations": [
                            {
                                "Id": 2151200,
                                "Name": "Solar Lawn"
                            }
                        ]
                    }
                ],
                "Id": 5882011,
                "Name": "Yoga Flow- Outdoors",
                "ProgramId": 114092,
                "ProgramName": "Health and Wellness 2025",
                "CategoryId": 5882009,
                "CategoryName": "Howard Park Fitness",
                "SubCategoryId": 5882010,
                "SubCategoryName": "Yoga",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5882011",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><span style=\"color:black\">The &ldquo;Mommy, Daddy and Me&rdquo; walk is a family friendly event where parents and children can participate in a walk together. This program was created to promote family bonding, physical activity and community engagement. We will partner with other organizations </span></p>\n",
                "Prerequisite": null,
                "Note": "We will be walking laps around Dream Center and after each lap one of the staff members will give an affirmation about families and togetherness. We’ll have activity station outlined the walking trail, and refreshment table. ",
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 0,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": null,
                "MaxAttendance": 2147483647,
                "SpotsRemaining": null,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 1,
                "StartDate": "2025-08-21T18:00:00-04:00",
                "EndDate": "2025-08-21T20:00:00-04:00",
                "ScheduleSummary": "Thursday, August 21, 2025, 6:00 PM - 8:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": false,
                "AgeSummary": "",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 8932743,
                        "StartTime": "2025-04-04T14:30:45-04:00",
                        "EndTime": "2025-08-21T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=y2p6dp1",
                "PictureUrl": "https://414093067f7c1f59e027-4a76053333ef9d08701d972e330daed7.ssl.cf2.rackcdn.com//b9f39b06-9e50-415a-ad67-9919cdd7ac0d_MDW.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "18:00:00",
                            "EndTime": "20:00:00",
                            "StartDate": "2025-08-21T00:00:00",
                            "EndDate": "2025-08-21T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [
                            {
                                "Object": "Person",
                                "State": "Normal",
                                "FullName": null,
                                "FirstName": "Therae",
                                "LastName": "Washington",
                                "Type": "PhysicalPerson",
                                "Id": 72343395
                            }
                        ],
                        "Locations": []
                    }
                ],
                "Id": 5883563,
                "Name": "Mommy Daddy and Me Walk",
                "ProgramId": 114039,
                "ProgramName": "Events 2025",
                "CategoryId": 5883564,
                "CategoryName": "Family Programming",
                "SubCategoryId": 5883565,
                "SubCategoryName": "Walks",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5883563",
                "Status": "Hidden"
            },
            {
                "Tags": [],
                "Description": "<p>Spreading Joy With Carlitos! is high-energy, upbeat, a great way to burn calories, improve cardiovascular health, and have a great time that will leave you feeling energized.</p>\n\n<p>&nbsp;</p>\n",
                "Prerequisite": "Make sure to bring a towel and a full water bottle. You'll sweat a lot, so re-hydrating throughout the class is very important. Wear something that is breathable and moveable. Classes are indoors. ",
                "Note": "Drop in fee of $5.00 or buy a package for 12 classes of Zumba for $30.00 to get more bang for your buck.  ",
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "Theodora Philippou",
                "Price": 30,
                "DropInPrice": 5,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 99,
                    "Min": 16,
                    "Months": false
                },
                "MaxAttendance": 20,
                "SpotsRemaining": 4,
                "SpotsReserved": 16,
                "NumberOfOccurrences": 12,
                "StartDate": "2025-04-03T18:30:00-04:00",
                "EndDate": "2025-06-26T19:30:00-04:00",
                "ScheduleSummary": "Thursdays, 6:30 PM - 7:30 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": true,
                "AgeSummary": "16-99",
                "Keywords": [
                    {
                        "Id": 122,
                        "Name": "Zumba"
                    }
                ],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 55340,
                        "Type": "Adult",
                        "Name": "REC - Howard Park Classes 2025"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=x9wBeda",
                "PictureUrl": "https://7627d5c6aa27de5f9777-0279088784bed33f99cc5b40819dd1b0.ssl.cf2.rackcdn.com//dbfef4ce-d3ca-4321-b8d0-d736db575595_Carlitos.jpeg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "18:30:00",
                            "EndTime": "19:30:00",
                            "StartDate": "2025-04-03T00:00:00",
                            "EndDate": "2025-06-26T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-26T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [
                            {
                                "Object": "Person",
                                "State": "Normal",
                                "FullName": null,
                                "FirstName": "Carlitos",
                                "LastName": "Centellas",
                                "Type": "PhysicalPerson",
                                "Id": 73494482
                            }
                        ],
                        "Locations": [
                            {
                                "Id": 2159683,
                                "Name": "Howard Park Event Center"
                            }
                        ]
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "18:30:00",
                            "EndTime": "19:30:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [
                            {
                                "Object": "Person",
                                "State": "Normal",
                                "FullName": null,
                                "FirstName": "Carlitos",
                                "LastName": "Centellas",
                                "Type": "PhysicalPerson",
                                "Id": 73494482
                            }
                        ],
                        "Locations": [
                            {
                                "Id": 2159683,
                                "Name": "Howard Park Event Center"
                            }
                        ]
                    }
                ],
                "Id": 5908825,
                "Name": "Zumba with Carlitos",
                "ProgramId": 114092,
                "ProgramName": "Health and Wellness 2025",
                "CategoryId": 5882009,
                "CategoryName": "Howard Park Fitness",
                "SubCategoryId": 5908824,
                "SubCategoryName": "Zumba",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5908825",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Moms with little one&#39;s ages Newborn to 3 years old. Bring your little ones out to our new and exciting Mommy and Me Healthy Movement Class for you here in the Michiana area! During this stage of Motherhood, it is important to keep your little one mobile and active. Incorporating movement for newborns to toddlers alike! In this 30-minute fitness and movement class, you will experience a strengthening bond through shared activities with your little one, while making meaningful connections in your community. Raising little ones takes a village, help your little one learn new skills while maintaining overall physical wellness for Mommy and Little Ones. Together we can find joy in movement, in a fun-loving and nurturing environment.&nbsp;</p>\n",
                "Prerequisite": "Only one registration for the parent is necessary, not for the child. ",
                "Note": "No equipment or experience needed.",
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "Theodora Philippou",
                "Price": 30,
                "DropInPrice": 5,
                "DisplayOrder": 2,
                "Age": null,
                "MaxAttendance": 15,
                "SpotsRemaining": 14,
                "SpotsReserved": 1,
                "NumberOfOccurrences": 13,
                "StartDate": "2025-04-01T10:00:00-04:00",
                "EndDate": "2025-06-24T10:30:00-04:00",
                "ScheduleSummary": "Tuesdays, 10:00 AM - 10:30 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": true,
                "AgeSummary": "",
                "Keywords": [
                    {
                        "Id": 177,
                        "Name": "Fitness"
                    }
                ],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 55340,
                        "Type": "Adult",
                        "Name": "REC - Howard Park Classes 2025"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yKE65Xr",
                "PictureUrl": "https://25f8ba09feac1913a2ab-a4c0b90546840284720676a0925b9e72.ssl.cf2.rackcdn.com//b7d009f6-727e-4c46-a644-7e161e13fe1a_iStock_1397879227.webp",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:30:00",
                            "StartDate": "2025-04-01T00:00:00",
                            "EndDate": "2025-06-24T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-24T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Tuesday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [
                            {
                                "Object": "Person",
                                "State": "Normal",
                                "FullName": null,
                                "FirstName": "LeAyre",
                                "LastName": "Moore",
                                "Type": "PhysicalPerson",
                                "Id": 73934872
                            }
                        ],
                        "Locations": [
                            {
                                "Id": 2151199,
                                "Name": "Howard Park"
                            }
                        ]
                    }
                ],
                "Id": 5908834,
                "Name": "Mommy & Me Movements",
                "ProgramId": 114092,
                "ProgramName": "Health and Wellness 2025",
                "CategoryId": 5882009,
                "CategoryName": "Howard Park Fitness",
                "SubCategoryId": 5882010,
                "SubCategoryName": "Yoga",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5908834",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Cardio Drumming is a high-energy, full-body workout that combines rhythm, movement, and fun! Using drumsticks, an exercise ball, and an upbeat playlist, you&#39;ll drum to the beat while engaging your core, improving coordination, and boosting your heart rate. This class is perfect for all fitness levels and offers an exciting way to burn calories, relieve stress, and unleash your inner drummer. Get ready to sweat, smile, and feel the beat!&ensp;&ensp;&ensp;</p>\n",
                "Prerequisite": null,
                "Note": "   *Equipment provided\n\n      Ages 15-99+",
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "Theodora Philippou",
                "Price": 0,
                "DropInPrice": 5,
                "DisplayOrder": 1,
                "Age": null,
                "MaxAttendance": 2147483647,
                "SpotsRemaining": null,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 3,
                "StartDate": "2025-05-23T12:00:00-04:00",
                "EndDate": "2025-07-25T13:00:00-04:00",
                "ScheduleSummary": "Friday, May 23, 2025, 12:00 PM - 1:00 PM, Friday, June 27, 2025, 12:00 PM - 1:00 PM, Friday, July 25, 2025, 12:00 PM - 1:00 PM",
                "HasSessionEnabled": false,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": true,
                "AgeSummary": "",
                "Keywords": [
                    {
                        "Id": 172,
                        "Name": "Cardio"
                    }
                ],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 55340,
                        "Type": "Adult",
                        "Name": "REC - Howard Park Classes 2025"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xAomE61",
                "PictureUrl": "https://6d12b7f75e6bf4abd0d4-71999d0ae3d86ae19a2f586df262d816.ssl.cf2.rackcdn.com//cbc56dc6-c35e-4b42-95e7-913af3a9f18e_DSC_5699_1.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "13:00:00",
                            "StartDate": "2025-05-23T00:00:00",
                            "EndDate": "2025-05-23T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2151205,
                                "Name": "Tire Rack Pond "
                            }
                        ]
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "13:00:00",
                            "StartDate": "2025-06-27T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2151205,
                                "Name": "Tire Rack Pond "
                            }
                        ]
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "13:00:00",
                            "StartDate": "2025-07-25T00:00:00",
                            "EndDate": "2025-07-25T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2151205,
                                "Name": "Tire Rack Pond "
                            }
                        ]
                    }
                ],
                "Id": 5908901,
                "Name": "Cardio Drumming- Outdoors",
                "ProgramId": 114092,
                "ProgramName": "Health and Wellness 2025",
                "CategoryId": 5882009,
                "CategoryName": "Howard Park Fitness",
                "SubCategoryId": 5908900,
                "SubCategoryName": "Cardio Drumming",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5908901",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Instructor is passionate about watercolor paintings.&nbsp; We all have to start with the basics, she will teach you about paint, brush control, paper,&nbsp;techniques,and so much more. We will be painting projects similar to American Folk Art.</p>\n",
                "Prerequisite": "For beginners or those looking to sharpen their basic painting skills. ",
                "Note": "Students required to purchase their own painting supplies after first class.  Lists will be provided. ",
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 30,
                "DropInPrice": 5,
                "DisplayOrder": 1,
                "Age": {
                    "Max": null,
                    "Min": 18,
                    "Months": false
                },
                "MaxAttendance": 15,
                "SpotsRemaining": 13,
                "SpotsReserved": 2,
                "NumberOfOccurrences": 9,
                "StartDate": "2025-06-04T10:00:00-04:00",
                "EndDate": "2025-08-20T12:00:00-04:00",
                "ScheduleSummary": "Wednesdays, 10:00 AM - 12:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": true,
                "AgeSummary": "18+",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 55340,
                        "Type": "Adult",
                        "Name": "REC - Howard Park Classes 2025"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xB1qEoO",
                "PictureUrl": "https://140367a3eb0b12ab4bb1-49dd41eba307c79e4de729c4cf9efd79.ssl.cf2.rackcdn.com//4ae31b12-cef8-474c-9d4a-ce38ed49be6a_IMG_4067.jpeg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "12:00:00",
                            "StartDate": "2025-06-25T00:00:00",
                            "EndDate": "2025-06-25T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2159685,
                                "Name": "Farmer Room"
                            }
                        ]
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "12:00:00",
                            "StartDate": "2025-06-04T00:00:00",
                            "EndDate": "2025-08-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-08-20T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Wednesday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [
                            {
                                "Object": "Person",
                                "State": "Normal",
                                "FullName": null,
                                "FirstName": "Cheryl",
                                "LastName": "Brezinski",
                                "Type": "PhysicalPerson",
                                "Id": 73755689
                            }
                        ],
                        "Locations": [
                            {
                                "Id": 2159685,
                                "Name": "Farmer Room"
                            }
                        ]
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "12:00:00",
                            "StartDate": "2025-07-30T00:00:00",
                            "EndDate": "2025-07-30T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2159685,
                                "Name": "Farmer Room"
                            }
                        ]
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "12:00:00",
                            "StartDate": "2025-07-02T00:00:00",
                            "EndDate": "2025-07-02T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2159685,
                                "Name": "Farmer Room"
                            }
                        ]
                    }
                ],
                "Id": 5909088,
                "Name": "Watercolor for Beginners",
                "ProgramId": 114011,
                "ProgramName": "Arts, Culture, and Education 2025",
                "CategoryId": 5909086,
                "CategoryName": "Howard Park Classes",
                "SubCategoryId": 5909087,
                "SubCategoryName": "Art Class",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5909088",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Your questions about horticulture answered!</p>\n\n<p>Every 4th Tuesday this spring and summer, join horticulturist, Mary Wojcik, and other VPA Facility &amp; Grounds staff to jump head first into all things plants. Explore plant care, South Bend&#39;s parks and green spaces, and learn together in this unique series.</p>\n\n<p>Discussion topics<br />\nNative vs. invasive plants<br />\nWater gardens<br />\nSeasonal maintenance.</p>\n\n<p>FREE and open to the public to attend!</p>\n\n<p>Schedule:<br />\nApril 22- Howard Park- Spring Ephemerals, Bulbs, Early Planting<br />\nMay 27- Howard Park- Weeding and Watering, Establish Ornamentals and Natives<br />\nJune 24- Pinhook Park - Aquatic Plants: How to manage water gardens<br />\nJuly 22- Howard Park- Water Management: Xeriscaping and Erosion Control<br />\nAugust 26- Charles Black Center - Fall Planting</p>\n",
                "Prerequisite": "No pre-existing gardening experience needed, this series is free and open to the public to attend.",
                "Note": "Wear comfortable shoes as we will be walking outdoors for a portion of the session. ",
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 0,
                "DropInPrice": 0,
                "DisplayOrder": 3,
                "Age": {
                    "Max": null,
                    "Min": 18,
                    "Months": false
                },
                "MaxAttendance": 2147483647,
                "SpotsRemaining": null,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-04-22T17:00:00-04:00",
                "EndDate": "2025-08-26T18:30:00-04:00",
                "ScheduleSummary": "Tuesday, April 22, 2025, 5:00 PM - 6:30 PM, Tuesday, May 27, 2025, 5:00 PM - 6:30 PM, Tuesday, June 24, 2025, 5:00 PM - 6:30 PM, Tuesday, July 22, 2025, 5:00 PM - 6:30 PM, Tuesday, August 26, 2025, 5:00 PM - 6:30 PM",
                "HasSessionEnabled": false,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": false,
                "AgeSummary": "18+",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 8982236,
                        "StartTime": "2025-03-20T13:38:06-04:00",
                        "EndTime": "2025-12-31T13:38:14-05:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 55340,
                        "Type": "Adult",
                        "Name": "REC - Howard Park Classes 2025"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xELR3lj",
                "PictureUrl": "https://a92bd64b432322668738-e1527ea98c9f46e16fdebe44d24c7cc2.ssl.cf2.rackcdn.com//6d9f31fb-1212-48ac-9e01-5df90d6d7a6a_Leeper_Park.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "17:00:00",
                            "EndTime": "18:30:00",
                            "StartDate": "2025-04-22T00:00:00",
                            "EndDate": "2025-04-22T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2159683,
                                "Name": "Howard Park Event Center"
                            }
                        ]
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "17:00:00",
                            "EndTime": "18:30:00",
                            "StartDate": "2025-05-27T00:00:00",
                            "EndDate": "2025-05-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2159683,
                                "Name": "Howard Park Event Center"
                            }
                        ]
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "17:00:00",
                            "EndTime": "18:30:00",
                            "StartDate": "2025-06-24T00:00:00",
                            "EndDate": "2025-06-24T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2159683,
                                "Name": "Howard Park Event Center"
                            }
                        ]
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "17:00:00",
                            "EndTime": "18:30:00",
                            "StartDate": "2025-07-22T00:00:00",
                            "EndDate": "2025-07-22T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2159683,
                                "Name": "Howard Park Event Center"
                            }
                        ]
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "17:00:00",
                            "EndTime": "18:30:00",
                            "StartDate": "2025-08-26T00:00:00",
                            "EndDate": "2025-08-26T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5911629,
                "Name": "VPA Garden Club- Spring and Summer",
                "ProgramId": 114011,
                "ProgramName": "Arts, Culture, and Education 2025",
                "CategoryId": 5909086,
                "CategoryName": "Howard Park Classes",
                "SubCategoryId": 5909117,
                "SubCategoryName": "Educational Class",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5911629",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Join us the last Tuesday of each month at the location listed at 5-6:30pm as we discuss gardening, native and invasive plants, and walk the gardens throughout the city.</p>\n",
                "Prerequisite": null,
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 0,
                "DropInPrice": 0,
                "DisplayOrder": 4,
                "Age": {
                    "Max": null,
                    "Min": 18,
                    "Months": false
                },
                "MaxAttendance": 2147483647,
                "SpotsRemaining": null,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 1,
                "StartDate": "2025-09-23T17:00:00-04:00",
                "EndDate": "2025-09-23T18:30:00-04:00",
                "ScheduleSummary": "Tuesday, September 23, 2025, 5:00 PM - 6:30 PM",
                "HasSessionEnabled": false,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": false,
                "AgeSummary": "18+",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 55340,
                        "Type": "Adult",
                        "Name": "REC - Howard Park Classes 2025"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xAomgGm",
                "PictureUrl": "https://a92bd64b432322668738-e1527ea98c9f46e16fdebe44d24c7cc2.ssl.cf2.rackcdn.com//6d9f31fb-1212-48ac-9e01-5df90d6d7a6a_Leeper_Park.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "17:00:00",
                            "EndTime": "18:30:00",
                            "StartDate": "2025-09-23T00:00:00",
                            "EndDate": "2025-09-23T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2159683,
                                "Name": "Howard Park Event Center"
                            }
                        ]
                    }
                ],
                "Id": 5911645,
                "Name": "VPA Garden Club- Fall and Winter",
                "ProgramId": 114011,
                "ProgramName": "Arts, Culture, and Education 2025",
                "CategoryId": 5909086,
                "CategoryName": "Howard Park Classes",
                "SubCategoryId": 5909117,
                "SubCategoryName": "Educational Class",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5911645",
                "Status": "Hidden"
            },
            {
                "Tags": [],
                "Description": "<p>This 7 week core class called &quot;How to Juggle&quot; is taught by William Hooper and ex-pro juggler Al Eisenhour. We are also bringing in students that we taught in prior&nbsp;years to assist with teaching this course. This is our core course involving a very unique teaching method utilizing juggling equipment and techniques developed by the Michiana Jugglers Association.&nbsp;</p>\n",
                "Prerequisite": "Must be 15 years of age and over and sign the waiver attached. Beginner course has no-prerequisites. ",
                "Note": "All students will be required to purchase a $25 equipment fee for their starter juggling set consisting of juggling scarves and custom made by the club juggling balls. ",
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 0,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 99,
                    "Min": 15,
                    "Months": false
                },
                "MaxAttendance": 10,
                "SpotsRemaining": 10,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-04-15T18:30:00-04:00",
                "EndDate": "2025-06-03T19:30:00-04:00",
                "ScheduleSummary": "Tuesdays, 6:30 PM - 7:30 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": true,
                "AgeSummary": "15-99",
                "Keywords": [
                    {
                        "Id": 179,
                        "Name": "Running"
                    }
                ],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 55340,
                        "Type": "Adult",
                        "Name": "REC - Howard Park Classes 2025"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xO97wvQ",
                "PictureUrl": "https://9945e36d4322d1e59201-48722ae5fd46acecd835ddac5dd40ca9.ssl.cf2.rackcdn.com//c3a33553-9680-4921-92b8-4e7441bd91a9_Luke_and_Jake_H.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "18:30:00",
                            "EndTime": "19:30:00",
                            "StartDate": "2025-04-15T00:00:00",
                            "EndDate": "2025-06-03T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-03T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Tuesday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2159683,
                                "Name": "Howard Park Event Center"
                            }
                        ]
                    }
                ],
                "Id": 5912035,
                "Name": "Learn to Juggle",
                "ProgramId": 114092,
                "ProgramName": "Health and Wellness 2025",
                "CategoryId": 5882009,
                "CategoryName": "Howard Park Fitness",
                "SubCategoryId": 5912034,
                "SubCategoryName": "Juggling",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5912035",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Discover the art of watercolor painting at Rum Village Nature Center! All materials will be supplied for you. The class fee is $20 per person, which should be paid directly to the instructor at the beginning of the class. Join Roy and Peggy Hruska as they guide you through this creative experience.</p>\n",
                "Prerequisite": null,
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 0,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": null,
                "MaxAttendance": 30,
                "SpotsRemaining": 29,
                "SpotsReserved": 1,
                "NumberOfOccurrences": 9,
                "StartDate": "2025-04-10T12:00:00-04:00",
                "EndDate": "2025-12-11T15:00:00-05:00",
                "ScheduleSummary": "Thursday, April 10, 2025, 12:00 PM - 3:00 PM, Thursday, May 22, 2025, 12:00 PM - 3:35 PM, Thursday, June 12, 2025, 12:00 PM - 3:00 PM, Thursday, July 10, 2025, 12:00 PM - 3:00 PM, Thursday, August 14, 2025, 12:00 PM - 3:00 PM, Thursday, September 11, 2025, 12:00 PM - 3:00 PM, Thursday, October 9, 2025, 12:00 PM - 3:00 PM, Thursday, November 13, 2025, 12:00 PM - 3:00 PM, Thursday, December 11, 2025, 12:00 PM - 3:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": false,
                "AgeSummary": "",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9002130,
                        "StartTime": "2025-03-24T16:20:52-04:00",
                        "EndTime": "2025-12-11T12:15:00-05:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 55439,
                        "Type": "Adult",
                        "Name": "REC - Rum Village Watercolor Program Form"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xW5jQ2Z",
                "PictureUrl": "https://79bba95e2e0397a013fc-47ba22f1807a7c9dbc3bf4cbf2182715.ssl.cf2.rackcdn.com//931b52b8-fd46-497d-a546-2c8731c62eee_Hruska_May.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "15:00:00",
                            "StartDate": "2025-04-10T00:00:00",
                            "EndDate": "2025-04-10T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2178873,
                                "Name": "Rum Village Nature Center"
                            }
                        ]
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "15:35:00",
                            "StartDate": "2025-05-22T00:00:00",
                            "EndDate": "2025-05-22T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2178873,
                                "Name": "Rum Village Nature Center"
                            }
                        ]
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "15:00:00",
                            "StartDate": "2025-06-12T00:00:00",
                            "EndDate": "2025-06-12T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2178873,
                                "Name": "Rum Village Nature Center"
                            }
                        ]
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "15:00:00",
                            "StartDate": "2025-07-10T00:00:00",
                            "EndDate": "2025-07-10T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2178873,
                                "Name": "Rum Village Nature Center"
                            }
                        ]
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "15:00:00",
                            "StartDate": "2025-08-14T00:00:00",
                            "EndDate": "2025-08-14T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2178873,
                                "Name": "Rum Village Nature Center"
                            }
                        ]
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "15:00:00",
                            "StartDate": "2025-09-11T00:00:00",
                            "EndDate": "2025-09-11T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2178873,
                                "Name": "Rum Village Nature Center"
                            }
                        ]
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "15:00:00",
                            "StartDate": "2025-10-09T00:00:00",
                            "EndDate": "2025-10-09T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2178873,
                                "Name": "Rum Village Nature Center"
                            }
                        ]
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "15:00:00",
                            "StartDate": "2025-11-13T00:00:00",
                            "EndDate": "2025-11-13T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2178873,
                                "Name": "Rum Village Nature Center"
                            }
                        ]
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "15:00:00",
                            "StartDate": "2025-12-11T00:00:00",
                            "EndDate": "2025-12-11T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2178873,
                                "Name": "Rum Village Nature Center"
                            }
                        ]
                    }
                ],
                "Id": 5920599,
                "Name": "Watercolor Class",
                "ProgramId": 114011,
                "ProgramName": "Arts, Culture, and Education 2025",
                "CategoryId": 5920597,
                "CategoryName": "Rum Village Classes",
                "SubCategoryId": 5920598,
                "SubCategoryName": "Art Class",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5920599",
                "Status": "Normal"
            },
            {
                "Tags": [
                    {
                        "Id": 8054049,
                        "Name": "kids"
                    }
                ],
                "Description": "<p>Summer camp at the Dream Center locted at 1522 Linden Ave is a full day of fun open to students from ages 5-12! Between the hours of 7am and 6pm our campers will have opportunties to indulge sports, wellness, arts, and enrichment opportunities. There will also be fun field trip days were we will boraden our campers horzions by teching them through real life experiences! Lunch and dinner will be provided, we hope to see you there!</p>\n",
                "Prerequisite": null,
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "scoleman@southbendin.gov",
                "Price": 60,
                "DropInPrice": 0,
                "DisplayOrder": 2,
                "Age": {
                    "Max": 12,
                    "Min": 5,
                    "Months": false
                },
                "MaxAttendance": 150,
                "SpotsRemaining": 148,
                "SpotsReserved": 2,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-06-16T07:00:00-04:00",
                "EndDate": "2025-06-20T18:00:00-04:00",
                "ScheduleSummary": "Weekdays, 7:00 AM - 6:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "5-12",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9009015,
                        "StartTime": "2025-05-05T00:00:00-04:00",
                        "EndTime": "2025-08-04T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 54825,
                        "Type": "Children",
                        "Name": "MLK_Dream Academy Summer Camp Form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xW5j4J2",
                "PictureUrl": "https://1558f8bef0a08076de14-0d4b14d652b580ca0ab892ee04f4af1c.ssl.cf2.rackcdn.com//43efab0d-5cec-442f-bd64-3ae36817954f_313868655_490036636482669_3071123672927260803_n.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "07:00:00",
                            "EndTime": "18:00:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-20T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5925355,
                "Name": "MLK Dream Academy Summer Camp - Week 2",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5843999,
                "CategoryName": "Dream Academy",
                "SubCategoryId": 5844000,
                "SubCategoryName": "MLK Dream Academy Summer Camp",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5925355",
                "Status": "Normal"
            },
            {
                "Tags": [
                    {
                        "Id": 8054049,
                        "Name": "kids"
                    }
                ],
                "Description": "<p>Summer camp at the Dream Center locted at 1522 Linden Ave is a full day of fun open to students from ages 5-12! Between the hours of 7am and 6pm our campers will have opportunties to indulge sports, wellness, arts, and enrichment opportunities. There will also be fun field trip days were we will boraden our campers horzions by teching them through real life experiences! Lunch and dinner will be provided, we hope to see you there!</p>\n",
                "Prerequisite": null,
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "scoleman@southbendin.gov",
                "Price": 60,
                "DropInPrice": 0,
                "DisplayOrder": 3,
                "Age": {
                    "Max": 12,
                    "Min": 5,
                    "Months": false
                },
                "MaxAttendance": 150,
                "SpotsRemaining": 148,
                "SpotsReserved": 2,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-06-23T07:00:00-04:00",
                "EndDate": "2025-06-27T18:00:00-04:00",
                "ScheduleSummary": "Weekdays, 7:00 AM - 6:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "5-12",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9009211,
                        "StartTime": "2025-05-05T00:00:00-04:00",
                        "EndTime": "2025-08-11T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 54825,
                        "Type": "Children",
                        "Name": "MLK_Dream Academy Summer Camp Form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=b8wZmLG",
                "PictureUrl": "https://33432dd5a743adb6a46d-3f2e74303a1f391aba965245c7568029.ssl.cf2.rackcdn.com//89221a19-a0cb-4125-ab76-a4a001f86f49_313868655_490036636482669_3071123672927260803_n.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "07:00:00",
                            "EndTime": "18:00:00",
                            "StartDate": "2025-06-23T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5925360,
                "Name": "MLK Dream Academy Summer Camp - Week 3",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5843999,
                "CategoryName": "Dream Academy",
                "SubCategoryId": 5844000,
                "SubCategoryName": "MLK Dream Academy Summer Camp",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5925360",
                "Status": "Normal"
            },
            {
                "Tags": [
                    {
                        "Id": 8054049,
                        "Name": "kids"
                    }
                ],
                "Description": "<p>Summer camp at the Dream Center locted at 1522 Linden Ave is a full day of fun open to students from ages 5-12! Between the hours of 7am and 6pm our campers will have opportunties to indulge sports, wellness, arts, and enrichment opportunities. There will also be fun field trip days were we will boraden our campers horzions by teching them through real life experiences! Lunch and dinner will be provided, we hope to see you there!</p>\n",
                "Prerequisite": null,
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "scoleman@southbendin.gov",
                "Price": 60,
                "DropInPrice": 0,
                "DisplayOrder": 4,
                "Age": {
                    "Max": 12,
                    "Min": 5,
                    "Months": false
                },
                "MaxAttendance": 150,
                "SpotsRemaining": 148,
                "SpotsReserved": 2,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-06-30T07:00:00-04:00",
                "EndDate": "2025-07-04T18:00:00-04:00",
                "ScheduleSummary": "Weekdays, 7:00 AM - 6:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "5-12",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9009212,
                        "StartTime": "2025-05-05T00:00:00-04:00",
                        "EndTime": "2025-08-11T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 54825,
                        "Type": "Children",
                        "Name": "MLK_Dream Academy Summer Camp Form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=bDEWD45",
                "PictureUrl": "https://f8b62b5ae94e32c7087c-afbb37a45d5a1e6acf656fcdccd42b89.ssl.cf2.rackcdn.com//19b3998d-6b3a-40e3-912e-cb33a700348d_313868655_490036636482669_3071123672927260803_n.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "07:00:00",
                            "EndTime": "18:00:00",
                            "StartDate": "2025-06-30T00:00:00",
                            "EndDate": "2025-07-04T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-04T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5925364,
                "Name": "MLK Dream Academy Summer Camp - Week 4",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5843999,
                "CategoryName": "Dream Academy",
                "SubCategoryId": 5844000,
                "SubCategoryName": "MLK Dream Academy Summer Camp",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5925364",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Summer camp at the Dream Center locted at 1522 Linden Ave is a full day of fun open to students from ages 5-12! Between the hours of 7am and 6pm our campers will have opportunties to indulge sports, wellness, arts, and enrichment opportunities. There will also be fun field trip days were we will boraden our campers horzions by teching them through real life experiences! Lunch and dinner will be provided, we hope to see you there!</p>\n",
                "Prerequisite": null,
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "scoleman@southbendin.gov",
                "Price": 60,
                "DropInPrice": 0,
                "DisplayOrder": 5,
                "Age": {
                    "Max": 12,
                    "Min": 5,
                    "Months": false
                },
                "MaxAttendance": 150,
                "SpotsRemaining": 150,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-07-07T07:00:00-04:00",
                "EndDate": "2025-07-11T18:00:00-04:00",
                "ScheduleSummary": "Weekdays, 7:00 AM - 6:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "5-12",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9009214,
                        "StartTime": "2025-04-14T09:00:00-04:00",
                        "EndTime": "2025-07-07T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 54825,
                        "Type": "Children",
                        "Name": "MLK_Dream Academy Summer Camp Form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xO97nVp",
                "PictureUrl": null,
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "07:00:00",
                            "EndTime": "18:00:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-11T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-11T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5925379,
                "Name": "MLK Dream Academy Summer Camp - Week 5",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5843999,
                "CategoryName": "Dream Academy",
                "SubCategoryId": 5844000,
                "SubCategoryName": "MLK Dream Academy Summer Camp",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5925379",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Summer camp at the Dream Center locted at 1522 Linden Ave is a full day of fun open to students from ages 5-12! Between the hours of 7am and 6pm our campers will have opportunties to indulge sports, wellness, arts, and enrichment opportunities. There will also be fun field trip days were we will boraden our campers horzions by teching them through real life experiences! Lunch and dinner will be provided, we hope to see you there!</p>\n",
                "Prerequisite": null,
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "scoleman@southbendin.gov",
                "Price": 60,
                "DropInPrice": 0,
                "DisplayOrder": 6,
                "Age": {
                    "Max": 12,
                    "Min": 5,
                    "Months": false
                },
                "MaxAttendance": 150,
                "SpotsRemaining": 148,
                "SpotsReserved": 2,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-07-14T07:00:00-04:00",
                "EndDate": "2025-07-18T18:00:00-04:00",
                "ScheduleSummary": "Weekdays, 7:00 AM - 6:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "5-12",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9009216,
                        "StartTime": "2025-04-14T09:00:00-04:00",
                        "EndTime": "2025-07-14T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 54825,
                        "Type": "Children",
                        "Name": "MLK_Dream Academy Summer Camp Form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xrVg6wl",
                "PictureUrl": null,
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "07:00:00",
                            "EndTime": "18:00:00",
                            "StartDate": "2025-07-14T00:00:00",
                            "EndDate": "2025-07-18T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-18T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5925384,
                "Name": "MLK Dream Academy Summer Camp - Week 6",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5843999,
                "CategoryName": "Dream Academy",
                "SubCategoryId": 5844000,
                "SubCategoryName": "MLK Dream Academy Summer Camp",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5925384",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Summer camp at the Dream Center locted at 1522 Linden Ave is a full day of fun open to students from ages 5-12! Between the hours of 7am and 6pm our campers will have opportunties to indulge sports, wellness, arts, and enrichment opportunities. There will also be fun field trip days were we will boraden our campers horzions by teching them through real life experiences! Lunch and dinner will be provided, we hope to see you there!</p>\n",
                "Prerequisite": null,
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 60,
                "DropInPrice": 0,
                "DisplayOrder": 7,
                "Age": {
                    "Max": 12,
                    "Min": 5,
                    "Months": false
                },
                "MaxAttendance": 150,
                "SpotsRemaining": 148,
                "SpotsReserved": 2,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-07-21T07:00:00-04:00",
                "EndDate": "2025-07-25T18:00:00-04:00",
                "ScheduleSummary": "Weekdays, 7:00 AM - 6:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "5-12",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9009217,
                        "StartTime": "2025-04-14T09:00:00-04:00",
                        "EndTime": "2025-07-21T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 54825,
                        "Type": "Children",
                        "Name": "MLK_Dream Academy Summer Camp Form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xB1q6PN",
                "PictureUrl": null,
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "07:00:00",
                            "EndTime": "18:00:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-25T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-25T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5925388,
                "Name": "MLK Dream Academy Summer Camp - Week 7",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5843999,
                "CategoryName": "Dream Academy",
                "SubCategoryId": 5844000,
                "SubCategoryName": "MLK Dream Academy Summer Camp",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5925388",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Summer camp at the Dream Center locted at 1522 Linden Ave is a full day of fun open to students from ages 5-12! Between the hours of 7am and 6pm our campers will have opportunties to indulge sports, wellness, arts, and enrichment opportunities. There will also be fun field trip days were we will boraden our campers horzions by teching them through real life experiences! Lunch and dinner will be provided, we hope to see you there!</p>\n",
                "Prerequisite": null,
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 60,
                "DropInPrice": 0,
                "DisplayOrder": 8,
                "Age": {
                    "Max": 12,
                    "Min": 5,
                    "Months": false
                },
                "MaxAttendance": 150,
                "SpotsRemaining": 148,
                "SpotsReserved": 2,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-07-28T07:00:00-04:00",
                "EndDate": "2025-08-01T18:00:00-04:00",
                "ScheduleSummary": "Weekdays, 7:00 AM - 6:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "5-12",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9009218,
                        "StartTime": "2025-04-14T08:00:00-04:00",
                        "EndTime": "2025-07-28T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 54825,
                        "Type": "Children",
                        "Name": "MLK_Dream Academy Summer Camp Form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yQ9Zq7e",
                "PictureUrl": null,
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "07:00:00",
                            "EndTime": "18:00:00",
                            "StartDate": "2025-07-28T00:00:00",
                            "EndDate": "2025-08-01T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-08-01T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5925392,
                "Name": "MLK Dream Academy Summer Camp - Week 8",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5843999,
                "CategoryName": "Dream Academy",
                "SubCategoryId": 5844000,
                "SubCategoryName": "MLK Dream Academy Summer Camp",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5925392",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Summer camp at the Dream Center locted at 1522 Linden Ave is a full day of fun open to students from ages 5-12! Between the hours of 7am and 6pm our campers will have opportunties to indulge sports, wellness, arts, and enrichment opportunities. There will also be fun field trip days were we will boraden our campers horzions by teching them through real life experiences! Lunch and dinner will be provided, we hope to see you there!</p>\n",
                "Prerequisite": null,
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 60,
                "DropInPrice": 0,
                "DisplayOrder": 9,
                "Age": {
                    "Max": 12,
                    "Min": 5,
                    "Months": false
                },
                "MaxAttendance": 150,
                "SpotsRemaining": 148,
                "SpotsReserved": 2,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-08-04T07:00:00-04:00",
                "EndDate": "2025-08-08T18:00:00-04:00",
                "ScheduleSummary": "Weekdays, 7:00 AM - 6:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "5-12",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9009219,
                        "StartTime": "2025-04-14T09:00:00-04:00",
                        "EndTime": "2025-08-04T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 54825,
                        "Type": "Children",
                        "Name": "MLK_Dream Academy Summer Camp Form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xW5j4B2",
                "PictureUrl": null,
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "07:00:00",
                            "EndTime": "18:00:00",
                            "StartDate": "2025-08-04T00:00:00",
                            "EndDate": "2025-08-08T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-08-08T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5925399,
                "Name": "MLK Dream Academy Summer Camp - Week 9",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5843999,
                "CategoryName": "Dream Academy",
                "SubCategoryId": 5844000,
                "SubCategoryName": "MLK Dream Academy Summer Camp",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5925399",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Youth Dreamers ages 15-17 are invited to learn and induldge in fitness through our state of the art fitness equipment upstairs in the fitness studio and on the track. This activity is available Tuesdays and Thursdays from 6:00pm-7:30pm.</p>\n",
                "Prerequisite": null,
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "ajohnson@southbendin.gov",
                "Price": 0,
                "DropInPrice": 0,
                "DisplayOrder": 2,
                "Age": {
                    "Max": 17,
                    "Min": 15,
                    "Months": false
                },
                "MaxAttendance": 2147483647,
                "SpotsRemaining": null,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 18,
                "StartDate": "2025-06-10T18:00:00-04:00",
                "EndDate": "2025-08-07T19:30:00-04:00",
                "ScheduleSummary": "Tuesdays, Thursdays, 6:00 PM - 7:30 PM",
                "HasSessionEnabled": false,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": true,
                "AgeSummary": "15-17",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9009810,
                        "StartTime": "2025-05-05T09:00:00-04:00",
                        "EndTime": null,
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 54028,
                        "Type": "Children",
                        "Name": "MLK_Youth Dreamers Membership Form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=y0R8B3p",
                "PictureUrl": null,
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "18:00:00",
                            "EndTime": "19:30:00",
                            "StartDate": "2025-06-10T00:00:00",
                            "EndDate": "2025-08-07T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-08-07T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Tuesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5925617,
                "Name": "Youth Fit Fun Time",
                "ProgramId": 114092,
                "ProgramName": "Health and Wellness 2025",
                "CategoryId": 5871371,
                "CategoryName": "Dream Center Fitness ",
                "SubCategoryId": 5871372,
                "SubCategoryName": "Fitness Studio and Track",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5925617",
                "Status": "Hidden"
            },
            {
                "Tags": [],
                "Description": "<p>A gathering place at the Dream Center for artists to connect with their musical passions, while engaging with an audience. Evidence that there is a safe place in the community that nurtures the Mind, Body, and Soul.</p>\n",
                "Prerequisite": "Age 21 and older.",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "dmarshall@southbendin.gov",
                "Price": 0,
                "DropInPrice": 10,
                "DisplayOrder": 2,
                "Age": {
                    "Max": 100,
                    "Min": 21,
                    "Months": false
                },
                "MaxAttendance": 2147483647,
                "SpotsRemaining": null,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 6,
                "StartDate": "2025-05-02T19:00:00-04:00",
                "EndDate": "2025-06-06T20:30:00-04:00",
                "ScheduleSummary": "Fridays, 7:00 PM - 8:30 PM",
                "HasSessionEnabled": false,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": true,
                "AgeSummary": "21-100",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9012448,
                        "StartTime": "2025-04-11T19:00:00-04:00",
                        "EndTime": "2025-04-11T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012449,
                        "StartTime": "2025-04-18T19:00:00-04:00",
                        "EndTime": "2025-04-18T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012450,
                        "StartTime": "2025-04-25T19:00:00-04:00",
                        "EndTime": "2025-04-25T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012451,
                        "StartTime": "2025-05-02T19:00:00-04:00",
                        "EndTime": "2025-05-02T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012452,
                        "StartTime": "2025-05-09T19:00:00-04:00",
                        "EndTime": "2025-05-09T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012453,
                        "StartTime": "2025-05-16T19:00:00-04:00",
                        "EndTime": "2025-05-16T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012454,
                        "StartTime": "2025-05-23T19:00:00-04:00",
                        "EndTime": "2025-05-23T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012455,
                        "StartTime": "2025-05-30T19:00:00-04:00",
                        "EndTime": "2025-05-30T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=x9wBB73",
                "PictureUrl": "https://f81c387c46b1d14a2113-908e58bf536d2ae9ae6098521e84a5fe.ssl.cf2.rackcdn.com//4df10ecf-a7e1-4742-a2bc-2c150da0f869_fIRESIDE.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "19:00:00",
                            "EndTime": "20:30:00",
                            "StartDate": "2025-05-02T00:00:00",
                            "EndDate": "2025-06-06T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-06T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [
                            {
                                "Object": "Person",
                                "State": "Normal",
                                "FullName": null,
                                "FirstName": "Daniel",
                                "LastName": "Marshall",
                                "Type": "PhysicalPerson",
                                "Id": 71452425
                            }
                        ],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5926569,
                "Name": "Fireside Friday May 9th",
                "ProgramId": 114039,
                "ProgramName": "Events 2025",
                "CategoryId": 5842197,
                "CategoryName": "Adult Programming",
                "SubCategoryId": 5842198,
                "SubCategoryName": "Fireside Fridays",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5926569",
                "Status": "Hidden"
            },
            {
                "Tags": [],
                "Description": "<p>A gathering place at the Dream Center for artists to connect with their musical passions, while engaging with an audience. Evidence that there is a safe place in the community that nurtures the Mind, Body, and Soul.</p>\n",
                "Prerequisite": "Age 21 and older.",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "dmarshall@southbendin.gov",
                "Price": 0,
                "DropInPrice": 10,
                "DisplayOrder": 3,
                "Age": {
                    "Max": 100,
                    "Min": 21,
                    "Months": false
                },
                "MaxAttendance": 2147483647,
                "SpotsRemaining": null,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 6,
                "StartDate": "2025-05-02T19:00:00-04:00",
                "EndDate": "2025-06-06T20:30:00-04:00",
                "ScheduleSummary": "Fridays, 7:00 PM - 8:30 PM",
                "HasSessionEnabled": false,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": true,
                "AgeSummary": "21-100",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9012456,
                        "StartTime": "2025-04-11T19:00:00-04:00",
                        "EndTime": "2025-04-11T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012457,
                        "StartTime": "2025-04-18T19:00:00-04:00",
                        "EndTime": "2025-04-18T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012458,
                        "StartTime": "2025-04-25T19:00:00-04:00",
                        "EndTime": "2025-04-25T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012459,
                        "StartTime": "2025-05-02T19:00:00-04:00",
                        "EndTime": "2025-05-02T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012460,
                        "StartTime": "2025-05-09T19:00:00-04:00",
                        "EndTime": "2025-05-09T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012461,
                        "StartTime": "2025-05-16T19:00:00-04:00",
                        "EndTime": "2025-05-16T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012462,
                        "StartTime": "2025-05-23T19:00:00-04:00",
                        "EndTime": "2025-05-23T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012463,
                        "StartTime": "2025-05-30T19:00:00-04:00",
                        "EndTime": "2025-05-30T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xoPoo2B",
                "PictureUrl": "https://f81c387c46b1d14a2113-908e58bf536d2ae9ae6098521e84a5fe.ssl.cf2.rackcdn.com//4df10ecf-a7e1-4742-a2bc-2c150da0f869_fIRESIDE.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "19:00:00",
                            "EndTime": "20:30:00",
                            "StartDate": "2025-05-02T00:00:00",
                            "EndDate": "2025-06-06T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-06T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [
                            {
                                "Object": "Person",
                                "State": "Normal",
                                "FullName": null,
                                "FirstName": "Daniel",
                                "LastName": "Marshall",
                                "Type": "PhysicalPerson",
                                "Id": 71452425
                            }
                        ],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5926571,
                "Name": "Fireside Friday May 16th ",
                "ProgramId": 114039,
                "ProgramName": "Events 2025",
                "CategoryId": 5842197,
                "CategoryName": "Adult Programming",
                "SubCategoryId": 5842198,
                "SubCategoryName": "Fireside Fridays",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5926571",
                "Status": "Hidden"
            },
            {
                "Tags": [],
                "Description": "<p>A gathering place at the Dream Center for artists to connect with their musical passions, while engaging with an audience. Evidence that there is a safe place in the community that nurtures the Mind, Body, and Soul.</p>\n\n<p>Featuring: DREAM TEAM LIVE:&nbsp;Hailing from South Bend, Indiana, Dream Team Live has been electrifying audiences for over 15 years with a dynamic blend of R&amp;B, Soul, Funk, Hip-Hop, high-powered Blues, and Jazz, as well as their own original compositions.</p>\n",
                "Prerequisite": "Age 21 and older.",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "dmarshall@southbendin.gov",
                "Price": 0,
                "DropInPrice": 10,
                "DisplayOrder": 4,
                "Age": {
                    "Max": 100,
                    "Min": 21,
                    "Months": false
                },
                "MaxAttendance": 2147483647,
                "SpotsRemaining": null,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 6,
                "StartDate": "2025-05-02T19:00:00-04:00",
                "EndDate": "2025-06-06T20:30:00-04:00",
                "ScheduleSummary": "Fridays, 7:00 PM - 8:30 PM",
                "HasSessionEnabled": false,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": true,
                "AgeSummary": "21-100",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9012464,
                        "StartTime": "2025-04-11T19:00:00-04:00",
                        "EndTime": "2025-04-11T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012465,
                        "StartTime": "2025-04-18T19:00:00-04:00",
                        "EndTime": "2025-04-18T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012466,
                        "StartTime": "2025-04-25T19:00:00-04:00",
                        "EndTime": "2025-04-25T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012467,
                        "StartTime": "2025-05-02T19:00:00-04:00",
                        "EndTime": "2025-05-02T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012468,
                        "StartTime": "2025-05-09T19:00:00-04:00",
                        "EndTime": "2025-05-09T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012469,
                        "StartTime": "2025-05-16T19:00:00-04:00",
                        "EndTime": "2025-05-16T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012470,
                        "StartTime": "2025-05-23T19:00:00-04:00",
                        "EndTime": "2025-05-23T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012471,
                        "StartTime": "2025-05-30T19:00:00-04:00",
                        "EndTime": "2025-05-30T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=kgN335L",
                "PictureUrl": "https://dce7bb5076c180fd5086-a61b1a070ddd3043ca11f65d9f018e78.ssl.cf2.rackcdn.com//dab54c56-5daf-4cfe-8e10-0d524f9a090e_DTL.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "19:00:00",
                            "EndTime": "20:30:00",
                            "StartDate": "2025-05-02T00:00:00",
                            "EndDate": "2025-06-06T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-06T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [
                            {
                                "Object": "Person",
                                "State": "Normal",
                                "FullName": null,
                                "FirstName": "Daniel",
                                "LastName": "Marshall",
                                "Type": "PhysicalPerson",
                                "Id": 71452425
                            }
                        ],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5926572,
                "Name": "Fireside Friday May 23rd",
                "ProgramId": 114039,
                "ProgramName": "Events 2025",
                "CategoryId": 5842197,
                "CategoryName": "Adult Programming",
                "SubCategoryId": 5842198,
                "SubCategoryName": "Fireside Fridays",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5926572",
                "Status": "Hidden"
            },
            {
                "Tags": [],
                "Description": "<p>A gathering place at the Dream Center for artists to connect with their musical passions, while engaging with an audience. Evidence that there is a safe place in the community that nurtures the Mind, Body, and Soul.</p>\n",
                "Prerequisite": "Age 21 and older.",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "dmarshall@southbendin.gov",
                "Price": 0,
                "DropInPrice": 10,
                "DisplayOrder": 5,
                "Age": {
                    "Max": 100,
                    "Min": 21,
                    "Months": false
                },
                "MaxAttendance": 2147483647,
                "SpotsRemaining": null,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 6,
                "StartDate": "2025-05-02T19:00:00-04:00",
                "EndDate": "2025-06-06T20:30:00-04:00",
                "ScheduleSummary": "Fridays, 7:00 PM - 8:30 PM",
                "HasSessionEnabled": false,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": true,
                "AgeSummary": "21-100",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9012472,
                        "StartTime": "2025-04-11T19:00:00-04:00",
                        "EndTime": "2025-04-11T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012473,
                        "StartTime": "2025-04-18T19:00:00-04:00",
                        "EndTime": "2025-04-18T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012474,
                        "StartTime": "2025-04-25T19:00:00-04:00",
                        "EndTime": "2025-04-25T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012475,
                        "StartTime": "2025-05-02T19:00:00-04:00",
                        "EndTime": "2025-05-02T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012476,
                        "StartTime": "2025-05-09T19:00:00-04:00",
                        "EndTime": "2025-05-09T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012477,
                        "StartTime": "2025-05-16T19:00:00-04:00",
                        "EndTime": "2025-05-16T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012478,
                        "StartTime": "2025-05-23T19:00:00-04:00",
                        "EndTime": "2025-05-23T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012479,
                        "StartTime": "2025-05-30T19:00:00-04:00",
                        "EndTime": "2025-05-30T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xELRRVO",
                "PictureUrl": "https://f81c387c46b1d14a2113-908e58bf536d2ae9ae6098521e84a5fe.ssl.cf2.rackcdn.com//4df10ecf-a7e1-4742-a2bc-2c150da0f869_fIRESIDE.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "19:00:00",
                            "EndTime": "20:30:00",
                            "StartDate": "2025-05-02T00:00:00",
                            "EndDate": "2025-06-06T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-06T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [
                            {
                                "Object": "Person",
                                "State": "Normal",
                                "FullName": null,
                                "FirstName": "Daniel",
                                "LastName": "Marshall",
                                "Type": "PhysicalPerson",
                                "Id": 71452425
                            }
                        ],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5926573,
                "Name": "Fireside Friday May 30th",
                "ProgramId": 114039,
                "ProgramName": "Events 2025",
                "CategoryId": 5842197,
                "CategoryName": "Adult Programming",
                "SubCategoryId": 5842198,
                "SubCategoryName": "Fireside Fridays",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5926573",
                "Status": "Hidden"
            },
            {
                "Tags": [],
                "Description": "<p>A gathering place at the Dream Center for artists to connect with their musical passions, while engaging with an audience. Evidence that there is a safe place in the community that nurtures the Mind, Body, and Soul.</p>\n\n<p>Featuring: Zo Keys Band, a high-energy musical group with blends of Funk, R&amp;B, pop, and rock, with a focus on getting the crowd enaged!&nbsp;</p>\n",
                "Prerequisite": "Age 21 and older.",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "dmarshall@southbendin.gov",
                "Price": 0,
                "DropInPrice": 10,
                "DisplayOrder": 6,
                "Age": {
                    "Max": 100,
                    "Min": 21,
                    "Months": false
                },
                "MaxAttendance": 2147483647,
                "SpotsRemaining": null,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 6,
                "StartDate": "2025-05-02T19:00:00-04:00",
                "EndDate": "2025-06-06T20:30:00-04:00",
                "ScheduleSummary": "Fridays, 7:00 PM - 8:30 PM",
                "HasSessionEnabled": false,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": true,
                "AgeSummary": "21-100",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9012480,
                        "StartTime": "2025-04-11T19:00:00-04:00",
                        "EndTime": "2025-04-11T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012481,
                        "StartTime": "2025-04-18T19:00:00-04:00",
                        "EndTime": "2025-04-18T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012482,
                        "StartTime": "2025-04-25T19:00:00-04:00",
                        "EndTime": "2025-04-25T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012483,
                        "StartTime": "2025-05-02T19:00:00-04:00",
                        "EndTime": "2025-05-02T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012484,
                        "StartTime": "2025-05-09T19:00:00-04:00",
                        "EndTime": "2025-05-09T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012485,
                        "StartTime": "2025-05-16T19:00:00-04:00",
                        "EndTime": "2025-05-16T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012486,
                        "StartTime": "2025-05-23T19:00:00-04:00",
                        "EndTime": "2025-05-23T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    },
                    {
                        "Id": 9012487,
                        "StartTime": "2025-05-30T19:00:00-04:00",
                        "EndTime": "2025-05-30T20:30:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=k1j00qY",
                "PictureUrl": "https://4774b83823daefe20197-3ea5c054514f7179dc4bd59524f7d526.ssl.cf2.rackcdn.com//2781d90d-cec1-4016-9004-bc1619372e8b_Zokeyz.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "19:00:00",
                            "EndTime": "20:30:00",
                            "StartDate": "2025-05-02T00:00:00",
                            "EndDate": "2025-06-06T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-06T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [
                            {
                                "Object": "Person",
                                "State": "Normal",
                                "FullName": null,
                                "FirstName": "Daniel",
                                "LastName": "Marshall",
                                "Type": "PhysicalPerson",
                                "Id": 71452425
                            }
                        ],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5926574,
                "Name": "Fireside Friday June 6th",
                "ProgramId": 114039,
                "ProgramName": "Events 2025",
                "CategoryId": 5842197,
                "CategoryName": "Adult Programming",
                "SubCategoryId": 5842198,
                "SubCategoryName": "Fireside Fridays",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5926574",
                "Status": "Hidden"
            },
            {
                "Tags": [
                    {
                        "Id": 8054049,
                        "Name": "kids"
                    }
                ],
                "Description": "<p><strong>Dreamer&rsquo;s Summer League: Kids Edition is where fun meets fundamentals!</strong><br />\nThis youth basketball league is designed for ages 4&ndash;10 and brings energy, excitement, and skill-building to the court. With two age divisions (4&ndash;6 &amp; 7&ndash;10), kids will play fast-paced, organized games on a condensed full court every Tuesday in June. Each session is about learning, growing, and loving the game&mdash;all while rocking Dreamers jerseys and having a blast with friends. Parents, get ready for a summer of smiles, big buckets, and unforgettable moments!</p>\n",
                "Prerequisite": null,
                "Note": "Dreamer's Summer League",
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "ajohnson@southbendin.gov",
                "Price": 40,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 10,
                    "Min": 4,
                    "Months": false
                },
                "MaxAttendance": 96,
                "SpotsRemaining": 75,
                "SpotsReserved": 21,
                "NumberOfOccurrences": 4,
                "StartDate": "2025-06-03T17:00:00-04:00",
                "EndDate": "2025-06-24T21:00:00-04:00",
                "ScheduleSummary": "Tuesdays, 5:00 PM - 9:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "4-10",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9013751,
                        "StartTime": "2025-05-06T00:00:00-04:00",
                        "EndTime": "2025-06-02T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 55564,
                        "Type": "Children",
                        "Name": "Dreamer's League Form and Waiver"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yn6oovY",
                "PictureUrl": "https://c19743e9f123c9fac11a-f2730e89cb4b236e63fdff5d348f63a1.ssl.cf2.rackcdn.com//7e9d3edf-60f1-4b52-9690-651765f7019a_Dreamer_s_League_Image.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "17:00:00",
                            "EndTime": "21:00:00",
                            "StartDate": "2025-06-03T00:00:00",
                            "EndDate": "2025-06-24T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-24T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Tuesday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2137969,
                                "Name": "MLK Dream Center"
                            }
                        ]
                    }
                ],
                "Id": 5927107,
                "Name": "Dreamer's Summer League ",
                "ProgramId": 113926,
                "ProgramName": "Athletics 2025",
                "CategoryId": 5836163,
                "CategoryName": "Basketball",
                "SubCategoryId": 6005619,
                "SubCategoryName": "Youth Basketball",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5927107",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>This is not your ordinary summer camp! Your kids will have hands-on experiences with hikes, fishing, archery, arts &amp; crafts, and more. They&rsquo;ll come home with stories to share of cookouts, games, and new friends.</p>\n",
                "Prerequisite": "Campers must be entering grades 3rd - 7th in the fall to be eligible for camp. ",
                "Note": "Camp Awareness is Monday-Friday. \nDrop off: 8:30am - 9:30am\nPick up: 3:30pm - 4:30pm\n\nWhat should I pack?    \n- Lunch and afternoon snack (Please remember we do not refrigerate.)   \n - Towel    \n - Sweatshirt on chilly mornings/days\n- Extra pair of old Sneakers/Swim shoes for swimming. Campers must have shoes to go into the water.   \n - Sunscreen & Insect Repellent\n- Your camp spirit!   ",
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "Howard Park (574) 299-4765",
                "Price": 180,
                "DropInPrice": 0,
                "DisplayOrder": 0,
                "Age": {
                    "Max": 15,
                    "Min": 7,
                    "Months": false
                },
                "MaxAttendance": 50,
                "SpotsRemaining": 1,
                "SpotsReserved": 49,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-06-09T09:00:00-04:00",
                "EndDate": "2025-06-13T16:00:00-04:00",
                "ScheduleSummary": "Weekdays, 9:00 AM - 4:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "7-15",
                "Keywords": [
                    {
                        "Id": 43,
                        "Name": "Fishing"
                    },
                    {
                        "Id": 329,
                        "Name": "Archery"
                    }
                ],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9014257,
                        "StartTime": "2025-03-31T12:00:00-04:00",
                        "EndTime": "2025-06-05T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 55335,
                        "Type": "Adult",
                        "Name": "REC - Camp Awareness Adult Form "
                    },
                    {
                        "Id": 54998,
                        "Type": "Children",
                        "Name": "REC - Camp Awareness Child Form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xlZooRN",
                "PictureUrl": "https://dd2445cd554a132a88fb-32127e719a13cbf982c0fb987285a6af.ssl.cf2.rackcdn.com//5476b7fb-b321-4d50-b40f-ab088149a38c_CampPhoto.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "09:00:00",
                            "EndTime": "16:00:00",
                            "StartDate": "2025-06-09T00:00:00",
                            "EndDate": "2025-06-13T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-13T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2156149,
                                "Name": "Izaak Walton League"
                            }
                        ]
                    }
                ],
                "Id": 5927158,
                "Name": "Camp Awareness - Week 1",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5878377,
                "CategoryName": "Camp Awareness (Izaak Walton League)",
                "SubCategoryId": 5927162,
                "SubCategoryName": "3rd - 7th Grade",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5927158",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>This is not your ordinary summer camp! Your kids will have hands-on experiences with hikes, fishing, archery, arts &amp; crafts, and more. They&rsquo;ll come home with stories to share of cookouts, games, and new friends.</p>\n",
                "Prerequisite": "Campers must be entering grades 3rd - 7th in the fall to be eligible for camp. ",
                "Note": "Camp Awareness is Monday - Friday. \nDrop off: 8:30am - 9:30am\nPick up: 3:30pm - 4:30pm\n\nWhat should I pack?    \n- Lunch and afternoon snack (Please remember we do not refrigerate.)   \n - Towel    \n - Sweatshirt on chilly mornings/days\n- Extra pair of old Sneakers/Swim shoes for swimming. Campers must have shoes to go into the water.   \n - Sunscreen & Insect Repellent\n- Your camp spirit!   \n",
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "Howard Park (574) 299-4765",
                "Price": 180,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 15,
                    "Min": 7,
                    "Months": false
                },
                "MaxAttendance": 50,
                "SpotsRemaining": 0,
                "SpotsReserved": 50,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-06-16T09:00:00-04:00",
                "EndDate": "2025-06-20T16:00:00-04:00",
                "ScheduleSummary": "Weekdays, 9:00 AM - 4:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "7-15",
                "Keywords": [
                    {
                        "Id": 43,
                        "Name": "Fishing"
                    },
                    {
                        "Id": 329,
                        "Name": "Archery"
                    }
                ],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9025003,
                        "StartTime": "2025-03-31T12:00:00-04:00",
                        "EndTime": "2025-06-12T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 55335,
                        "Type": "Adult",
                        "Name": "REC - Camp Awareness Adult Form "
                    },
                    {
                        "Id": 54998,
                        "Type": "Children",
                        "Name": "REC - Camp Awareness Child Form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=k40DDQp",
                "PictureUrl": "https://6e8d6f0f8b885656bc0a-c9150c32cdc4fa77505a5d654c06bbef.ssl.cf2.rackcdn.com//c49e18ab-1a8e-422c-9954-c380d43af992_CampPhoto.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "09:00:00",
                            "EndTime": "16:00:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-20T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2156149,
                                "Name": "Izaak Walton League"
                            }
                        ]
                    }
                ],
                "Id": 5927159,
                "Name": "Camp Awareness - Week 2 ",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5878377,
                "CategoryName": "Camp Awareness (Izaak Walton League)",
                "SubCategoryId": 5927162,
                "SubCategoryName": "3rd - 7th Grade",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5927159",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>This is not your ordinary summer camp! Your kids will have hands-on experiences with hikes, fishing, archery, arts &amp; crafts, and more. They&rsquo;ll come home with stories to share of cookouts, games, and new friends.</p>\n",
                "Prerequisite": "Campers must be entering grades 3rd - 7th in the fall to be eligible for camp. ",
                "Note": "Camp Awareness is Monday - Friday. \nDrop off: 8:30am - 9:30am\nPick up: 3:30pm - 4:30pm\n\nWhat should I pack?    \n- Lunch and afternoon snack (Please remember we do not refrigerate.)   \n - Towel    \n - Sweatshirt on chilly mornings/days\n- Extra pair of old Sneakers/Swim shoes for swimming. Campers must have shoes to go into the water.   \n - Sunscreen & Insect Repellent\n- Your camp spirit!   \n",
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "Howard Park (574) 299-4765",
                "Price": 180,
                "DropInPrice": 0,
                "DisplayOrder": 2,
                "Age": {
                    "Max": 15,
                    "Min": 7,
                    "Months": false
                },
                "MaxAttendance": 50,
                "SpotsRemaining": 0,
                "SpotsReserved": 50,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-06-23T09:00:00-04:00",
                "EndDate": "2025-06-27T16:00:00-04:00",
                "ScheduleSummary": "Weekdays, 9:00 AM - 4:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "7-15",
                "Keywords": [
                    {
                        "Id": 43,
                        "Name": "Fishing"
                    },
                    {
                        "Id": 329,
                        "Name": "Archery"
                    }
                ],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9014258,
                        "StartTime": "2025-03-31T12:00:00-04:00",
                        "EndTime": "2025-06-19T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 55335,
                        "Type": "Adult",
                        "Name": "REC - Camp Awareness Adult Form "
                    },
                    {
                        "Id": 54998,
                        "Type": "Children",
                        "Name": "REC - Camp Awareness Child Form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=b8wZZmv",
                "PictureUrl": "https://2ce47efa0fc94151ce86-df57dd3e7a1ce0493405398e88380a4b.ssl.cf2.rackcdn.com//7eba4d45-03c1-4f1b-a998-f8b352a1949b_CampPhoto.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "09:00:00",
                            "EndTime": "16:00:00",
                            "StartDate": "2025-06-23T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2156149,
                                "Name": "Izaak Walton League"
                            }
                        ]
                    }
                ],
                "Id": 5927160,
                "Name": "Camp Awareness - Week 3",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5878377,
                "CategoryName": "Camp Awareness (Izaak Walton League)",
                "SubCategoryId": 5927162,
                "SubCategoryName": "3rd - 7th Grade",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5927160",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>This is not your ordinary summer camp! Your kids will have hands-on experiences with hikes, fishing, archery, arts &amp; crafts, and more. They&rsquo;ll come home with stories to share of cookouts, games, and new friends.</p>\n",
                "Prerequisite": "Campers must be entering 2nd grade in the fall to be eligible for camp.",
                "Note": "Camp Awareness is Monday - Wednesday. \nDrop off: 8:30am - 9:30am\nPick up: 3:30pm - 4:30pm\n\nWhat should I pack?    \n- Lunch and afternoon snack (Please remember we do not refrigerate.)   \n - Towel    \n - Sweatshirt on chilly mornings/days\n- Extra pair of old Sneakers/Swim shoes for swimming. Campers must have shoes to go into the water.   \n - Sunscreen & Insect Repellent\n- Your camp spirit!   ",
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "Howard Park (574) 299-4765",
                "Price": 125,
                "DropInPrice": 0,
                "DisplayOrder": 8,
                "Age": {
                    "Max": 14,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 50,
                "SpotsRemaining": 30,
                "SpotsReserved": 20,
                "NumberOfOccurrences": 3,
                "StartDate": "2025-06-30T09:00:00-04:00",
                "EndDate": "2025-07-02T16:00:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, 9:00 AM - 4:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-14",
                "Keywords": [
                    {
                        "Id": 43,
                        "Name": "Fishing"
                    },
                    {
                        "Id": 329,
                        "Name": "Archery"
                    }
                ],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9014259,
                        "StartTime": "2025-03-31T12:00:00-04:00",
                        "EndTime": "2025-06-26T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 55335,
                        "Type": "Adult",
                        "Name": "REC - Camp Awareness Adult Form "
                    },
                    {
                        "Id": 54998,
                        "Type": "Children",
                        "Name": "REC - Camp Awareness Child Form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=y0R88Bg",
                "PictureUrl": "https://97d607a4d157c99cca6e-6a50088f445399987f1f6b71b24ac1aa.ssl.cf2.rackcdn.com//82529fef-1a3c-4edd-b38e-3252502a207c_CampPhoto.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "09:00:00",
                            "EndTime": "16:00:00",
                            "StartDate": "2025-06-30T00:00:00",
                            "EndDate": "2025-07-02T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-02T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2156149,
                                "Name": "Izaak Walton League"
                            }
                        ]
                    }
                ],
                "Id": 5927161,
                "Name": "Camp Awareness - Week 4 ",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5878377,
                "CategoryName": "Camp Awareness (Izaak Walton League)",
                "SubCategoryId": 5927166,
                "SubCategoryName": "2nd Grade",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5927161",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>This is not your ordinary summer camp! Your kids will have hands-on experiences with hikes, fishing, archery, arts &amp; crafts, and more. They&rsquo;ll come home with stories to share of cookouts, games, and new friends.</p>\n",
                "Prerequisite": "Campers must be entering grades 3rd - 7th in the fall to be eligible for camp. ",
                "Note": "Camp Awareness is Monday-Friday. \nDrop off: 8:30am - 9:30am\nPick up: 3:30pm - 4:30pm\n\nWhat should I pack?    \n- Lunch and afternoon snack (Please remember we do not refrigerate.)   \n - Towel    \n - Sweatshirt on chilly mornings/days\n- Extra pair of old Sneakers/Swim shoes for swimming. Campers must have shoes to go into the water.   \n - Sunscreen & Insect Repellent\n- Your camp spirit!   \n",
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "Howard Park (574) 299-4765",
                "Price": 180,
                "DropInPrice": 0,
                "DisplayOrder": 3,
                "Age": {
                    "Max": 15,
                    "Min": 7,
                    "Months": false
                },
                "MaxAttendance": 50,
                "SpotsRemaining": 20,
                "SpotsReserved": 30,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-07-07T09:00:00-04:00",
                "EndDate": "2025-07-11T16:00:00-04:00",
                "ScheduleSummary": "Weekdays, 9:00 AM - 4:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "7-15",
                "Keywords": [
                    {
                        "Id": 43,
                        "Name": "Fishing"
                    },
                    {
                        "Id": 329,
                        "Name": "Archery"
                    }
                ],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9025011,
                        "StartTime": "2025-03-31T12:00:00-04:00",
                        "EndTime": "2025-07-03T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 55335,
                        "Type": "Adult",
                        "Name": "REC - Camp Awareness Adult Form "
                    },
                    {
                        "Id": 54998,
                        "Type": "Children",
                        "Name": "REC - Camp Awareness Child Form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=bVdjo7Q",
                "PictureUrl": "https://dd2445cd554a132a88fb-32127e719a13cbf982c0fb987285a6af.ssl.cf2.rackcdn.com//5476b7fb-b321-4d50-b40f-ab088149a38c_CampPhoto.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "09:00:00",
                            "EndTime": "16:00:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-11T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-11T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2156149,
                                "Name": "Izaak Walton League"
                            }
                        ]
                    }
                ],
                "Id": 5933526,
                "Name": "Camp Awareness - Week 5",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5878377,
                "CategoryName": "Camp Awareness (Izaak Walton League)",
                "SubCategoryId": 5927162,
                "SubCategoryName": "3rd - 7th Grade",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5933526",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>This is not your ordinary summer camp! Your kids will have hands-on experiences with hikes, fishing, archery, arts &amp; crafts, and more. They&rsquo;ll come home with stories to share of cookouts, games, and new friends.</p>\n",
                "Prerequisite": "Campers must be entering grades 3rd - 7th in the fall to be eligible for camp. ",
                "Note": "Camp Awareness is Monday-Friday. \nDrop off: 8:30am - 9:30am\nPick up: 3:30pm - 4:30pm\n\nWhat should I pack?    \n- Lunch and afternoon snack (Please remember we do not refrigerate.)   \n - Towel    \n - Sweatshirt on chilly mornings/days\n- Extra pair of old Sneakers/Swim shoes for swimming. Campers must have shoes to go into the water.   \n - Sunscreen & Insect Repellent\n- Your camp spirit!   \n",
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "Howard Park (574) 299-4765",
                "Price": 180,
                "DropInPrice": 0,
                "DisplayOrder": 4,
                "Age": {
                    "Max": 15,
                    "Min": 7,
                    "Months": false
                },
                "MaxAttendance": 50,
                "SpotsRemaining": 10,
                "SpotsReserved": 40,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-07-14T09:00:00-04:00",
                "EndDate": "2025-07-18T16:00:00-04:00",
                "ScheduleSummary": "Weekdays, 9:00 AM - 4:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "7-15",
                "Keywords": [
                    {
                        "Id": 43,
                        "Name": "Fishing"
                    },
                    {
                        "Id": 329,
                        "Name": "Archery"
                    }
                ],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9025012,
                        "StartTime": "2025-03-31T12:00:00-04:00",
                        "EndTime": "2025-07-10T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 55335,
                        "Type": "Adult",
                        "Name": "REC - Camp Awareness Adult Form "
                    },
                    {
                        "Id": 54998,
                        "Type": "Children",
                        "Name": "REC - Camp Awareness Child Form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xaojGVe",
                "PictureUrl": "https://dd2445cd554a132a88fb-32127e719a13cbf982c0fb987285a6af.ssl.cf2.rackcdn.com//5476b7fb-b321-4d50-b40f-ab088149a38c_CampPhoto.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "09:00:00",
                            "EndTime": "16:00:00",
                            "StartDate": "2025-07-14T00:00:00",
                            "EndDate": "2025-07-18T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-18T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2156149,
                                "Name": "Izaak Walton League"
                            }
                        ]
                    }
                ],
                "Id": 5933541,
                "Name": "Camp Awareness - Week 6",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5878377,
                "CategoryName": "Camp Awareness (Izaak Walton League)",
                "SubCategoryId": 5927162,
                "SubCategoryName": "3rd - 7th Grade",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5933541",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>This is not your ordinary summer camp! Your kids will have hands-on experiences with hikes, fishing, archery, arts &amp; crafts, and more. They&rsquo;ll come home with stories to share of cookouts, games, and new friends.</p>\n",
                "Prerequisite": "Campers must be entering grades 3rd - 7th in the fall to be eligible for camp. ",
                "Note": "Camp Awareness is Monday-Friday. \nDrop off: 8:30am - 9:30am\nPick up: 3:30pm - 4:30pm\n\nWhat should I pack?    \n- Lunch and afternoon snack (Please remember we do not refrigerate.)   \n - Towel    \n - Sweatshirt on chilly mornings/days\n- Extra pair of old Sneakers/Swim shoes for swimming. Campers must have shoes to go into the water.   \n - Sunscreen & Insect Repellent\n- Your camp spirit!   \n",
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "Howard Park (574) 299-4765",
                "Price": 180,
                "DropInPrice": 0,
                "DisplayOrder": 5,
                "Age": {
                    "Max": 15,
                    "Min": 7,
                    "Months": false
                },
                "MaxAttendance": 50,
                "SpotsRemaining": 28,
                "SpotsReserved": 22,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-07-21T09:00:00-04:00",
                "EndDate": "2025-07-25T16:00:00-04:00",
                "ScheduleSummary": "Weekdays, 9:00 AM - 4:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "7-15",
                "Keywords": [
                    {
                        "Id": 43,
                        "Name": "Fishing"
                    },
                    {
                        "Id": 329,
                        "Name": "Archery"
                    }
                ],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9025013,
                        "StartTime": "2025-03-31T12:00:00-04:00",
                        "EndTime": "2025-07-17T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 55335,
                        "Type": "Adult",
                        "Name": "REC - Camp Awareness Adult Form "
                    },
                    {
                        "Id": 54998,
                        "Type": "Children",
                        "Name": "REC - Camp Awareness Child Form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=x5Xd7qX",
                "PictureUrl": "https://dd2445cd554a132a88fb-32127e719a13cbf982c0fb987285a6af.ssl.cf2.rackcdn.com//5476b7fb-b321-4d50-b40f-ab088149a38c_CampPhoto.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "09:00:00",
                            "EndTime": "16:00:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-25T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-25T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2156149,
                                "Name": "Izaak Walton League"
                            }
                        ]
                    }
                ],
                "Id": 5933577,
                "Name": "Camp Awareness - Week 7",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5878377,
                "CategoryName": "Camp Awareness (Izaak Walton League)",
                "SubCategoryId": 5927162,
                "SubCategoryName": "3rd - 7th Grade",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5933577",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>This is not your ordinary summer camp! Your kids will have hands-on experiences with hikes, fishing, archery, arts &amp; crafts, and more. They&rsquo;ll come home with stories to share of cookouts, games, and new friends.</p>\n",
                "Prerequisite": "Campers must be entering grades 3rd - 7th in the fall to be eligible for camp. ",
                "Note": "Camp Awareness is Monday-Friday. \nDrop off: 8:30am - 9:30am\nPick up: 3:30pm - 4:30pm\n\nWhat should I pack?    \n- Lunch and afternoon snack (Please remember we do not refrigerate.)   \n - Towel    \n - Sweatshirt on chilly mornings/days\n- Extra pair of old Sneakers/Swim shoes for swimming. Campers must have shoes to go into the water.   \n - Sunscreen & Insect Repellent\n- Your camp spirit!   \n",
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "Howard Park (574) 299-4765",
                "Price": 180,
                "DropInPrice": 0,
                "DisplayOrder": 6,
                "Age": {
                    "Max": 15,
                    "Min": 7,
                    "Months": false
                },
                "MaxAttendance": 50,
                "SpotsRemaining": 10,
                "SpotsReserved": 40,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-07-28T09:00:00-04:00",
                "EndDate": "2025-08-01T16:00:00-04:00",
                "ScheduleSummary": "Weekdays, 9:00 AM - 4:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "7-15",
                "Keywords": [
                    {
                        "Id": 43,
                        "Name": "Fishing"
                    },
                    {
                        "Id": 329,
                        "Name": "Archery"
                    }
                ],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9025014,
                        "StartTime": "2025-03-31T12:00:00-04:00",
                        "EndTime": "2025-07-24T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 55335,
                        "Type": "Adult",
                        "Name": "REC - Camp Awareness Adult Form "
                    },
                    {
                        "Id": 54998,
                        "Type": "Children",
                        "Name": "REC - Camp Awareness Child Form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yegjl20",
                "PictureUrl": "https://dd2445cd554a132a88fb-32127e719a13cbf982c0fb987285a6af.ssl.cf2.rackcdn.com//5476b7fb-b321-4d50-b40f-ab088149a38c_CampPhoto.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "09:00:00",
                            "EndTime": "16:00:00",
                            "StartDate": "2025-07-28T00:00:00",
                            "EndDate": "2025-08-01T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-08-01T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2156149,
                                "Name": "Izaak Walton League"
                            }
                        ]
                    }
                ],
                "Id": 5933580,
                "Name": "Camp Awareness - Week 8",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5878377,
                "CategoryName": "Camp Awareness (Izaak Walton League)",
                "SubCategoryId": 5927162,
                "SubCategoryName": "3rd - 7th Grade",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5933580",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Join us on June 28th, 2025 for a special pickleball day honoring Ray Comer, the &quot;founding father&quot; of pickleball in Michiana. This public event celebrates Ray&rsquo;s significant impact on the South Bend community through his dedication, passion for refereeing, and warm spirit.</p>\n\n<p>🏞️ <strong>Event Details:</strong></p>\n\n<p>🕙 <strong>10:00 am:</strong>&nbsp;&quot;Intro to Pickleball 101&quot; led by Michiana Pickleball Club instructors<br />\n🕥 <strong>10:00 am - 2:00 pm:</strong> Social play for all skill levels<br />\n🕥 <strong>12:00 pm - 3:00 pm:</strong> Round robin Pickleball by the Numbers<br />\n🍔 Food and fun throughout the day</p>\n\n<p>📍 <strong>Location:</strong> Ray Comer Boehm Park Courts</p>\n\n<p>Whether you&#39;re a seasoned pro or new to the game, come enjoy a day of pickleball, friendship, and fun! We&rsquo;ll have courts for beginners, intermediate players, and a challenge court. Bring your paddle, your friends, and let&rsquo;s celebrate Ray&rsquo;s legacy with a fantastic day of play!</p>\n",
                "Prerequisite": null,
                "Note": "Join us for a fun-filled Pickleball event in honor of Ray Comer, featuring intro classes, social play, and a Pickleball by the Numbers round robin competition.",
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "Gary Demski - gdemski@southbendin.gov",
                "Price": 0,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": null,
                "MaxAttendance": 2147483647,
                "SpotsRemaining": null,
                "SpotsReserved": 5,
                "NumberOfOccurrences": 1,
                "StartDate": "2025-06-28T10:00:00-04:00",
                "EndDate": "2025-06-28T16:00:00-04:00",
                "ScheduleSummary": "Saturday, June 28, 2025, 10:00 AM - 4:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": false,
                "AgeSummary": "",
                "Keywords": [
                    {
                        "Id": 618,
                        "Name": "Pickleball"
                    }
                ],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 55977,
                        "Type": "Adult",
                        "Name": "REC - Pickleball"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=bDEmze5",
                "PictureUrl": "https://c19743e9f123c9fac11a-f2730e89cb4b236e63fdff5d348f63a1.ssl.cf2.rackcdn.com//bfe02c27-5373-4ee0-a961-764d9f058dce_Blue_and_Orange_Modern_Pickleball_Tournament_Flyer.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "16:00:00",
                            "StartDate": "2025-06-28T00:00:00",
                            "EndDate": "2025-06-28T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [
                            {
                                "Object": "Person",
                                "State": "Normal",
                                "FullName": null,
                                "FirstName": "Gary",
                                "LastName": "Demski",
                                "Type": "PhysicalPerson",
                                "Id": 72326301
                            }
                        ],
                        "Locations": [
                            {
                                "Id": 2171500,
                                "Name": "Boehm Pickleball Courts"
                            }
                        ]
                    }
                ],
                "Id": 5969364,
                "Name": "2025 Ray Comer Pickleball Classic",
                "ProgramId": 114092,
                "ProgramName": "Health and Wellness 2025",
                "CategoryId": 5969362,
                "CategoryName": "Athletic Registrations",
                "SubCategoryId": 5969363,
                "SubCategoryName": "Pickleball",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5969364",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Join us for&nbsp;<strong>Adult Lessons (18+)</strong>&nbsp;every&nbsp;<strong>Monday</strong>&nbsp;starting&nbsp;<strong>July 7 through August 11</strong>, from&nbsp;<strong>5:00 PM to 6:00 PM</strong>. Whether you&rsquo;re brushing up on skills or trying something new, these fun, low-pressure sessions are perfect for adult learners of all levels. Just&nbsp;<strong>$10 per day</strong>&nbsp;&ndash; come as often as you like and learn at your own pace!</p>\n\n<p>&nbsp;</p>\n",
                "Prerequisite": null,
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "Gary Demski - gdemski@southbendin.gov",
                "Price": 10,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 99,
                    "Min": 16,
                    "Months": false
                },
                "MaxAttendance": 10,
                "SpotsRemaining": 10,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 6,
                "StartDate": "2025-07-07T17:00:00-04:00",
                "EndDate": "2025-08-11T18:00:00-04:00",
                "ScheduleSummary": "Mondays, 5:00 PM - 6:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "16-99",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56028,
                        "Type": "Adult",
                        "Name": "REC - Adult Tennis Lessons"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xW5AgdR",
                "PictureUrl": "https://5f57ccb6032dc48391a8-835337b603ad193053ae01e4c99b9c32.ssl.cf2.rackcdn.com//faadf991-5858-4ff1-8af6-9b525836f0e9_DSC_2074_1536x1024.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "17:00:00",
                            "EndTime": "18:00:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-08-11T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-08-11T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2171298,
                                "Name": "Leeper Tennis Center"
                            }
                        ]
                    }
                ],
                "Id": 5980411,
                "Name": "Adult Tennis Lessons - Leeper Tennis",
                "ProgramId": 113926,
                "ProgramName": "Athletics 2025",
                "CategoryId": 5980409,
                "CategoryName": "Athletics",
                "SubCategoryId": 5980410,
                "SubCategoryName": "Tennis",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5980411",
                "Status": "Hidden"
            },
            {
                "Tags": [
                    {
                        "Id": 8054049,
                        "Name": "kids"
                    }
                ],
                "Description": "<p>Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be 3-5 years old. \nChild also must be potty trained.",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 0,
                "SpotsReserved": 5,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T10:00:00-04:00",
                "EndDate": "2025-06-27T10:20:00-04:00",
                "ScheduleSummary": "Weekdays, 10:00 AM - 10:20 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9100585,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xELvjr0",
                "PictureUrl": "https://0fc5b75c2846b34c4a84-a3d37807570028269bb7162f439d54b3.ssl.cf2.rackcdn.com//eb61067a-0682-4910-bbd3-4272090d8323_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:20:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:20:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:20:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5981629,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5981628,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5981629",
                "Status": "Normal"
            },
            {
                "Tags": [
                    {
                        "Id": 8054049,
                        "Name": "kids"
                    }
                ],
                "Description": "<p>Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be 3-5 years old. \nChild also must be potty trained.",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 2,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 0,
                "SpotsReserved": 5,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T10:30:00-04:00",
                "EndDate": "2025-06-27T10:50:00-04:00",
                "ScheduleSummary": "Weekdays, 10:30 AM - 10:50 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9100614,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=kgN0WpQ",
                "PictureUrl": "https://0e37821a1c7db59a43d5-60f88fd1b595e23c6acf6a357d8de749.ssl.cf2.rackcdn.com//930fc21d-1ee4-4497-b0ad-1d939f0b94eb_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:30:00",
                            "EndTime": "10:50:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "10:30:00",
                            "EndTime": "10:50:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "10:30:00",
                            "EndTime": "10:50:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5981728,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5981628,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5981728",
                "Status": "Normal"
            },
            {
                "Tags": [
                    {
                        "Id": 8054049,
                        "Name": "kids"
                    }
                ],
                "Description": "<p>Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be 3-5 years old. \nChild also must be potty trained.",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 3,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 3,
                "SpotsReserved": 2,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T11:00:00-04:00",
                "EndDate": "2025-06-27T11:20:00-04:00",
                "ScheduleSummary": "Weekdays, 11:00 AM - 11:20 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9100618,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xO92XvA",
                "PictureUrl": "https://c19743e9f123c9fac11a-f2730e89cb4b236e63fdff5d348f63a1.ssl.cf2.rackcdn.com//511150d5-25b3-4a0c-870f-dde1f485d359_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:20:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:20:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:20:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5981735,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5981628,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5981735",
                "Status": "Normal"
            },
            {
                "Tags": [
                    {
                        "Id": 8054049,
                        "Name": "kids"
                    }
                ],
                "Description": "<p>Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be 3-5 years old. \nChild also must be potty trained.",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 4,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 3,
                "SpotsReserved": 2,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T11:30:00-04:00",
                "EndDate": "2025-06-27T11:50:00-04:00",
                "ScheduleSummary": "Weekdays, 11:30 AM - 11:50 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9100619,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yeg4apY",
                "PictureUrl": "https://8d02f226e7fac438d147-dbf8020f06ec9db8728d217aa41a47fe.ssl.cf2.rackcdn.com//74445725-9e6e-4a3f-9b10-fa703edc8ac6_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "11:30:00",
                            "EndTime": "11:50:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "11:30:00",
                            "EndTime": "11:50:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "11:30:00",
                            "EndTime": "11:50:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5981736,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5981628,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5981736",
                "Status": "Normal"
            },
            {
                "Tags": [
                    {
                        "Id": 8054049,
                        "Name": "kids"
                    }
                ],
                "Description": "<p>Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be 3-5 years old. \nChild also must be potty trained.",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 5,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 4,
                "SpotsReserved": 1,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T12:00:00-04:00",
                "EndDate": "2025-06-27T12:20:00-04:00",
                "ScheduleSummary": "Weekdays, 12:00 PM - 12:20 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9100620,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=b3d5vA2",
                "PictureUrl": "https://e2827affce228e50a99c-54671ad266f81a11bad9d2530fa12fda.ssl.cf2.rackcdn.com//fe4226db-4f4f-40fd-9a57-2d5a34fbca72_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:20:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:20:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:20:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5981737,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5981628,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5981737",
                "Status": "Normal"
            },
            {
                "Tags": [
                    {
                        "Id": 8054049,
                        "Name": "kids"
                    }
                ],
                "Description": "<p>Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be 3-5 years old. \nChild also must be potty trained.",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 6,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 5,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T12:30:00-04:00",
                "EndDate": "2025-06-27T12:50:00-04:00",
                "ScheduleSummary": "Weekdays, 12:30 PM - 12:50 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9100621,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xpvB7aB",
                "PictureUrl": "https://15cc8899cee180a156f3-65e0ab52519da8b204f527f39fc8cf19.ssl.cf2.rackcdn.com//d6c9e4d0-6346-401a-bbc2-ec4ba72c686e_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "12:30:00",
                            "EndTime": "12:50:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:30:00",
                            "EndTime": "12:50:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:30:00",
                            "EndTime": "12:50:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5981738,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5981628,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5981738",
                "Status": "Normal"
            },
            {
                "Tags": [
                    {
                        "Id": 8054049,
                        "Name": "kids"
                    }
                ],
                "Description": "<p>Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be 3-5 years old. \nChild also must be potty trained.",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 7,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 4,
                "SpotsReserved": 1,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T13:00:00-04:00",
                "EndDate": "2025-06-27T13:20:00-04:00",
                "ScheduleSummary": "Weekdays, 1:00 PM - 1:20 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9100622,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yJJl7Zd",
                "PictureUrl": "https://1558f8bef0a08076de14-0d4b14d652b580ca0ab892ee04f4af1c.ssl.cf2.rackcdn.com//71dafc73-6bae-4c0f-bb20-d8f82bc2f444_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:20:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:20:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:20:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5981739,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5981628,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5981739",
                "Status": "Normal"
            },
            {
                "Tags": [
                    {
                        "Id": 8054049,
                        "Name": "kids"
                    }
                ],
                "Description": "<p>Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be 3-5 years old. \nChild also must be potty trained.",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 8,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 3,
                "SpotsReserved": 2,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T13:30:00-04:00",
                "EndDate": "2025-06-27T13:50:00-04:00",
                "ScheduleSummary": "Weekdays, 1:30 PM - 1:50 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9100623,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xrVzpBo",
                "PictureUrl": "https://33432dd5a743adb6a46d-3f2e74303a1f391aba965245c7568029.ssl.cf2.rackcdn.com//36ccdf3f-d84f-4303-8d84-06d2e658e5c1_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "13:30:00",
                            "EndTime": "13:50:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "13:30:00",
                            "EndTime": "13:50:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "13:30:00",
                            "EndTime": "13:50:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5981740,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5981628,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5981740",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 1- Introduction to Aquatic Skills</strong>- In Level 1, your child is introduced to basic skills as the foundation for future skills and the development of water competency. Below are some of the skills they will learn in Level 1:</p>\n\n<ul>\n\t<li>Enter and exit water unassisted (using the ladder, edge or ramp)</li>\n\t<li>Swim 5-10 yards on front and back with minimal to no assistance</li>\n\t<li>Bob 5 times (fully submerging each time)</li>\n\t<li>Open eyes underwater and retrieve a submerged object</li>\n\t<li>Float on front and back with minimal to no assistance</li>\n\t<li>Roll from back to front and front to back</li>\n\t<li>Combined arm and leg actions on front with minimal to no assistance</li>\n\t<li>Combined arm and leg actions on back with minimal to no assistance</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 1 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&#39;s not important how quickly they move through each level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be at least 6 years of age.",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 0,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 1,
                "SpotsReserved": 7,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T10:00:00-04:00",
                "EndDate": "2025-06-27T10:45:00-04:00",
                "ScheduleSummary": "Weekdays, 10:00 AM - 10:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9100841,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yKE4P11",
                "PictureUrl": "https://7571136d3099eefe9875-7f5c1e8bfd35ba50b238b652d67d546d.ssl.cf2.rackcdn.com//96d94e61-d033-41f2-b3e4-65f7befa9bd5_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:45:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:45:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:45:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5981834,
                "Name": "Level 1 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5981833,
                "SubCategoryName": "Level 1",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5981834",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 1- Introduction to Aquatic Skills</strong>- In Level 1, your child is introduced to basic skills as the foundation for future skills and the development of water competency. Below are some of the skills they will learn in Level 1:</p>\n\n<ul>\n\t<li>Enter and exit water unassisted (using the ladder, edge or ramp)</li>\n\t<li>Swim 5-10 yards on front and back with minimal to no assistance</li>\n\t<li>Bob 5 times (fully submerging each time)</li>\n\t<li>Open eyes underwater and retrieve a submerged object</li>\n\t<li>Float on front and back with minimal to no assistance</li>\n\t<li>Roll from back to front and front to back</li>\n\t<li>Combined arm and leg actions on front with minimal to no assistance</li>\n\t<li>Combined arm and leg actions on back with minimal to no assistance</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 1 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&#39;s not important how quickly they move through each level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be at least 6 years of age.",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 0,
                "SpotsReserved": 8,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T11:00:00-04:00",
                "EndDate": "2025-06-27T23:45:00-04:00",
                "ScheduleSummary": "Weekdays, 11:00 AM - 11:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9101517,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yvzMjnd",
                "PictureUrl": "https://dd2445cd554a132a88fb-32127e719a13cbf982c0fb987285a6af.ssl.cf2.rackcdn.com//ac6bfc8e-a8d4-4d98-8b8d-0ad17ff303e7_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "23:45:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "23:45:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "23:45:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5981887,
                "Name": "Level 1 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5981833,
                "SubCategoryName": "Level 1",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5981887",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 1- Introduction to Aquatic Skills</strong>- In Level 1, your child is introduced to basic skills as the foundation for future skills and the development of water competency. Below are some of the skills they will learn in Level 1:</p>\n\n<ul>\n\t<li>Enter and exit water unassisted (using the ladder, edge or ramp)</li>\n\t<li>Swim 5-10 yards on front and back with minimal to no assistance</li>\n\t<li>Bob 5 times (fully submerging each time)</li>\n\t<li>Open eyes underwater and retrieve a submerged object</li>\n\t<li>Float on front and back with minimal to no assistance</li>\n\t<li>Roll from back to front and front to back</li>\n\t<li>Combined arm and leg actions on front with minimal to no assistance</li>\n\t<li>Combined arm and leg actions on back with minimal to no assistance</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 1 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&#39;s not important how quickly they move through each level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be at least 6 years of age.",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 2,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 0,
                "SpotsReserved": 8,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T12:00:00-04:00",
                "EndDate": "2025-06-27T12:45:00-04:00",
                "ScheduleSummary": "Weekdays, 12:00 PM - 12:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9101518,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xB1MozQ",
                "PictureUrl": "https://4ea2292b294783417167-c3b4c3d05af52a17af11e447ba1e4d0c.ssl.cf2.rackcdn.com//2c9026a2-d284-4974-8f75-1bdc4ab6f2dc_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:45:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:45:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:45:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5981888,
                "Name": "Level 1 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5981833,
                "SubCategoryName": "Level 1",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5981888",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 1- Introduction to Aquatic Skills</strong>- In Level 1, your child is introduced to basic skills as the foundation for future skills and the development of water competency. Below are some of the skills they will learn in Level 1:</p>\n\n<ul>\n\t<li>Enter and exit water unassisted (using the ladder, edge or ramp)</li>\n\t<li>Swim 5-10 yards on front and back with minimal to no assistance</li>\n\t<li>Bob 5 times (fully submerging each time)</li>\n\t<li>Open eyes underwater and retrieve a submerged object</li>\n\t<li>Float on front and back with minimal to no assistance</li>\n\t<li>Roll from back to front and front to back</li>\n\t<li>Combined arm and leg actions on front with minimal to no assistance</li>\n\t<li>Combined arm and leg actions on back with minimal to no assistance</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 1 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&#39;s not important how quickly they move through each level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be at least 6 years of age.",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 3,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 0,
                "SpotsReserved": 8,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T13:00:00-04:00",
                "EndDate": "2025-06-27T13:45:00-04:00",
                "ScheduleSummary": "Weekdays, 1:00 PM - 1:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9101520,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=bz8Gj76",
                "PictureUrl": "https://751ce3f22748b570e5af-7562146619cae3bd1733118021d95e07.ssl.cf2.rackcdn.com//39baed99-3aeb-4fb4-9a2d-1784ac8f6bb8_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:45:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:45:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:45:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5981890,
                "Name": "Level 1 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5981833,
                "SubCategoryName": "Level 1",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5981890",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 2-Fundamental Aquatic Skills</strong>- In Level 2 your child builds on skills learned in Level 1. Your child begins to perform skills at a slightly more advanced level and begins to gain rudimentary propulsive skills on the front and the back.</p>\n\n<ul>\n\t<li>Fully submerge and hold breath for 10 seconds</li>\n\t<li>Bob 10 times (fully submerging each time)</li>\n\t<li>Retrieve submerged objects</li>\n\t<li>Rotary Breathing 10 times</li>\n\t<li>Front and Back glide 2 body lengths</li>\n\t<li>Introduction to treading water</li>\n\t<li>Front float, Jellyfish float and Tuck float 10 seconds each</li>\n\t<li>Swim 15 yards on front (front crawl) with rotary breathing</li>\n\t<li>Swim 15 yards on back (back crawl or elementary backstroke)</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 2 before they successfully demonstrate each skill. <strong>That is okay!</strong>&nbsp;It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.</em></p>\n",
                "Prerequisite": "Child must be at least 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 6,
                "SpotsReserved": 2,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T10:00:00-04:00",
                "EndDate": "2025-06-27T10:45:00-04:00",
                "ScheduleSummary": "Weekdays, 10:00 AM - 10:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9101533,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=bDEmlQ6",
                "PictureUrl": "https://5167f13f2971820d55e9-d9c93008634d5c1c2aa83685859082e6.ssl.cf2.rackcdn.com//46582a47-a42c-456f-9e36-2b24acd62b42_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:45:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:45:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:45:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5981920,
                "Name": "Level 2 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5981919,
                "SubCategoryName": "Level 2",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5981920",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 2-Fundamental Aquatic Skills</strong>- In Level 2 your child builds on skills learned in Level 1. Your child begins to perform skills at a slightly more advanced level and begins to gain rudimentary propulsive skills on the front and the back.</p>\n\n<ul>\n\t<li>Fully submerge and hold breath for 10 seconds</li>\n\t<li>Bob 10 times (fully submerging each time)</li>\n\t<li>Retrieve submerged objects</li>\n\t<li>Rotary Breathing 10 times</li>\n\t<li>Front and Back glide 2 body lengths</li>\n\t<li>Introduction to treading water</li>\n\t<li>Front float, Jellyfish float and Tuck float 10 seconds each</li>\n\t<li>Swim 15 yards on front (front crawl) with rotary breathing</li>\n\t<li>Swim 15 yards on back (back crawl or elementary backstroke)</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 2 before they successfully demonstrate each skill. <strong>That is okay!</strong>&nbsp;It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.</em></p>\n",
                "Prerequisite": "Child must be at least 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 2,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 3,
                "SpotsReserved": 5,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T11:00:00-04:00",
                "EndDate": "2025-06-27T11:45:00-04:00",
                "ScheduleSummary": "Weekdays, 11:00 AM - 11:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9101537,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=bVdvX7Q",
                "PictureUrl": "https://fb7da12a2a57c950af69-7390b814c841c01a29aed2d72242bf72.ssl.cf2.rackcdn.com//f4aa1c92-ab00-42c2-8e8b-713948984d68_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:45:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:45:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:45:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5981926,
                "Name": "Level 2 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5981919,
                "SubCategoryName": "Level 2",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5981926",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 2-Fundamental Aquatic Skills</strong>- In Level 2 your child builds on skills learned in Level 1. Your child begins to perform skills at a slightly more advanced level and begins to gain rudimentary propulsive skills on the front and the back.</p>\n\n<ul>\n\t<li>Fully submerge and hold breath for 10 seconds</li>\n\t<li>Bob 10 times (fully submerging each time)</li>\n\t<li>Retrieve submerged objects</li>\n\t<li>Rotary Breathing 10 times</li>\n\t<li>Front and Back glide 2 body lengths</li>\n\t<li>Introduction to treading water</li>\n\t<li>Front float, Jellyfish float and Tuck float 10 seconds each</li>\n\t<li>Swim 15 yards on front (front crawl) with rotary breathing</li>\n\t<li>Swim 15 yards on back (back crawl or elementary backstroke)</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 2 before they successfully demonstrate each skill. <strong>That is okay!</strong>&nbsp;It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.</em></p>\n",
                "Prerequisite": "Child must be at least 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 3,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 7,
                "SpotsReserved": 1,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T12:00:00-04:00",
                "EndDate": "2025-06-27T12:45:00-04:00",
                "ScheduleSummary": "Weekdays, 12:00 PM - 12:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9101538,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=kgN0WLl",
                "PictureUrl": "https://d80fdc6cd4aed839e77b-1f1b6144bd2cccc5d4751918a83e9fc3.ssl.cf2.rackcdn.com//3e62d63a-1c64-474e-a78b-380e6861cd90_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:45:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:45:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:45:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5981928,
                "Name": "Level 2 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5981919,
                "SubCategoryName": "Level 2",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5981928",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 2-Fundamental Aquatic Skills</strong>- In Level 2 your child builds on skills learned in Level 1. Your child begins to perform skills at a slightly more advanced level and begins to gain rudimentary propulsive skills on the front and the back.</p>\n\n<ul>\n\t<li>Fully submerge and hold breath for 10 seconds</li>\n\t<li>Bob 10 times (fully submerging each time)</li>\n\t<li>Retrieve submerged objects</li>\n\t<li>Rotary Breathing 10 times</li>\n\t<li>Front and Back glide 2 body lengths</li>\n\t<li>Introduction to treading water</li>\n\t<li>Front float, Jellyfish float and Tuck float 10 seconds each</li>\n\t<li>Swim 15 yards on front (front crawl) with rotary breathing</li>\n\t<li>Swim 15 yards on back (back crawl or elementary backstroke)</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 2 before they successfully demonstrate each skill. <strong>That is okay!</strong>&nbsp;It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.</em></p>\n",
                "Prerequisite": "Child must be at least 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 4,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 6,
                "SpotsReserved": 2,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T13:00:00-04:00",
                "EndDate": "2025-06-27T13:45:00-04:00",
                "ScheduleSummary": "Weekdays, 1:00 PM - 1:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9101540,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=k1j5gdB",
                "PictureUrl": "https://4b9fe82bfac012256390-ac5d61c919707207248dd411882e5464.ssl.cf2.rackcdn.com//260177cf-f888-41e3-b93c-273b0a947872_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:45:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:45:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:45:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5981930,
                "Name": "Level 2 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5981919,
                "SubCategoryName": "Level 2",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5981930",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 3- Stroke Development-</strong> In Level 3 your child will be introduced to new swimming and water safety skills and to build on previously learned skills, your child continues to work on front crawl, and elementary backstroke. They will be introduced to the scissors and dolphin kicks and will also learn the rules for headfirst entries.</p>\n\n<ul>\n\t<li>Rotary Breathing consistently</li>\n\t<li>Back Float 1 minute</li>\n\t<li>Tread water 1 minute</li>\n\t<li>Swim front crawl 25 yards (with rotary breathing)</li>\n\t<li>Swim back crawl and elementary backstroke 25 yards</li>\n\t<li>Introduction to breaststroke and scissors kick</li>\n\t<li>Headfirst entry from the side in a sitting and kneeling position</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 3 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Below are some of the skills they will learn in Level 3.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be at least 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 7,
                "SpotsReserved": 1,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T10:00:00-04:00",
                "EndDate": "2025-06-27T22:45:00-04:00",
                "ScheduleSummary": "Weekdays, 10:00 AM - 10:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9101543,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xW5Ag8q",
                "PictureUrl": "https://2fea78952a812a50af0f-5dce86a526de615d79714fc4bea89b94.ssl.cf2.rackcdn.com//3ba0d08f-3a3f-4c78-9d60-6120d30b7d14_DSC_9652.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "22:45:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "22:45:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "22:45:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5981955,
                "Name": "Level 3 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5981954,
                "SubCategoryName": "Level 3",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5981955",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 3- Stroke Development-</strong> In Level 3 your child will be introduced to new swimming and water safety skills and to build on previously learned skills, your child continues to work on front crawl, and elementary backstroke. They will be introduced to the scissors and dolphin kicks and will also learn the rules for headfirst entries.</p>\n\n<ul>\n\t<li>Rotary Breathing consistently</li>\n\t<li>Back Float 1 minute</li>\n\t<li>Tread water 1 minute</li>\n\t<li>Swim front crawl 25 yards (with rotary breathing)</li>\n\t<li>Swim back crawl and elementary backstroke 25 yards</li>\n\t<li>Introduction to breaststroke and scissors kick</li>\n\t<li>Headfirst entry from the side in a sitting and kneeling position</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 3 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Below are some of the skills they will learn in Level 3.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be at least 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 2,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 5,
                "SpotsReserved": 3,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T11:00:00-04:00",
                "EndDate": "2025-06-27T11:45:00-04:00",
                "ScheduleSummary": "Weekdays, 11:00 AM - 11:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9101547,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=y7m5adG",
                "PictureUrl": "https://0063988b26d6168aeb5b-055463b5d9b9c27a63f59cb61d4a7273.ssl.cf2.rackcdn.com//1513da59-0c62-4386-819f-fb44c61717f0_DSC_9652.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:45:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:45:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:45:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5981966,
                "Name": "Level 3 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5981954,
                "SubCategoryName": "Level 3",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5981966",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 3- Stroke Development-</strong> In Level 3 your child will be introduced to new swimming and water safety skills and to build on previously learned skills, your child continues to work on front crawl, and elementary backstroke. They will be introduced to the scissors and dolphin kicks and will also learn the rules for headfirst entries.</p>\n\n<ul>\n\t<li>Rotary Breathing consistently</li>\n\t<li>Back Float 1 minute</li>\n\t<li>Tread water 1 minute</li>\n\t<li>Swim front crawl 25 yards (with rotary breathing)</li>\n\t<li>Swim back crawl and elementary backstroke 25 yards</li>\n\t<li>Introduction to breaststroke and scissors kick</li>\n\t<li>Headfirst entry from the side in a sitting and kneeling position</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 3 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Below are some of the skills they will learn in Level 3.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be at least 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 3,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 7,
                "SpotsReserved": 1,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T12:00:00-04:00",
                "EndDate": "2025-06-27T12:45:00-04:00",
                "ScheduleSummary": "Weekdays, 12:00 PM - 12:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9101548,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=kX6zg0R",
                "PictureUrl": "https://2222054deb3449e7df38-6aafd2a92a2b93aa9b84a987e235e852.ssl.cf2.rackcdn.com//6cfe9f3e-8c9a-4be6-b941-bda59182f414_DSC_9652.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:45:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:45:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:45:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5981967,
                "Name": "Level 3 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5981954,
                "SubCategoryName": "Level 3",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5981967",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 3- Stroke Development-</strong> In Level 3 your child will be introduced to new swimming and water safety skills and to build on previously learned skills, your child continues to work on front crawl, and elementary backstroke. They will be introduced to the scissors and dolphin kicks and will also learn the rules for headfirst entries.</p>\n\n<ul>\n\t<li>Rotary Breathing consistently</li>\n\t<li>Back Float 1 minute</li>\n\t<li>Tread water 1 minute</li>\n\t<li>Swim front crawl 25 yards (with rotary breathing)</li>\n\t<li>Swim back crawl and elementary backstroke 25 yards</li>\n\t<li>Introduction to breaststroke and scissors kick</li>\n\t<li>Headfirst entry from the side in a sitting and kneeling position</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 3 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Below are some of the skills they will learn in Level 3.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be at least 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 4,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 4,
                "SpotsReserved": 4,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T13:00:00-04:00",
                "EndDate": "2025-06-27T13:45:00-04:00",
                "ScheduleSummary": "Weekdays, 1:00 PM - 1:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9101550,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=x9w5OXX",
                "PictureUrl": "https://14c1cc21077cf8658715-3ae9f60cf1e523663bbfe32811d3dd20.ssl.cf2.rackcdn.com//4d7962a8-db4b-457d-9d28-624d95b45168_DSC_9652.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:45:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:45:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:45:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5981969,
                "Name": "Level 3 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5981954,
                "SubCategoryName": "Level 3",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5981969",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 4- Stroke Improvement-</strong> In Level 4 your child will again continue to build upon skills that have been taught in previous levels and work on improving stroke proficiency and swimming for longer distances. In Level 3 they learned the scissors kick and dolphin kick, in Level 4 they will learn the arm movements for those kicks and work on putting it all together.&nbsp;</p>\n\n<ul>\n\t<li>Swim under 3 to 5 body lengths without hyperventilating</li>\n\t<li>Front Crawl 50 yards with rotary breathing</li>\n\t<li>Elementary Backstroke 50 yards</li>\n\t<li>Back Crawl 50 yards</li>\n\t<li>Breaststroke 25 yards</li>\n\t<li>Sidestroke 25 yards</li>\n\t<li>Butterfly 25 yards</li>\n\t<li>Headfirst entry from a compact position and stride position</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions&nbsp;of level 4 before they successfully demonstrate each skill. <strong>That is ok!&nbsp;</strong>It&#39;s not important how quickly they move through each level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.&nbsp;</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be at least 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 1,
                "SpotsReserved": 7,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T11:00:00-04:00",
                "EndDate": "2025-06-27T11:45:00-04:00",
                "ScheduleSummary": "Weekdays, 11:00 AM - 11:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9102247,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=x5X5Vvd",
                "PictureUrl": "https://dc295e595cd865c1a42d-74d715cb56cd0a7e3dd6f72543ea2a9f.ssl.cf2.rackcdn.com//28541721-c9b0-4744-b317-e8268c9d6180_DSC_9652.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:45:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:45:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:45:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5982133,
                "Name": "Level 4 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5982132,
                "SubCategoryName": "Level 4",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5982133",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 4- Stroke Improvement-</strong> In Level 4 your child will again continue to build upon skills that have been taught in previous levels and work on improving stroke proficiency and swimming for longer distances. In Level 3 they learned the scissors kick and dolphin kick, in Level 4 they will learn the arm movements for those kicks and work on putting it all together.&nbsp;</p>\n\n<ul>\n\t<li>Swim under 3 to 5 body lengths without hyperventilating</li>\n\t<li>Front Crawl 50 yards with rotary breathing</li>\n\t<li>Elementary Backstroke 50 yards</li>\n\t<li>Back Crawl 50 yards</li>\n\t<li>Breaststroke 25 yards</li>\n\t<li>Sidestroke 25 yards</li>\n\t<li>Butterfly 25 yards</li>\n\t<li>Headfirst entry from a compact position and stride position</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions&nbsp;of level 4 before they successfully demonstrate each skill. <strong>That is ok!&nbsp;</strong>It&#39;s not important how quickly they move through each level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.&nbsp;</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.</em></p>\n",
                "Prerequisite": "Child must be at least 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 2,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 6,
                "SpotsReserved": 2,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T13:00:00-04:00",
                "EndDate": "2025-06-27T13:45:00-04:00",
                "ScheduleSummary": "Weekdays, 1:00 PM - 1:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9102248,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yKE4PA4",
                "PictureUrl": "https://baeeabd95b2e06bf07da-11556219bed57ac4031a3cb994c32a1e.ssl.cf2.rackcdn.com//8cf469b9-2496-4af8-a77c-0ad855a7ea33_DSC_9652.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:45:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:45:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:45:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5982134,
                "Name": "Level 4 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5982132,
                "SubCategoryName": "Level 4",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5982134",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>In this Learn to Swim Levels 5&nbsp;- 6 Class, your swimmer will be grouped together in their pre-selected&nbsp;Level 5 or Level 6 preference that will match their skill level mentioned below.</p>\n\n<p><strong>Level 5- Stroke Refinement-</strong> In Level 5 your child will work on refining all six swimming strokes and going longer distances. Your child will also be introduced to new water safety skills, be introduced to doing flip turns on the front and back and continue to build on skills learned in previous levels.&nbsp;</p>\n\n<ul>\n\t<li>Tread water 5 minutes</li>\n\t<li>Tread water (legs only) 2 minutes</li>\n\t<li>Front Crawl 100 yards</li>\n\t<li>Backstroke 100 yards</li>\n\t<li>Elementary Backstroke 100 yards</li>\n\t<li>Breaststroke 50 yards</li>\n\t<li>Sidestroke 50 yards</li>\n\t<li>Butterfly 50 yards</li>\n\t<li>Front Crawl flip turn</li>\n\t<li>Backstroke flip turn</li>\n\t<li>Shallow-angle dive from the side</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>Level 6- Fundamentals of Diving, Personal Water Safety, Fitness Swimming</strong>&nbsp;- In Level 6 your child will work with our Water Safety Instructor to perfect their Personal Water Safety and/or Fitness Swimming skills.&nbsp;</p>\n\n<ul>\n\t<li>Swim 500 yards continuously using any 3 strokes, swimming at least 50 yards of each</li>\n\t<li>Front Crawl 100 yards</li>\n\t<li>Backstroke 100 yards</li>\n\t<li>Elementary Backstroke 100 yards</li>\n\t<li>Breaststroke 50 yards</li>\n\t<li>Sidestroke 50 yards</li>\n\t<li>Butterfly 50 yards</li>\n\t<li>Front Crawl open turn and flip turn</li>\n\t<li>Backstroke open turn and flip turn</li>\n\t<li>Side stroke open turn</li>\n\t<li>Butterfly open turn</li>\n\t<li>Breaststroke open turn</li>\n</ul>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.</em></p>\n",
                "Prerequisite": "Child must be at least 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 4,
                "SpotsReserved": 4,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T12:00:00-04:00",
                "EndDate": "2025-06-27T12:45:00-04:00",
                "ScheduleSummary": "Weekdays, 12:00 PM - 12:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9102249,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yn6Z7Y9",
                "PictureUrl": "https://531c9c2e8ca2db1350f6-dea40fc84afa2ff3207abb635f109cdb.ssl.cf2.rackcdn.com//5cb15425-6078-47ea-a391-f2673c433c3f_DSC_9440.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:45:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:45:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:45:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5982207,
                "Name": "Level 5 & 6 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5982206,
                "SubCategoryName": "Level 5 & 6",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5982207",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be ages 3-5\nChild must be potty trained",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 2,
                "SpotsReserved": 3,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T10:00:00-04:00",
                "EndDate": "2025-07-17T10:20:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 10:00 AM - 10:20 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9103736,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xoP92XG",
                "PictureUrl": "https://f8b62b5ae94e32c7087c-afbb37a45d5a1e6acf656fcdccd42b89.ssl.cf2.rackcdn.com//3dc69b6d-9de9-4485-8e57-e5a5a5ef54f4_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:20:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5982571,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5982570,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5982571",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be ages 3-5\nChild must be potty trained",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 2,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 4,
                "SpotsReserved": 1,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T10:30:00-04:00",
                "EndDate": "2025-07-17T10:50:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 10:30 AM - 10:50 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9103737,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=y2p5XLZ",
                "PictureUrl": "https://2b445292bf06c8d5f5e4-e703ded78391e888af2664d46ae49a95.ssl.cf2.rackcdn.com//6f22c16c-c4a9-4c23-b2d7-6f8debd8a7f7_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:30:00",
                            "EndTime": "10:50:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5982619,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5982570,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5982619",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be ages 3-5\nChild must be potty trained",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 3,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 2,
                "SpotsReserved": 3,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T11:00:00-04:00",
                "EndDate": "2025-07-17T11:20:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 11:00 AM - 11:20 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9103738,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=bDEmVdq",
                "PictureUrl": "https://0dbe3419b03f7d74f778-23e04ce6ef63ba8e4d8bc85a5e1a1360.ssl.cf2.rackcdn.com//56a03460-34c1-4b41-9d20-1f252d66fc71_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:20:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5982620,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5982570,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5982620",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be ages 3-5\nChild must be potty trained",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 4,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 5,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T11:30:00-04:00",
                "EndDate": "2025-07-17T11:50:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 11:30 AM - 11:50 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9103739,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=ydzl5vD",
                "PictureUrl": "https://79bba95e2e0397a013fc-47ba22f1807a7c9dbc3bf4cbf2182715.ssl.cf2.rackcdn.com//44c327fd-f174-48e4-a7fc-2c39df83619e_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "11:30:00",
                            "EndTime": "11:50:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5982621,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5982570,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5982621",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be ages 3-5\nChild must be potty trained",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 5,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 5,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T12:00:00-04:00",
                "EndDate": "2025-07-17T12:20:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 12:00 PM - 12:20 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9103740,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=y7m52Or",
                "PictureUrl": "https://b681e7bd17faccf3cd41-33da7ec3897738edb8a076151a46087f.ssl.cf2.rackcdn.com//43bf0377-6b2e-451c-8a51-24e1d3f87de6_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:20:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5982622,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5982570,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5982622",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be ages 3-5\nChild must be potty trained",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 6,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 5,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T12:30:00-04:00",
                "EndDate": "2025-07-17T12:50:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 12:30 PM - 12:50 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9103741,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=kX6zo4O",
                "PictureUrl": "https://126728253b6a2551d1c2-544e9732e3a1eeaf14125aae728351a7.ssl.cf2.rackcdn.com//086a1529-4928-4d3e-813e-4385b8c95199_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "12:30:00",
                            "EndTime": "12:50:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5982623,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5982570,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5982623",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be ages 3-5\nChild must be potty trained",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 7,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 5,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T01:00:00-04:00",
                "EndDate": "2025-07-17T13:20:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 1:00 AM - 1:20 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9103742,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xZzQdqp",
                "PictureUrl": "https://0bfd96ff52b525ab6d30-a80cfb5507887901202cbe224b020ff5.ssl.cf2.rackcdn.com//4671793e-5875-4a2c-8526-0274ad26c5a9_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "01:00:00",
                            "EndTime": "13:20:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5982624,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5982570,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5982624",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be ages 3-5\nChild must be potty trained",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 8,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 4,
                "SpotsReserved": 1,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T13:30:00-04:00",
                "EndDate": "2025-07-17T13:50:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 1:30 PM - 1:50 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9103743,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=x9w57l3",
                "PictureUrl": "https://6d12b7f75e6bf4abd0d4-71999d0ae3d86ae19a2f586df262d816.ssl.cf2.rackcdn.com//3a66f4de-1ebf-48bd-adb1-f632fd9319c0_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "13:30:00",
                            "EndTime": "13:50:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5982625,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5982570,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5982625",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 1- Introduction to Aquatic Skills</strong>- In Level 1, your child is introduced to basic skills as the foundation for future skills and the development of water competency. Below are some of the skills they will learn in Level 1:</p>\n\n<ul>\n\t<li>Enter and exit water unassisted (using the ladder, edge or ramp)</li>\n\t<li>Swim 5-10 yards on front and back with minimal to no assistance</li>\n\t<li>Bob 5 times (fully submerging each time)</li>\n\t<li>Open eyes underwater and retrieve a submerged object</li>\n\t<li>Float on front and back with minimal to no assistance</li>\n\t<li>Roll from back to front and front to back</li>\n\t<li>Combined arm and leg actions on front with minimal to no assistance</li>\n\t<li>Combined arm and leg actions on back with minimal to no assistance</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 1 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&#39;s not important how quickly they move through each level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be  6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 0,
                "SpotsReserved": 8,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T10:00:00-04:00",
                "EndDate": "2025-07-17T10:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 10:00 AM - 10:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9103744,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T05:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yvzMXjD",
                "PictureUrl": "https://670e727b13e4870139c6-12b2752dd0c5c52d3dd4d2a8eb133e39.ssl.cf2.rackcdn.com//dcd07207-9e8f-4b03-883b-29ef5c39a166_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:45:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5982643,
                "Name": "Level 1 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5982642,
                "SubCategoryName": "Level 1",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5982643",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 1- Introduction to Aquatic Skills</strong>- In Level 1, your child is introduced to basic skills as the foundation for future skills and the development of water competency. Below are some of the skills they will learn in Level 1:</p>\n\n<ul>\n\t<li>Enter and exit water unassisted (using the ladder, edge or ramp)</li>\n\t<li>Swim 5-10 yards on front and back with minimal to no assistance</li>\n\t<li>Bob 5 times (fully submerging each time)</li>\n\t<li>Open eyes underwater and retrieve a submerged object</li>\n\t<li>Float on front and back with minimal to no assistance</li>\n\t<li>Roll from back to front and front to back</li>\n\t<li>Combined arm and leg actions on front with minimal to no assistance</li>\n\t<li>Combined arm and leg actions on back with minimal to no assistance</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 1 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&#39;s not important how quickly they move through each level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be  6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 2,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 3,
                "SpotsReserved": 5,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T11:00:00-04:00",
                "EndDate": "2025-07-17T11:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 11:00 AM - 11:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9103745,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T05:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xB1MVol",
                "PictureUrl": "https://80adc943543d022a569e-4a4679bfa3eefa22a427af128bf0acc3.ssl.cf2.rackcdn.com//e4d66806-fbff-4a6c-9607-b7284539a947_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:45:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5982644,
                "Name": "Level 1 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5982642,
                "SubCategoryName": "Level 1",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5982644",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 1- Introduction to Aquatic Skills</strong>- In Level 1, your child is introduced to basic skills as the foundation for future skills and the development of water competency. Below are some of the skills they will learn in Level 1:</p>\n\n<ul>\n\t<li>Enter and exit water unassisted (using the ladder, edge or ramp)</li>\n\t<li>Swim 5-10 yards on front and back with minimal to no assistance</li>\n\t<li>Bob 5 times (fully submerging each time)</li>\n\t<li>Open eyes underwater and retrieve a submerged object</li>\n\t<li>Float on front and back with minimal to no assistance</li>\n\t<li>Roll from back to front and front to back</li>\n\t<li>Combined arm and leg actions on front with minimal to no assistance</li>\n\t<li>Combined arm and leg actions on back with minimal to no assistance</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 1 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&#39;s not important how quickly they move through each level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be  6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 3,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 3,
                "SpotsReserved": 5,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T12:00:00-04:00",
                "EndDate": "2025-07-17T12:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 12:00 PM - 12:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9103746,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T05:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xAoYV11",
                "PictureUrl": "https://f81c387c46b1d14a2113-908e58bf536d2ae9ae6098521e84a5fe.ssl.cf2.rackcdn.com//a3f03aa9-6e53-44ee-a286-7ab46c2e8da1_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:45:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5982645,
                "Name": "Level 1 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5982642,
                "SubCategoryName": "Level 1",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5982645",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 1- Introduction to Aquatic Skills</strong>- In Level 1, your child is introduced to basic skills as the foundation for future skills and the development of water competency. Below are some of the skills they will learn in Level 1:</p>\n\n<ul>\n\t<li>Enter and exit water unassisted (using the ladder, edge or ramp)</li>\n\t<li>Swim 5-10 yards on front and back with minimal to no assistance</li>\n\t<li>Bob 5 times (fully submerging each time)</li>\n\t<li>Open eyes underwater and retrieve a submerged object</li>\n\t<li>Float on front and back with minimal to no assistance</li>\n\t<li>Roll from back to front and front to back</li>\n\t<li>Combined arm and leg actions on front with minimal to no assistance</li>\n\t<li>Combined arm and leg actions on back with minimal to no assistance</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 1 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&#39;s not important how quickly they move through each level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be  6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 4,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 7,
                "SpotsReserved": 1,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T13:00:00-04:00",
                "EndDate": "2025-07-17T13:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 1:00 PM - 1:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9103747,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T05:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=bz8GZjZ",
                "PictureUrl": "https://501bb914b6a87bbab655-97e7afe4c070d88066ead46df1133aab.ssl.cf2.rackcdn.com//91ad9d13-8967-49dd-b776-07f2633acef3_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:45:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5982646,
                "Name": "Level 1 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5982642,
                "SubCategoryName": "Level 1",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5982646",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 2-Fundamental Aquatic Skills</strong>- In Level 2 your child builds on skills learned in Level 1. Your child begins to perform skills at a slightly more advanced level and begins to gain rudimentary propulsive skills on the front and the back.</p>\n\n<ul>\n\t<li>Fully submerge and hold breath for 10 seconds</li>\n\t<li>Bob 10 times (fully submerging each time)</li>\n\t<li>Retrieve submerged objects</li>\n\t<li>Rotary Breathing 10 times</li>\n\t<li>Front and Back glide 2 body lengths</li>\n\t<li>Introduction to treading water</li>\n\t<li>Front float, Jellyfish float and Tuck float 10 seconds each</li>\n\t<li>Swim 15 yards on front (front crawl) with rotary breathing</li>\n\t<li>Swim 15 yards on back (back crawl or elementary backstroke)</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 2 before they successfully demonstrate each skill. <strong>That is okay!</strong>&nbsp;It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.</em></p>\n",
                "Prerequisite": "Child must be 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 4,
                "SpotsReserved": 4,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T10:00:00-04:00",
                "EndDate": "2025-07-17T10:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 10:00 AM - 10:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9103749,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=kX6zogO",
                "PictureUrl": "https://c19743e9f123c9fac11a-f2730e89cb4b236e63fdff5d348f63a1.ssl.cf2.rackcdn.com//4ad90213-9d42-43dc-a7d3-327d322713a4_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:45:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5982667,
                "Name": "Level 2 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5982666,
                "SubCategoryName": "Level 2",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5982667",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 2-Fundamental Aquatic Skills</strong>- In Level 2 your child builds on skills learned in Level 1. Your child begins to perform skills at a slightly more advanced level and begins to gain rudimentary propulsive skills on the front and the back.</p>\n\n<ul>\n\t<li>Fully submerge and hold breath for 10 seconds</li>\n\t<li>Bob 10 times (fully submerging each time)</li>\n\t<li>Retrieve submerged objects</li>\n\t<li>Rotary Breathing 10 times</li>\n\t<li>Front and Back glide 2 body lengths</li>\n\t<li>Introduction to treading water</li>\n\t<li>Front float, Jellyfish float and Tuck float 10 seconds each</li>\n\t<li>Swim 15 yards on front (front crawl) with rotary breathing</li>\n\t<li>Swim 15 yards on back (back crawl or elementary backstroke)</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 2 before they successfully demonstrate each skill. <strong>That is okay!</strong>&nbsp;It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.</em></p>\n",
                "Prerequisite": "Child must be 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 2,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 5,
                "SpotsReserved": 3,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T11:00:00-04:00",
                "EndDate": "2025-07-17T11:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 11:00 AM - 11:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9103750,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=bVdvJXn",
                "PictureUrl": "https://8d02f226e7fac438d147-dbf8020f06ec9db8728d217aa41a47fe.ssl.cf2.rackcdn.com//f3630758-9362-44ef-8cb0-3ac6bdd02baa_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:45:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5982670,
                "Name": "Level 2 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5982666,
                "SubCategoryName": "Level 2",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5982670",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 2-Fundamental Aquatic Skills</strong>- In Level 2 your child builds on skills learned in Level 1. Your child begins to perform skills at a slightly more advanced level and begins to gain rudimentary propulsive skills on the front and the back.</p>\n\n<ul>\n\t<li>Fully submerge and hold breath for 10 seconds</li>\n\t<li>Bob 10 times (fully submerging each time)</li>\n\t<li>Retrieve submerged objects</li>\n\t<li>Rotary Breathing 10 times</li>\n\t<li>Front and Back glide 2 body lengths</li>\n\t<li>Introduction to treading water</li>\n\t<li>Front float, Jellyfish float and Tuck float 10 seconds each</li>\n\t<li>Swim 15 yards on front (front crawl) with rotary breathing</li>\n\t<li>Swim 15 yards on back (back crawl or elementary backstroke)</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 2 before they successfully demonstrate each skill. <strong>That is okay!</strong>&nbsp;It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.</em></p>\n",
                "Prerequisite": "Child must be 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 3,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 6,
                "SpotsReserved": 2,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T12:00:00-04:00",
                "EndDate": "2025-07-17T12:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 12:00 PM - 12:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9103751,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xoP92rB",
                "PictureUrl": "https://e2827affce228e50a99c-54671ad266f81a11bad9d2530fa12fda.ssl.cf2.rackcdn.com//271f6253-04e2-4da1-bf70-6328d855f6e0_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:45:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5982671,
                "Name": "Level 2 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5982666,
                "SubCategoryName": "Level 2",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5982671",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 2-Fundamental Aquatic Skills</strong>- In Level 2 your child builds on skills learned in Level 1. Your child begins to perform skills at a slightly more advanced level and begins to gain rudimentary propulsive skills on the front and the back.</p>\n\n<ul>\n\t<li>Fully submerge and hold breath for 10 seconds</li>\n\t<li>Bob 10 times (fully submerging each time)</li>\n\t<li>Retrieve submerged objects</li>\n\t<li>Rotary Breathing 10 times</li>\n\t<li>Front and Back glide 2 body lengths</li>\n\t<li>Introduction to treading water</li>\n\t<li>Front float, Jellyfish float and Tuck float 10 seconds each</li>\n\t<li>Swim 15 yards on front (front crawl) with rotary breathing</li>\n\t<li>Swim 15 yards on back (back crawl or elementary backstroke)</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 2 before they successfully demonstrate each skill. <strong>That is okay!</strong>&nbsp;It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.</em></p>\n",
                "Prerequisite": "Child must be 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 4,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 7,
                "SpotsReserved": 1,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T13:00:00-04:00",
                "EndDate": "2025-07-17T13:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 1:00 PM - 1:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9103752,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=kgN05WL",
                "PictureUrl": "https://41864e5a71e28aa1b370-8d19845b010b4d856d64dfa3670dcecc.ssl.cf2.rackcdn.com//bca1a87f-1ba4-4e80-bdf6-9e2329d34cba_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:45:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5982672,
                "Name": "Level 2 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5982666,
                "SubCategoryName": "Level 2",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5982672",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Adult Learn to Swim Class: (ages 15+) -</strong> For those looking to gain more confidence in the water that are 15+ years old. We will work on a range of skills from basic to more advanced, depending on your preference and skill/comfort level.</p>\n",
                "Prerequisite": "Must be at least 15 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": null,
                    "Min": 15,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 8,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-06-16T10:00:00-04:00",
                "EndDate": "2025-06-27T10:45:00-04:00",
                "ScheduleSummary": "Weekdays, 10:00 AM - 10:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "15+",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9103975,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-06-12T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=kMQ0R68",
                "PictureUrl": "https://ea8642b4f0b4156abf43-f12c8fbf2c62fdf3e95446a1f20a2f38.ssl.cf2.rackcdn.com//e6334a2e-9022-420a-9ab3-d3911f6cab0c_DSC_9440.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:45:00",
                            "StartDate": "2025-06-16T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:45:00",
                            "StartDate": "2025-06-19T00:00:00",
                            "EndDate": "2025-06-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    },
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:45:00",
                            "StartDate": "2025-06-20T00:00:00",
                            "EndDate": "2025-06-20T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5983494,
                "Name": "Adult Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5981627,
                "CategoryName": "Learn to Swim-Session 1 (6/16 to 6/27)",
                "SubCategoryId": 5983493,
                "SubCategoryName": "Adult (Ages 15+)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5983494",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 3- Stroke Development-</strong> In Level 3 your child will be introduced to new swimming and water safety skills and to build on previously learned skills, your child continues to work on front crawl, and elementary backstroke. They will be introduced to the scissors and dolphin kicks and will also learn the rules for headfirst entries.</p>\n\n<ul>\n\t<li>Rotary Breathing consistently</li>\n\t<li>Back Float 1 minute</li>\n\t<li>Tread water 1 minute</li>\n\t<li>Swim front crawl 25 yards (with rotary breathing)</li>\n\t<li>Swim back crawl and elementary backstroke 25 yards</li>\n\t<li>Introduction to breaststroke and scissors kick</li>\n\t<li>Headfirst entry from the side in a sitting and kneeling position</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 3 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Below are some of the skills they will learn in Level 3.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate</em></p>\n",
                "Prerequisite": "Child must be at least 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 4,
                "SpotsReserved": 4,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T10:00:00-04:00",
                "EndDate": "2025-07-17T10:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 10:00 AM - 10:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9103976,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yGMW0Ro",
                "PictureUrl": "https://9153e441738d8e8e25ec-5c7420068f9fa1d964c3bf7d26019c21.ssl.cf2.rackcdn.com//0f4484b1-b1a6-4801-b4b3-7ab444cdfde6_DSC_9652.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:45:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5983510,
                "Name": "Level 3 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5983509,
                "SubCategoryName": "Level 3",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5983510",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 3- Stroke Development-</strong> In Level 3 your child will be introduced to new swimming and water safety skills and to build on previously learned skills, your child continues to work on front crawl, and elementary backstroke. They will be introduced to the scissors and dolphin kicks and will also learn the rules for headfirst entries.</p>\n\n<ul>\n\t<li>Rotary Breathing consistently</li>\n\t<li>Back Float 1 minute</li>\n\t<li>Tread water 1 minute</li>\n\t<li>Swim front crawl 25 yards (with rotary breathing)</li>\n\t<li>Swim back crawl and elementary backstroke 25 yards</li>\n\t<li>Introduction to breaststroke and scissors kick</li>\n\t<li>Headfirst entry from the side in a sitting and kneeling position</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 3 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Below are some of the skills they will learn in Level 3.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate</em></p>\n",
                "Prerequisite": "Child must be at least 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 2,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 6,
                "SpotsReserved": 2,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T11:00:00-04:00",
                "EndDate": "2025-07-17T11:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 11:00 AM - 11:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105357,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xq5Ar8J",
                "PictureUrl": "https://d4d84771a5aff7e4b3a3-409e6d52da62dc43f58ba11e4d92fe56.ssl.cf2.rackcdn.com//6f688be7-ba4f-4d33-84d4-f43cc6f8073c_DSC_9652.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:45:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5983997,
                "Name": "Level 3 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5983509,
                "SubCategoryName": "Level 3",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5983997",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 3- Stroke Development-</strong> In Level 3 your child will be introduced to new swimming and water safety skills and to build on previously learned skills, your child continues to work on front crawl, and elementary backstroke. They will be introduced to the scissors and dolphin kicks and will also learn the rules for headfirst entries.</p>\n\n<ul>\n\t<li>Rotary Breathing consistently</li>\n\t<li>Back Float 1 minute</li>\n\t<li>Tread water 1 minute</li>\n\t<li>Swim front crawl 25 yards (with rotary breathing)</li>\n\t<li>Swim back crawl and elementary backstroke 25 yards</li>\n\t<li>Introduction to breaststroke and scissors kick</li>\n\t<li>Headfirst entry from the side in a sitting and kneeling position</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 3 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Below are some of the skills they will learn in Level 3.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate</em></p>\n",
                "Prerequisite": "Child must be at least 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 3,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 8,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T12:00:00-04:00",
                "EndDate": "2025-07-17T12:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 12:00 PM - 12:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105358,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xW5AoEz",
                "PictureUrl": "https://3110ac76e2d9e7a5f4b9-7b0e836afd1720951e687473eb36770a.ssl.cf2.rackcdn.com//651186db-d689-4abb-b301-ce68a4eb976e_DSC_9652.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:45:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5983999,
                "Name": "Level 3 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5983509,
                "SubCategoryName": "Level 3",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5983999",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 3- Stroke Development-</strong> In Level 3 your child will be introduced to new swimming and water safety skills and to build on previously learned skills, your child continues to work on front crawl, and elementary backstroke. They will be introduced to the scissors and dolphin kicks and will also learn the rules for headfirst entries.</p>\n\n<ul>\n\t<li>Rotary Breathing consistently</li>\n\t<li>Back Float 1 minute</li>\n\t<li>Tread water 1 minute</li>\n\t<li>Swim front crawl 25 yards (with rotary breathing)</li>\n\t<li>Swim back crawl and elementary backstroke 25 yards</li>\n\t<li>Introduction to breaststroke and scissors kick</li>\n\t<li>Headfirst entry from the side in a sitting and kneeling position</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 3 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Below are some of the skills they will learn in Level 3.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate</em></p>\n",
                "Prerequisite": "Child must be at least 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 4,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 5,
                "SpotsReserved": 3,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T13:00:00-04:00",
                "EndDate": "2025-07-17T13:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 1:00 PM - 1:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105359,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xB1MVNQ",
                "PictureUrl": "https://35c0c00e21e28d26b406-efe827fa012a2b1c4556c138347c5f0a.ssl.cf2.rackcdn.com//39c7b4d3-0745-4f34-9224-4e4c3892f735_DSC_9652.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:45:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984000,
                "Name": "Level 3 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5983509,
                "SubCategoryName": "Level 3",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984000",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 4- Stroke Improvement-</strong> In Level 4 your child will again continue to build upon skills that have been taught in previous levels and work on improving stroke proficiency and swimming for longer distances. In Level 3 they learned the scissors kick and dolphin kick, in Level 4 they will learn the arm movements for those kicks and work on putting it all together.&nbsp;</p>\n\n<ul>\n\t<li>Swim under 3 to 5 body lengths without hyperventilating</li>\n\t<li>Front Crawl 50 yards with rotary breathing</li>\n\t<li>Elementary Backstroke 50 yards</li>\n\t<li>Back Crawl 50 yards</li>\n\t<li>Breaststroke 25 yards</li>\n\t<li>Sidestroke 25 yards</li>\n\t<li>Butterfly 25 yards</li>\n\t<li>Headfirst entry from a compact position and stride position</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions&nbsp;of level 4 before they successfully demonstrate each skill. <strong>That is ok!&nbsp;</strong>It&#39;s not important how quickly they move through each level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.&nbsp;</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be at least 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 1,
                "SpotsReserved": 7,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T11:00:00-04:00",
                "EndDate": "2025-07-17T11:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 11:00 AM - 11:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105368,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xRJ7oOG",
                "PictureUrl": "https://5e59b7539bce21a46dbe-75cee74f3dcf9709515f47c26683230d.ssl.cf2.rackcdn.com//4eb7466f-abb6-4df8-9a61-308826dcd78e_DSC_9652.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:45:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984156,
                "Name": "Level 4 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5984155,
                "SubCategoryName": "Level 4",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984156",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 4- Stroke Improvement-</strong> In Level 4 your child will again continue to build upon skills that have been taught in previous levels and work on improving stroke proficiency and swimming for longer distances. In Level 3 they learned the scissors kick and dolphin kick, in Level 4 they will learn the arm movements for those kicks and work on putting it all together.&nbsp;</p>\n\n<ul>\n\t<li>Swim under 3 to 5 body lengths without hyperventilating</li>\n\t<li>Front Crawl 50 yards with rotary breathing</li>\n\t<li>Elementary Backstroke 50 yards</li>\n\t<li>Back Crawl 50 yards</li>\n\t<li>Breaststroke 25 yards</li>\n\t<li>Sidestroke 25 yards</li>\n\t<li>Butterfly 25 yards</li>\n\t<li>Headfirst entry from a compact position and stride position</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions&nbsp;of level 4 before they successfully demonstrate each skill. <strong>That is ok!&nbsp;</strong>It&#39;s not important how quickly they move through each level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.&nbsp;</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be at least 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 2,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 8,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T13:00:00-04:00",
                "EndDate": "2025-07-17T13:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 1:00 PM - 1:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105369,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yP0DowX",
                "PictureUrl": "https://c5788335a15172165fdc-c5a5a918b6cf1916fdfccabf6f911b20.ssl.cf2.rackcdn.com//9158f62b-3cdf-48e3-bd72-c0f1309c06fa_DSC_9652.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:45:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984157,
                "Name": "Level 4 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5984155,
                "SubCategoryName": "Level 4",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984157",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>In this Learn to Swim Levels 5&nbsp;- 6 Class, your swimmer will be grouped together in their pre-selected&nbsp;Level 5 or Level 6 preference that will match their skill level mentioned below.</p>\n\n<p><strong>Level 5- Stroke Refinement-</strong> In Level 5 your child will work on refining all six swimming strokes and going longer distances. Your child will also be introduced to new water safety skills, be introduced to doing flip turns on the front and back and continue to build on skills learned in previous levels.&nbsp;</p>\n\n<ul>\n\t<li>Tread water 5 minutes</li>\n\t<li>Tread water (legs only) 2 minutes</li>\n\t<li>Front Crawl 100 yards</li>\n\t<li>Backstroke 100 yards</li>\n\t<li>Elementary Backstroke 100 yards</li>\n\t<li>Breaststroke 50 yards</li>\n\t<li>Sidestroke 50 yards</li>\n\t<li>Butterfly 50 yards</li>\n\t<li>Front Crawl flip turn</li>\n\t<li>Backstroke flip turn</li>\n\t<li>Shallow-angle dive from the side</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>Level 6- Fundamentals of Diving, Personal Water Safety, Fitness Swimming</strong>&nbsp;- In Level 6 your child will work with our Water Safety Instructor to perfect their Personal Water Safety and/or Fitness Swimming skills.&nbsp;</p>\n\n<ul>\n\t<li>Swim 500 yards continuously using any 3 strokes, swimming at least 50 yards of each</li>\n\t<li>Front Crawl 100 yards</li>\n\t<li>Backstroke 100 yards</li>\n\t<li>Elementary Backstroke 100 yards</li>\n\t<li>Breaststroke 50 yards</li>\n\t<li>Sidestroke 50 yards</li>\n\t<li>Butterfly 50 yards</li>\n\t<li>Front Crawl open turn and flip turn</li>\n\t<li>Backstroke open turn and flip turn</li>\n\t<li>Side stroke open turn</li>\n\t<li>Butterfly open turn</li>\n\t<li>Breaststroke open turn</li>\n</ul>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.</em></p>\n",
                "Prerequisite": "Child must be at least 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 5,
                "SpotsReserved": 3,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T12:00:00-04:00",
                "EndDate": "2025-07-17T12:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 12:00 PM - 12:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105370,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yQ9daev",
                "PictureUrl": "https://9d8406dccad74aad2a5d-27866447ed3b58ca09ca1415fb44370f.ssl.cf2.rackcdn.com//77641fb9-6335-4a3b-b11a-9cdae3af8f0b_DSC_9440.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:45:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984192,
                "Name": "Level 5 & 6 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5984191,
                "SubCategoryName": "Level 5 & 6",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984192",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Adult Learn to Swim Class: (ages 15+) -</strong> For those looking to gain more confidence in the water that are 15+ years old. We will work on a range of skills from basic to more advanced, depending on your preference and skill/comfort level.</p>\n",
                "Prerequisite": "Must be 15 years old or older",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": null,
                    "Min": 15,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 6,
                "SpotsReserved": 2,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-07T10:00:00-04:00",
                "EndDate": "2025-07-17T10:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 10:00 AM - 10:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "15+",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105371,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-03T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=kMQ0aKr",
                "PictureUrl": "https://df4d801903d2aa6a6eca-abb2766f2a3c6454f66ac062b5a088ed.ssl.cf2.rackcdn.com//bbf197ec-3760-4649-8ab2-621be7dfb7f5_DSC_9440.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:45:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-17T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-17T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984206,
                "Name": "Adult Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5982569,
                "CategoryName": "Learn to Swim-Session 2 (7/7 to 7/17)",
                "SubCategoryId": 5984210,
                "SubCategoryName": "Adult (Ages 15+)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984206",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Pre-School- Water Exploration</strong>- Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be 3-5 years old\nChild must be potty trained",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 1,
                "SpotsReserved": 4,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T10:00:00-04:00",
                "EndDate": "2025-07-31T10:20:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 10:00 AM - 10:20 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105375,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yGMWmqj",
                "PictureUrl": "https://27456146ab3b00c8cc49-1db39a4df95579ee256fa47e3568ab91.ssl.cf2.rackcdn.com//a8402eb4-7ee4-4187-a020-d97f2f0238e2_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:20:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984410,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984409,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984410",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Pre-School- Water Exploration</strong>- Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be 3-5 years old\nChild must be potty trained",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 2,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 0,
                "SpotsReserved": 5,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T10:30:00-04:00",
                "EndDate": "2025-07-31T10:50:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 10:30 AM - 10:50 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105376,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xW5AvL1",
                "PictureUrl": "https://25c06ad4c5b1f10c64c2-2212e54a2e159060fd3fd11cce3ed30d.ssl.cf2.rackcdn.com//913c34aa-d213-49ea-a2a5-99575ce5273c_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:30:00",
                            "EndTime": "10:50:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984411,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984409,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984411",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Pre-School- Water Exploration</strong>- Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be 3-5 years old\nChild must be potty trained",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 3,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 3,
                "SpotsReserved": 2,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T11:00:00-04:00",
                "EndDate": "2025-07-31T11:20:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 11:00 AM - 11:20 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105377,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xRJ7a3r",
                "PictureUrl": "https://cc96a7209c1bf1f0f358-8b793bb0bebc8139f782f424df842a23.ssl.cf2.rackcdn.com//8233171e-4911-48a4-bffc-6037d4607241_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:20:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984412,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984409,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984412",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Pre-School- Water Exploration</strong>- Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be 3-5 years old\nChild must be potty trained",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 4,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 5,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T11:30:00-04:00",
                "EndDate": "2025-07-31T11:50:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 11:30 AM - 11:50 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105378,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yP0DaZr",
                "PictureUrl": "https://76fd57acd92498ce0128-b6faf3c00eee5c4389582c8ba35c41fa.ssl.cf2.rackcdn.com//f4adc289-e447-479d-ab45-dec542bf352e_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "11:30:00",
                            "EndTime": "11:50:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984413,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984409,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984413",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Pre-School- Water Exploration</strong>- Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be 3-5 years old\nChild must be potty trained",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 5,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 5,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T12:00:00-04:00",
                "EndDate": "2025-07-31T12:20:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 12:00 PM - 12:20 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105379,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xlZ791Q",
                "PictureUrl": "https://b1b66649035b243e84bc-243a7cf3ded34917ffdc8230ba8af30b.ssl.cf2.rackcdn.com//5685b393-e912-4b7d-87a9-e1bd118cbbf9_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:20:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984414,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984409,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984414",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Pre-School- Water Exploration</strong>- Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be 3-5 years old\nChild must be potty trained",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 6,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 5,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T12:30:00-04:00",
                "EndDate": "2025-07-31T12:50:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 12:30 PM - 12:50 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105380,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=k40JBaX",
                "PictureUrl": "https://8194c56e40300229278f-f14888355d33ddfa61d3ce2893e178c8.ssl.cf2.rackcdn.com//b06a689e-7490-4f1e-8edb-68e2fcaed044_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "12:30:00",
                            "EndTime": "12:50:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984415,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984409,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984415",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Pre-School- Water Exploration</strong>- Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be 3-5 years old\nChild must be potty trained",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 7,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 4,
                "SpotsReserved": 1,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T13:00:00-04:00",
                "EndDate": "2025-07-31T13:20:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 1:00 PM - 1:20 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105381,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=b8w5QO2",
                "PictureUrl": "https://9cfacf6835b2adb01b54-4a74cd85388b0102bfe291b5010303b0.ssl.cf2.rackcdn.com//d6780dd2-8d7e-4fc9-8e3e-662a3e712629_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:20:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984416,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984409,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984416",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Pre-School- Water Exploration</strong>- Your child will be introduced to basic stills. These skills lay the foundation for water competency and the future skill development of&nbsp; swimming strokes. We will work on entering and exiting the water independently, blowing bubbles gliding on front, rolling to back and floating.&nbsp; We will also go over safety topics such as recognizing an emergency, wearing a lifejacket and recognizing the lifeguards. It is common for students to participate in several sessions before they demonstrate each skill successfully. THAT IS OKAY! It&rsquo;s not important how quick they move through the levels, but that they acquire and master the skills in each level.</p>\n",
                "Prerequisite": "Child must be 3-5 years old\nChild must be potty trained",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 8,
                "Age": {
                    "Max": 5,
                    "Min": 3,
                    "Months": false
                },
                "MaxAttendance": 5,
                "SpotsRemaining": 5,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T13:30:00-04:00",
                "EndDate": "2025-07-31T13:50:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 1:30 PM - 1:50 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "3-5",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105382,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T00:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=y0R5NpZ",
                "PictureUrl": "https://7d6aafb57597a3e8ae0c-58d7bd6dd692c7e50f9d8cceabd4c47a.ssl.cf2.rackcdn.com//38547a56-61c6-4705-957b-d5e10f2b703a_Screenshot_2024_05_09_132637.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "13:30:00",
                            "EndTime": "13:50:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984417,
                "Name": "Pre-School Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984409,
                "SubCategoryName": "Pre-School (Ages 3-5)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984417",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 1- Introduction to Aquatic Skills</strong>- In Level 1, your child is introduced to basic skills as the foundation for future skills and the development of water competency. Below are some of the skills they will learn in Level 1:</p>\n\n<ul>\n\t<li>Enter and exit water unassisted (using the ladder, edge or ramp)</li>\n\t<li>Swim 5-10 yards on front and back with minimal to no assistance</li>\n\t<li>Bob 5 times (fully submerging each time)</li>\n\t<li>Open eyes underwater and retrieve a submerged object</li>\n\t<li>Float on front and back with minimal to no assistance</li>\n\t<li>Roll from back to front and front to back</li>\n\t<li>Combined arm and leg actions on front with minimal to no assistance</li>\n\t<li>Combined arm and leg actions on back with minimal to no assistance</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 1 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&#39;s not important how quickly they move through each level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 0,
                "SpotsReserved": 8,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T10:00:00-04:00",
                "EndDate": "2025-07-31T10:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 10:00 AM - 10:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105758,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xYXLQdg",
                "PictureUrl": "https://849cfb1e14b23fd19df9-64fa40b1fb52c968e9d2436a4e0a0762.ssl.cf2.rackcdn.com//33ea6d20-ea3a-4eb7-80f1-46452e94ba67_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:45:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984449,
                "Name": "Level 1 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984448,
                "SubCategoryName": "Level 1",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984449",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 1- Introduction to Aquatic Skills</strong>- In Level 1, your child is introduced to basic skills as the foundation for future skills and the development of water competency. Below are some of the skills they will learn in Level 1:</p>\n\n<ul>\n\t<li>Enter and exit water unassisted (using the ladder, edge or ramp)</li>\n\t<li>Swim 5-10 yards on front and back with minimal to no assistance</li>\n\t<li>Bob 5 times (fully submerging each time)</li>\n\t<li>Open eyes underwater and retrieve a submerged object</li>\n\t<li>Float on front and back with minimal to no assistance</li>\n\t<li>Roll from back to front and front to back</li>\n\t<li>Combined arm and leg actions on front with minimal to no assistance</li>\n\t<li>Combined arm and leg actions on back with minimal to no assistance</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 1 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&#39;s not important how quickly they move through each level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 2,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 6,
                "SpotsReserved": 2,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T11:00:00-04:00",
                "EndDate": "2025-07-31T11:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 11:00 AM - 11:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105759,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=kMQ0avR",
                "PictureUrl": "https://8ecc6f20896b2edeb466-34ce08a98758d5663214f59d2b5e929f.ssl.cf2.rackcdn.com//1a618557-bc4b-4319-869c-0d2e08906c1d_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:45:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984450,
                "Name": "Level 1 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984448,
                "SubCategoryName": "Level 1",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984450",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 1- Introduction to Aquatic Skills</strong>- In Level 1, your child is introduced to basic skills as the foundation for future skills and the development of water competency. Below are some of the skills they will learn in Level 1:</p>\n\n<ul>\n\t<li>Enter and exit water unassisted (using the ladder, edge or ramp)</li>\n\t<li>Swim 5-10 yards on front and back with minimal to no assistance</li>\n\t<li>Bob 5 times (fully submerging each time)</li>\n\t<li>Open eyes underwater and retrieve a submerged object</li>\n\t<li>Float on front and back with minimal to no assistance</li>\n\t<li>Roll from back to front and front to back</li>\n\t<li>Combined arm and leg actions on front with minimal to no assistance</li>\n\t<li>Combined arm and leg actions on back with minimal to no assistance</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 1 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&#39;s not important how quickly they move through each level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 3,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 8,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T12:00:00-04:00",
                "EndDate": "2025-07-31T12:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 12:00 PM - 12:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105760,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yn6Z9N9",
                "PictureUrl": "https://3a0d98c2d79b929facd7-4390bc06435c037782bcc6e44f6e66ff.ssl.cf2.rackcdn.com//cd97359f-69bd-404d-8204-5e35a8432ba1_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:45:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984451,
                "Name": "Level 1 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984448,
                "SubCategoryName": "Level 1",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984451",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 1- Introduction to Aquatic Skills</strong>- In Level 1, your child is introduced to basic skills as the foundation for future skills and the development of water competency. Below are some of the skills they will learn in Level 1:</p>\n\n<ul>\n\t<li>Enter and exit water unassisted (using the ladder, edge or ramp)</li>\n\t<li>Swim 5-10 yards on front and back with minimal to no assistance</li>\n\t<li>Bob 5 times (fully submerging each time)</li>\n\t<li>Open eyes underwater and retrieve a submerged object</li>\n\t<li>Float on front and back with minimal to no assistance</li>\n\t<li>Roll from back to front and front to back</li>\n\t<li>Combined arm and leg actions on front with minimal to no assistance</li>\n\t<li>Combined arm and leg actions on back with minimal to no assistance</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 1 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&#39;s not important how quickly they move through each level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 4,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 5,
                "SpotsReserved": 3,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T13:00:00-04:00",
                "EndDate": "2025-07-31T13:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 1:00 PM - 1:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105761,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=ym0X9Wv",
                "PictureUrl": "https://c58eb2970e88e71101dc-252246f117c8444ae472a80d02ab6805.ssl.cf2.rackcdn.com//2921cdcc-3b35-4f2f-9134-a5b6c7c1c49f_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:45:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984452,
                "Name": "Level 1 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984448,
                "SubCategoryName": "Level 1",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984452",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 2-Fundamental Aquatic Skills</strong>- In Level 2 your child builds on skills learned in Level 1. Your child begins to perform skills at a slightly more advanced level and begins to gain rudimentary propulsive skills on the front and the back.</p>\n\n<ul>\n\t<li>Fully submerge and hold breath for 10 seconds</li>\n\t<li>Bob 10 times (fully submerging each time)</li>\n\t<li>Retrieve submerged objects</li>\n\t<li>Rotary Breathing 10 times</li>\n\t<li>Front and Back glide 2 body lengths</li>\n\t<li>Introduction to treading water</li>\n\t<li>Front float, Jellyfish float and Tuck float 10 seconds each</li>\n\t<li>Swim 15 yards on front (front crawl) with rotary breathing</li>\n\t<li>Swim 15 yards on back (back crawl or elementary backstroke)</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 2 before they successfully demonstrate each skill. <strong>That is okay!</strong>&nbsp;It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.</em></p>\n",
                "Prerequisite": "Child must be 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 4,
                "SpotsReserved": 4,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T10:00:00-04:00",
                "EndDate": "2025-07-31T10:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 10:00 AM - 10:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105766,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T05:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xrVzaZW",
                "PictureUrl": "https://c56ee1e5169bee5828aa-786c5f01be8bb49e7fcaa7c08a284c0f.ssl.cf2.rackcdn.com//6abcfc36-083b-4626-b585-6f14746cce63_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:45:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984484,
                "Name": "Level 2 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984483,
                "SubCategoryName": "Level 2",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984484",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 2-Fundamental Aquatic Skills</strong>- In Level 2 your child builds on skills learned in Level 1. Your child begins to perform skills at a slightly more advanced level and begins to gain rudimentary propulsive skills on the front and the back.</p>\n\n<ul>\n\t<li>Fully submerge and hold breath for 10 seconds</li>\n\t<li>Bob 10 times (fully submerging each time)</li>\n\t<li>Retrieve submerged objects</li>\n\t<li>Rotary Breathing 10 times</li>\n\t<li>Front and Back glide 2 body lengths</li>\n\t<li>Introduction to treading water</li>\n\t<li>Front float, Jellyfish float and Tuck float 10 seconds each</li>\n\t<li>Swim 15 yards on front (front crawl) with rotary breathing</li>\n\t<li>Swim 15 yards on back (back crawl or elementary backstroke)</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 2 before they successfully demonstrate each skill. <strong>That is okay!</strong>&nbsp;It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.</em></p>\n",
                "Prerequisite": "Child must be 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 2,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 5,
                "SpotsReserved": 3,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T11:00:00-04:00",
                "EndDate": "2025-07-31T11:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 11:00 AM - 11:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105768,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T05:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xB1MvpD",
                "PictureUrl": "https://dce7bb5076c180fd5086-a61b1a070ddd3043ca11f65d9f018e78.ssl.cf2.rackcdn.com//f809e826-06b9-444d-8ab1-cb66f77b6c2b_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:45:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984488,
                "Name": "Level 2 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984483,
                "SubCategoryName": "Level 2",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984488",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 2-Fundamental Aquatic Skills</strong>- In Level 2 your child builds on skills learned in Level 1. Your child begins to perform skills at a slightly more advanced level and begins to gain rudimentary propulsive skills on the front and the back.</p>\n\n<ul>\n\t<li>Fully submerge and hold breath for 10 seconds</li>\n\t<li>Bob 10 times (fully submerging each time)</li>\n\t<li>Retrieve submerged objects</li>\n\t<li>Rotary Breathing 10 times</li>\n\t<li>Front and Back glide 2 body lengths</li>\n\t<li>Introduction to treading water</li>\n\t<li>Front float, Jellyfish float and Tuck float 10 seconds each</li>\n\t<li>Swim 15 yards on front (front crawl) with rotary breathing</li>\n\t<li>Swim 15 yards on back (back crawl or elementary backstroke)</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 2 before they successfully demonstrate each skill. <strong>That is okay!</strong>&nbsp;It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.</em></p>\n",
                "Prerequisite": "Child must be 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 3,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 6,
                "SpotsReserved": 2,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T12:00:00-04:00",
                "EndDate": "2025-07-31T12:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 12:00 PM - 12:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105769,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T05:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xAoYz76",
                "PictureUrl": "https://96105af3f7a7d961a39c-2494053df21abc21d68a21da2e9fa2d7.ssl.cf2.rackcdn.com//36e2b530-3efb-4532-828e-9b0b44ed58a8_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:45:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984489,
                "Name": "Level 2 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984483,
                "SubCategoryName": "Level 2",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984489",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 2-Fundamental Aquatic Skills</strong>- In Level 2 your child builds on skills learned in Level 1. Your child begins to perform skills at a slightly more advanced level and begins to gain rudimentary propulsive skills on the front and the back.</p>\n\n<ul>\n\t<li>Fully submerge and hold breath for 10 seconds</li>\n\t<li>Bob 10 times (fully submerging each time)</li>\n\t<li>Retrieve submerged objects</li>\n\t<li>Rotary Breathing 10 times</li>\n\t<li>Front and Back glide 2 body lengths</li>\n\t<li>Introduction to treading water</li>\n\t<li>Front float, Jellyfish float and Tuck float 10 seconds each</li>\n\t<li>Swim 15 yards on front (front crawl) with rotary breathing</li>\n\t<li>Swim 15 yards on back (back crawl or elementary backstroke)</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 2 before they successfully demonstrate each skill. <strong>That is okay!</strong>&nbsp;It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.</em></p>\n",
                "Prerequisite": "Child must be 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 4,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 4,
                "SpotsReserved": 4,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T13:00:00-04:00",
                "EndDate": "2025-07-31T13:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 1:00 PM - 1:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105770,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T05:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=bz8GrD2",
                "PictureUrl": "https://c94816835deb691a0d1f-7eb95fa2118232a91b7bd9f539e2b5cd.ssl.cf2.rackcdn.com//14f0d91a-1fe7-49c3-8a39-7dcd9764d5e2_DSC_9600.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:45:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984490,
                "Name": "Level 2 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984483,
                "SubCategoryName": "Level 2",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984490",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 3- Stroke Development-</strong> In Level 3 your child will be introduced to new swimming and water safety skills and to build on previously learned skills, your child continues to work on front crawl, and elementary backstroke. They will be introduced to the scissors and dolphin kicks and will also learn the rules for headfirst entries.</p>\n\n<ul>\n\t<li>Rotary Breathing consistently</li>\n\t<li>Back Float 1 minute</li>\n\t<li>Tread water 1 minute</li>\n\t<li>Swim front crawl 25 yards (with rotary breathing)</li>\n\t<li>Swim back crawl and elementary backstroke 25 yards</li>\n\t<li>Introduction to breaststroke and scissors kick</li>\n\t<li>Headfirst entry from the side in a sitting and kneeling position</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 3 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Below are some of the skills they will learn in Level 3.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 2,
                "SpotsReserved": 6,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T10:00:00-04:00",
                "EndDate": "2025-07-31T10:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 10:00 AM - 10:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105806,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yeg4ZaP",
                "PictureUrl": "https://dec842c1fa3e3d75b937-1622bbd8d59c0df235d62d166215d887.ssl.cf2.rackcdn.com//331d26fd-4fe2-44b7-9249-43b3f12038b0_DSC_9652.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:45:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984580,
                "Name": "Level 3 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984579,
                "SubCategoryName": "Level 3",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984580",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 3- Stroke Development-</strong> In Level 3 your child will be introduced to new swimming and water safety skills and to build on previously learned skills, your child continues to work on front crawl, and elementary backstroke. They will be introduced to the scissors and dolphin kicks and will also learn the rules for headfirst entries.</p>\n\n<ul>\n\t<li>Rotary Breathing consistently</li>\n\t<li>Back Float 1 minute</li>\n\t<li>Tread water 1 minute</li>\n\t<li>Swim front crawl 25 yards (with rotary breathing)</li>\n\t<li>Swim back crawl and elementary backstroke 25 yards</li>\n\t<li>Introduction to breaststroke and scissors kick</li>\n\t<li>Headfirst entry from the side in a sitting and kneeling position</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 3 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Below are some of the skills they will learn in Level 3.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 2,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 7,
                "SpotsReserved": 1,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T11:00:00-04:00",
                "EndDate": "2025-07-31T11:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 11:00 AM - 11:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105807,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=b3d5evv",
                "PictureUrl": "https://e24b11e683b2db3aac84-27ad7940424d8d4d9d724c5bf775dbea.ssl.cf2.rackcdn.com//861b66d9-ef7c-465e-a585-f02a44331238_DSC_9652.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:45:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984581,
                "Name": "Level 3 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984579,
                "SubCategoryName": "Level 3",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984581",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 3- Stroke Development-</strong> In Level 3 your child will be introduced to new swimming and water safety skills and to build on previously learned skills, your child continues to work on front crawl, and elementary backstroke. They will be introduced to the scissors and dolphin kicks and will also learn the rules for headfirst entries.</p>\n\n<ul>\n\t<li>Rotary Breathing consistently</li>\n\t<li>Back Float 1 minute</li>\n\t<li>Tread water 1 minute</li>\n\t<li>Swim front crawl 25 yards (with rotary breathing)</li>\n\t<li>Swim back crawl and elementary backstroke 25 yards</li>\n\t<li>Introduction to breaststroke and scissors kick</li>\n\t<li>Headfirst entry from the side in a sitting and kneeling position</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 3 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Below are some of the skills they will learn in Level 3.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 3,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 8,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T12:00:00-04:00",
                "EndDate": "2025-07-31T12:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 12:00 PM - 12:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105808,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xpvBg70",
                "PictureUrl": "https://96c542f1d87ae1d51019-441ddfab4b2637f46b4b5e8cbbaadfeb.ssl.cf2.rackcdn.com//85337de3-55ea-496e-b513-e9a5c7f2f49c_DSC_9652.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:45:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984582,
                "Name": "Level 3 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984579,
                "SubCategoryName": "Level 3",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984582",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 3- Stroke Development-</strong> In Level 3 your child will be introduced to new swimming and water safety skills and to build on previously learned skills, your child continues to work on front crawl, and elementary backstroke. They will be introduced to the scissors and dolphin kicks and will also learn the rules for headfirst entries.</p>\n\n<ul>\n\t<li>Rotary Breathing consistently</li>\n\t<li>Back Float 1 minute</li>\n\t<li>Tread water 1 minute</li>\n\t<li>Swim front crawl 25 yards (with rotary breathing)</li>\n\t<li>Swim back crawl and elementary backstroke 25 yards</li>\n\t<li>Introduction to breaststroke and scissors kick</li>\n\t<li>Headfirst entry from the side in a sitting and kneeling position</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions of Level 3 before they successfully demonstrate each skill. <strong>That is okay!</strong> It&rsquo;s not important how quickly they move through the level, but that they acquire each skill. Below are some of the skills they will learn in Level 3.</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 4,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 6,
                "SpotsReserved": 2,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T13:00:00-04:00",
                "EndDate": "2025-07-31T13:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 1:00 PM - 1:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105809,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yJJla7a",
                "PictureUrl": "https://f4309e1e716e8cf5da1d-04ffb89e98fd676fd5b4c7408c15fd0a.ssl.cf2.rackcdn.com//49f5c874-5ad5-45e0-beb3-489c224ecefa_DSC_9652.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:45:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984583,
                "Name": "Level 3 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984579,
                "SubCategoryName": "Level 3",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984583",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 4- Stroke Improvement-</strong> In Level 4 your child will again continue to build upon skills that have been taught in previous levels and work on improving stroke proficiency and swimming for longer distances. In Level 3 they learned the scissors kick and dolphin kick, in Level 4 they will learn the arm movements for those kicks and work on putting it all together.&nbsp;</p>\n\n<ul>\n\t<li>Swim under 3 to 5 body lengths without hyperventilating</li>\n\t<li>Front Crawl 50 yards with rotary breathing</li>\n\t<li>Elementary Backstroke 50 yards</li>\n\t<li>Back Crawl 50 yards</li>\n\t<li>Breaststroke 25 yards</li>\n\t<li>Sidestroke 25 yards</li>\n\t<li>Butterfly 25 yards</li>\n\t<li>Headfirst entry from a compact position and stride position</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions&nbsp;of level 4 before they successfully demonstrate each skill. <strong>That is ok!&nbsp;</strong>It&#39;s not important how quickly they move through each level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.&nbsp;</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be at least 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 4,
                "SpotsReserved": 4,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T11:00:00-04:00",
                "EndDate": "2025-07-31T11:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 11:00 AM - 11:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105813,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T05:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xAoYz1l",
                "PictureUrl": "https://3091ce875b753dfbadce-3b0b84fd0ea59918abf390e81df822c5.ssl.cf2.rackcdn.com//cb6b9926-b1cf-4e21-9952-9646b4f4b4e9_DSC_9652.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "11:00:00",
                            "EndTime": "11:45:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984601,
                "Name": "Level 4 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984600,
                "SubCategoryName": "Level 4",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984601",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Level 4- Stroke Improvement-</strong> In Level 4 your child will again continue to build upon skills that have been taught in previous levels and work on improving stroke proficiency and swimming for longer distances. In Level 3 they learned the scissors kick and dolphin kick, in Level 4 they will learn the arm movements for those kicks and work on putting it all together.&nbsp;</p>\n\n<ul>\n\t<li>Swim under 3 to 5 body lengths without hyperventilating</li>\n\t<li>Front Crawl 50 yards with rotary breathing</li>\n\t<li>Elementary Backstroke 50 yards</li>\n\t<li>Back Crawl 50 yards</li>\n\t<li>Breaststroke 25 yards</li>\n\t<li>Sidestroke 25 yards</li>\n\t<li>Butterfly 25 yards</li>\n\t<li>Headfirst entry from a compact position and stride position</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>It is common for children to participate in several sessions&nbsp;of level 4 before they successfully demonstrate each skill. <strong>That is ok!&nbsp;</strong>It&#39;s not important how quickly they move through each level, but that they acquire each skill. Some skills may be paired with other skills to create a skill set that will help prepare them for the next level.&nbsp;</p>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.&nbsp;</em></p>\n",
                "Prerequisite": "Child must be at least 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 2,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 8,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T13:00:00-04:00",
                "EndDate": "2025-07-31T13:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 1:00 PM - 1:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105814,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T05:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=bz8GrjP",
                "PictureUrl": "https://13b6ea7370bd4a6415d4-b1a3a5592ec949d194b5a57b66b02a8a.ssl.cf2.rackcdn.com//e6f6f207-1be4-406c-85d4-9a15861bbba1_DSC_9652.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "13:00:00",
                            "EndTime": "13:45:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984602,
                "Name": "Level 4 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984600,
                "SubCategoryName": "Level 4",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984602",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>In this Learn to Swim Levels 5&nbsp;- 6 Class, your swimmer will be grouped together in their pre-selected&nbsp;Level 5 or Level 6 preference that will match their skill level mentioned below.</p>\n\n<p><strong>Level 5- Stroke Refinement-</strong> In Level 5 your child will work on refining all six swimming strokes and going longer distances. Your child will also be introduced to new water safety skills, be introduced to doing flip turns on the front and back and continue to build on skills learned in previous levels.&nbsp;</p>\n\n<ul>\n\t<li>Tread water 5 minutes</li>\n\t<li>Tread water (legs only) 2 minutes</li>\n\t<li>Front Crawl 100 yards</li>\n\t<li>Backstroke 100 yards</li>\n\t<li>Elementary Backstroke 100 yards</li>\n\t<li>Breaststroke 50 yards</li>\n\t<li>Sidestroke 50 yards</li>\n\t<li>Butterfly 50 yards</li>\n\t<li>Front Crawl flip turn</li>\n\t<li>Backstroke flip turn</li>\n\t<li>Shallow-angle dive from the side</li>\n\t<li>Plus Safety Topics</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>Level 6- Fundamentals of Diving, Personal Water Safety, Fitness Swimming</strong>&nbsp;- In Level 6 your child will work with our Water Safety Instructor to perfect their Personal Water Safety and/or Fitness Swimming skills.&nbsp;</p>\n\n<ul>\n\t<li>Swim 500 yards continuously using any 3 strokes, swimming at least 50 yards of each</li>\n\t<li>Front Crawl 100 yards</li>\n\t<li>Backstroke 100 yards</li>\n\t<li>Elementary Backstroke 100 yards</li>\n\t<li>Breaststroke 50 yards</li>\n\t<li>Sidestroke 50 yards</li>\n\t<li>Butterfly 50 yards</li>\n\t<li>Front Crawl open turn and flip turn</li>\n\t<li>Backstroke open turn and flip turn</li>\n\t<li>Side stroke open turn</li>\n\t<li>Butterfly open turn</li>\n\t<li>Breaststroke open turn</li>\n</ul>\n\n<p><em>PLEASE NOTE: Swim Instructors have the final decision on which Swim Level the swimmer should participate.</em></p>\n",
                "Prerequisite": "Child must be at least 6 years old",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": 15,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 4,
                "SpotsReserved": 4,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T12:00:00-04:00",
                "EndDate": "2025-07-31T12:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 12:00 PM - 12:45 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-15",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105816,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xq5A9NY",
                "PictureUrl": "https://f008c18c19de27a9c963-18cf6523714c29dbbcadb5a9772de95e.ssl.cf2.rackcdn.com//74d8ddc7-9ce2-4b98-9687-50d7c05d9049_DSC_9440.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "12:00:00",
                            "EndTime": "12:45:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984609,
                "Name": "Level 5 & 6 Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984608,
                "SubCategoryName": "Level 5 & 6",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984609",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p><strong>Adult Learn to Swim Class: (ages 15+) -</strong> For those looking to gain more confidence in the water that are 15+ years old. We will work on a range of skills from basic to more advanced, depending on your preference and skill/comfort level.</p>\n",
                "Prerequisite": "Must be 15 years old or older",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 1,
                "Age": {
                    "Max": null,
                    "Min": 15,
                    "Months": false
                },
                "MaxAttendance": 8,
                "SpotsRemaining": 7,
                "SpotsReserved": 1,
                "NumberOfOccurrences": 8,
                "StartDate": "2025-07-21T10:00:00-04:00",
                "EndDate": "2025-07-31T10:45:00-04:00",
                "ScheduleSummary": "Mondays, Tuesdays, Wednesdays, Thursdays, 10:00 AM - 10:45 AM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "15+",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9105817,
                        "StartTime": "2025-05-03T08:00:00-04:00",
                        "EndTime": "2025-07-17T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 56037,
                        "Type": "Adult",
                        "Name": "Rec-Swim lessons Adult 2025"
                    },
                    {
                        "Id": 56038,
                        "Type": "Children",
                        "Name": "Rec-Swim lessons Child 2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xW5AvgE",
                "PictureUrl": "https://137ff14db996b7bfaeb8-498231462250467ff93688ebb14ffc71.ssl.cf2.rackcdn.com//223dca32-d12d-4845-92d7-59703d0a8168_DSC_9440.JPG",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "10:00:00",
                            "EndTime": "10:45:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-31T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-31T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday"
                            ],
                            "RecurrenceUnitType": "week",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": []
                    }
                ],
                "Id": 5984611,
                "Name": "Adult Learn to Swim",
                "ProgramId": 114110,
                "ProgramName": "Learn to Swim 2025",
                "CategoryId": 5984408,
                "CategoryName": "Learn to Swim-Session 3 (7/21 to 7/31)",
                "SubCategoryId": 5984610,
                "SubCategoryName": "Adult (15+)",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/5984611",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Latin Dance is coming to Howard Park this summer.&nbsp; Tickets are available for 21+ and are $15.00 each.&nbsp; This include entrance, live music performance by the band Los Luna, and one drink from the Howard Park Public House Bar outside.&nbsp;</p>\n",
                "Prerequisite": null,
                "Note": "21+ year old to enter and receipt to confirm payment. ",
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "",
                "Price": 0,
                "DropInPrice": 15,
                "DisplayOrder": 1,
                "Age": null,
                "MaxAttendance": 2147483647,
                "SpotsRemaining": null,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 1,
                "StartDate": "2025-07-19T19:00:00-04:00",
                "EndDate": "2025-07-19T21:30:00-04:00",
                "ScheduleSummary": "Saturday, July 19, 2025, 7:00 PM - 9:30 PM",
                "HasSessionEnabled": false,
                "HasDropInEnabled": true,
                "HasWaitListEnabled": false,
                "AgeSummary": "",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [
                    {
                        "Id": 9144035,
                        "StartTime": "2025-05-12T12:00:00-04:00",
                        "EndTime": "2025-07-19T17:00:00-04:00",
                        "RegistrationCriterionType": "Everyone",
                        "ResidencyName": null
                    }
                ],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 53496,
                        "Type": "Children",
                        "Name": "Default child form"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=bVdv0K8",
                "PictureUrl": "https://3cc3eeec755685779e55-18e139e016ca55edee642e6afae5fd1e.ssl.cf2.rackcdn.com//ed46fc49-0390-4dc6-a8d6-de3e9fde40e8_DSC06967.jpg",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "19:00:00",
                            "EndTime": "21:30:00",
                            "StartDate": "2025-07-19T00:00:00",
                            "EndDate": "2025-07-19T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": null,
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "Interval",
                            "Days": [],
                            "RecurrenceUnitType": null,
                            "MonthType": null
                        },
                        "Staff": [
                            {
                                "Object": "Person",
                                "State": "Normal",
                                "FullName": null,
                                "FirstName": "Theodora",
                                "LastName": "Philippou",
                                "Type": "PhysicalPerson",
                                "Id": 72330393
                            }
                        ],
                        "Locations": [
                            {
                                "Id": 2151205,
                                "Name": "Tire Rack Pond "
                            }
                        ]
                    }
                ],
                "Id": 6004870,
                "Name": "Latin Dance Night at Howard Park",
                "ProgramId": 114039,
                "ProgramName": "Events 2025",
                "CategoryId": 5842197,
                "CategoryName": "Adult Programming",
                "SubCategoryId": 6004869,
                "SubCategoryName": "Dance",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/6004870",
                "Status": "Hidden"
            },
            {
                "Tags": [],
                "Description": "<p>Our camp is designed to empower young minds through a variety of dynamic activities, ensuring a summer filled with creativity, exploration, and personal development.</p>\n",
                "Prerequisite": "Must have completed Kindergarten",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "Tamela Weatherspoon",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 2,
                "Age": {
                    "Max": 12,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 60,
                "SpotsRemaining": 60,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-06-23T08:30:00-04:00",
                "EndDate": "2025-06-27T17:00:00-04:00",
                "ScheduleSummary": "Every day, 8:30 AM - 5:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-12",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 54747,
                        "Type": "Children",
                        "Name": "CP-CBC-ChildForm-2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yJJlPg6",
                "PictureUrl": "https://76fd57acd92498ce0128-b6faf3c00eee5c4389582c8ba35c41fa.ssl.cf2.rackcdn.com//9dd244fe-d3dd-4dd9-a0e2-6bd6c33f5b59_Screenshot_2025_05_07_144821.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "08:30:00",
                            "EndTime": "17:00:00",
                            "StartDate": "2025-06-23T00:00:00",
                            "EndDate": "2025-06-27T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-06-27T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [],
                            "RecurrenceUnitType": "day",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2179681,
                                "Name": "Charles Black Center"
                            }
                        ]
                    }
                ],
                "Id": 6006239,
                "Name": "All Stars Summer Camp - Week 2",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5843703,
                "CategoryName": "Charles Black Community Center",
                "SubCategoryId": 6006233,
                "SubCategoryName": "All Stars Summer Camp ",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/6006239",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Our camp is designed to empower young minds through a variety of dynamic activities, ensuring a summer filled with creativity, exploration, and personal development.</p>\n",
                "Prerequisite": "Must have completed Kindergarten",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "Tamela Weatherspoon",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 3,
                "Age": {
                    "Max": 12,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 60,
                "SpotsRemaining": 60,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-06-30T08:30:00-04:00",
                "EndDate": "2025-07-04T17:00:00-04:00",
                "ScheduleSummary": "Every day, 8:30 AM - 5:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-12",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 54747,
                        "Type": "Children",
                        "Name": "CP-CBC-ChildForm-2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=xrVzqQJ",
                "PictureUrl": "https://b1b66649035b243e84bc-243a7cf3ded34917ffdc8230ba8af30b.ssl.cf2.rackcdn.com//f8760a4a-cfc0-45d2-bb49-1dfafffb8b36_Screenshot_2025_05_07_144821.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "08:30:00",
                            "EndTime": "17:00:00",
                            "StartDate": "2025-06-30T00:00:00",
                            "EndDate": "2025-07-04T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-04T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [],
                            "RecurrenceUnitType": "day",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2179681,
                                "Name": "Charles Black Center"
                            }
                        ]
                    }
                ],
                "Id": 6006240,
                "Name": "All Stars Summer Camp - Week 3",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5843703,
                "CategoryName": "Charles Black Community Center",
                "SubCategoryId": 6006233,
                "SubCategoryName": "All Stars Summer Camp ",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/6006240",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Our camp is designed to empower young minds through a variety of dynamic activities, ensuring a summer filled with creativity, exploration, and personal development.</p>\n",
                "Prerequisite": "Must have completed Kindergarten",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "Tamela Weatherspoon",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 4,
                "Age": {
                    "Max": 12,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 60,
                "SpotsRemaining": 60,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-07-07T08:30:00-04:00",
                "EndDate": "2025-07-11T17:00:00-04:00",
                "ScheduleSummary": "Every day, 8:30 AM - 5:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-12",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 54747,
                        "Type": "Children",
                        "Name": "CP-CBC-ChildForm-2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=bz8G0RG",
                "PictureUrl": "https://8194c56e40300229278f-f14888355d33ddfa61d3ce2893e178c8.ssl.cf2.rackcdn.com//be5a70f4-da28-444b-aef9-8eef58f959ed_Screenshot_2025_05_07_144821.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "08:30:00",
                            "EndTime": "17:00:00",
                            "StartDate": "2025-07-07T00:00:00",
                            "EndDate": "2025-07-11T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-11T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [],
                            "RecurrenceUnitType": "day",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2179681,
                                "Name": "Charles Black Center"
                            }
                        ]
                    }
                ],
                "Id": 6006246,
                "Name": "All Stars Summer Camp - Week 4",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5843703,
                "CategoryName": "Charles Black Community Center",
                "SubCategoryId": 6006233,
                "SubCategoryName": "All Stars Summer Camp ",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/6006246",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Our camp is designed to empower young minds through a variety of dynamic activities, ensuring a summer filled with creativity, exploration, and personal development.</p>\n",
                "Prerequisite": "Must have completed Kindergarten",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "Tamela Weatherspoon",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 5,
                "Age": {
                    "Max": 12,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 60,
                "SpotsRemaining": 60,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-07-14T08:30:00-04:00",
                "EndDate": "2025-07-18T17:00:00-04:00",
                "ScheduleSummary": "Every day, 8:30 AM - 5:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-12",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 54747,
                        "Type": "Children",
                        "Name": "CP-CBC-ChildForm-2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yGMWGgV",
                "PictureUrl": "https://62b4cbd4ceb7ff7d34a5-a2fb0da17b2dc94679e024fce8457032.ssl.cf2.rackcdn.com//6cbc93ad-99f4-43fd-a0fc-014221ed2b38_Screenshot_2025_05_07_144821.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "08:30:00",
                            "EndTime": "17:00:00",
                            "StartDate": "2025-07-14T00:00:00",
                            "EndDate": "2025-07-18T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-18T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [],
                            "RecurrenceUnitType": "day",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2179681,
                                "Name": "Charles Black Center"
                            }
                        ]
                    }
                ],
                "Id": 6006254,
                "Name": "All Stars Summer Camp - Week 5",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5843703,
                "CategoryName": "Charles Black Community Center",
                "SubCategoryId": 6006233,
                "SubCategoryName": "All Stars Summer Camp ",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/6006254",
                "Status": "Normal"
            },
            {
                "Tags": [],
                "Description": "<p>Our camp is designed to empower young minds through a variety of dynamic activities, ensuring a summer filled with creativity, exploration, and personal development.</p>\n",
                "Prerequisite": "Must have completed Kindergarten",
                "Note": null,
                "ThirdPartyUrl": null,
                "AdditionalInformation": "",
                "ResponsibleName": "Tamela Weatherspoon",
                "Price": 55,
                "DropInPrice": 0,
                "DisplayOrder": 6,
                "Age": {
                    "Max": 12,
                    "Min": 6,
                    "Months": false
                },
                "MaxAttendance": 60,
                "SpotsRemaining": 60,
                "SpotsReserved": 0,
                "NumberOfOccurrences": 5,
                "StartDate": "2025-07-21T08:30:00-04:00",
                "EndDate": "2025-07-25T17:00:00-04:00",
                "ScheduleSummary": "Every day, 8:30 AM - 5:00 PM",
                "HasSessionEnabled": true,
                "HasDropInEnabled": false,
                "HasWaitListEnabled": true,
                "AgeSummary": "6-12",
                "Keywords": [],
                "Groups": [],
                "OrganizationId": 17892,
                "RegistrationPeriods": [],
                "LocationLabel": "",
                "Forms": [
                    {
                        "Id": 53495,
                        "Type": "Adult",
                        "Name": "Default adult form"
                    },
                    {
                        "Id": 54747,
                        "Type": "Children",
                        "Name": "CP-CBC-ChildForm-2025"
                    }
                ],
                "SecretUrl": "https://app.amilia.com/store/en/sbvpa/api/Activity/Detail?activityId=yP0D2rq",
                "PictureUrl": "https://9cfacf6835b2adb01b54-4a74cd85388b0102bfe291b5010303b0.ssl.cf2.rackcdn.com//61755895-16d2-4216-9b03-b9b3cc13da57_Screenshot_2025_05_07_144821.png",
                "IsTeamRegistration": false,
                "Schedules": [
                    {
                        "TimePeriod": {
                            "StartTime": "08:30:00",
                            "EndTime": "17:00:00",
                            "StartDate": "2025-07-21T00:00:00",
                            "EndDate": "2025-07-25T00:00:00",
                            "NumberOfOccurence": null,
                            "RecurrenceEndDate": "2025-07-25T00:00:00",
                            "TimeZone": "US Eastern Standard Time",
                            "TimePeriodType": "RepeatUntilEndDate",
                            "Days": [],
                            "RecurrenceUnitType": "day",
                            "MonthType": null
                        },
                        "Staff": [],
                        "Locations": [
                            {
                                "Id": 2179681,
                                "Name": "Charles Black Center"
                            }
                        ]
                    }
                ],
                "Id": 6006257,
                "Name": "All Stars Summer Camp - Week 6",
                "ProgramId": 114057,
                "ProgramName": "Day Camps Summer 2025",
                "CategoryId": 5843703,
                "CategoryName": "Charles Black Community Center",
                "SubCategoryId": 6006233,
                "SubCategoryName": "All Stars Summer Camp ",
                "Url": "https://app.amilia.com/store/en/sbvpa/shop/activities/6006257",
                "Status": "Normal"
            }
        ]



        'schema'          => [
				'type' 		=> 'string', 
				'default' 	=> ''
			],
            update_callback => null


            register_meta(
                'post', 
                'amilia_id', 
                [
                    'object_subtype' => 'activities', 
                    'type' => 'string', 
                    'single' => true,
                    'default' => '', 
                    'show_in_rest' => true
                ]
                );


                function add_amilia_id_endpoint() {
                    register_rest_route( 
                        'myplugin/v1', 
                        '/author/(?P<id>\d+)', 
                        [
                            'methods' =>
                        ]
                        'methods' => 'GET',
                        'callback' => 'my_awesome_func',
                    ));
                }


                function flush_rest_api_cache() {
                    wp_cache_flush();
                }
                add_action('save_post', 'flush_rest_api_cache');


                 // Finds new activities to add
    for (const amItem of amObj) {
        const exists = await new Promise((resolve) => {
            for (const wpItem of wpObj) {
                if (amItem.Id == wpItem.amilia_id) {
                    resolve(true); 
                }
            }

            resolve(false); 
        }); 

        if (!exists) objPost.push(amItem); 
    }
