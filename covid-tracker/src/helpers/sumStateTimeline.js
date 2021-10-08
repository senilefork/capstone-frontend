/*This function was written specifically to sum the total number of covid cases of a given state. Because totals are only reported at the county level this function loops through time series data for each county and creates a new time series object with state totals*/
function sumStateTimeline(array) {
    let dates = [];
    let cases = [];
    let firstCounty = array[0].county;
    let casesObj = {}
    for(let key in array[0].timeline.cases){
      dates.push(key)
      cases.push(array[0].timeline.cases[key])
    }
    
    //loop through array of county objects
    for(let i = 0; i < array.length; i++){
      let index = 0;
      if(array[i].county === firstCounty) continue
      else{ 
          for(let key in array[i].timeline.cases){
            cases[index] += array[i].timeline.cases[key];
            index++
          }        
        } 
      }
        
    for(let i = 0; i < dates.length; i++){
        casesObj[dates[i]] = cases[i]
    }
    return casesObj;
};

module.exports = sumStateTimeline;