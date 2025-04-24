
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
