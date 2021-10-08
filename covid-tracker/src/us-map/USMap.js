import { useEffect, useState } from "react";
import { json, extent, interpolateYlOrRd, scaleSequential, max } from 'd3';
import AlbersMarks from "./AlbersMarks";
import CovidTrackerApi from "../covidApi";
import { v4 as uuidv4 } from 'uuid';
//reference: https://vizhub.com/curran/d5ad96d1fe8148bd827a25230cc0f083

/*US-MAP component*/
const USMap = () => {

  //url for geoJson for us map 
    const geoJsonUrl = 'https://gist.githubusercontent.com/almccon/798feae1c276739f819a2f2b4784a728/raw/edcfa762dc9bb43e08a28fc58cc2a7e58847fe2f/us_states.geojson';

    const [mapPathData, setMapPathData] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
       async function getMapPathData() {
         //get map path data and set it
          const geoJson = await json(geoJsonUrl);
          setMapPathData(geoJson);
       }
       //get us covid data and set it
       async function getUSTotalsData() {
           const data = await CovidTrackerApi.getAllUSDataPerState();
           setData(data);
       }
       getMapPathData();
       getUSTotalsData();
    }, [])

    if(!mapPathData || !data) return <h1 style={{color: "white"}}>Loading...</h1>

    const dataMap = new Map();
    const percentArray = [];
    //loops over data and sets key value pair of state and percentage of cases to population { New York => 12... } and also sets an array of percent values for d3.max method
    data.forEach(d => {
      const state = d.state;
      const percent = Math.floor(d.cases/d.population * 100)
      if(d.population !== 0){
        dataMap.set(state, percent)
        percentArray.push(percent)
      } else {
        dataMap.set(state, 0);
        percentArray.push(0);
      }
    })   
    //set color scale with domin from 0 to whatever the max of percentArray is
    const colorScale = scaleSequential(interpolateYlOrRd).domain([0, max(percentArray)])
    const arr = []
    const ex = extent(percentArray)

    //make an array of percent values for use in  color legend
    for(let i = ex[0]; i <= ex[1]; i++){
      arr.push(i)
    }
    
    return(
        <div id="us-map-container">
          <svg width="auto" height="auto">
            <AlbersMarks mapPathData={mapPathData} dataMap={dataMap} colorScale={colorScale} />
          </svg>
          <div id="color-legend">
          {arr.map((e) =>{
            return(<div key={uuidv4()} style={{backgroundColor: colorScale(e), width: "auto"}}>{e}%</div>)
          })}
          </div>
        </div>
    )
}

export default USMap;