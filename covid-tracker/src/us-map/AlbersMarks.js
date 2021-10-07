import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { geoAlbersUsa, geoPath } from "d3";

const AlbersMarks = ({ mapPathData, dataMap, colorScale }) => {
    let x = 420;
    let y = 300;
    const projection = geoAlbersUsa().translate([x,y]).scale(1090);  
    const path = geoPath(projection);

    return(
        <React.Fragment>
           <g>
            {mapPathData.features.map(function(feature){
                const state = feature.properties.name;
                const percent = dataMap.get(state)       
               return(<path id={uuidv4()} key={uuidv4()} d={path(feature)} fill={colorScale(percent)}/>)
            })}           
           </g>     
         </React.Fragment>
    )
}

export default AlbersMarks;
  