import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { geoMercator, geoEqualEarth, geoPath, zoom } from "d3";
import './Marks.css'


const Marks = ({ mapPathData, coordData }) =>{
   let x = 380;
   let y = 300;
   const projection = geoMercator().translate([x,y]).scale(170);  
   const path = geoPath(projection);

   return(
         <React.Fragment>
         <g >
           {mapPathData.countries.features.map(feature => (
               <path className="country" key={uuidv4()} d={path(feature)} />
               
              ))}
              <path className="country-interior" d={path(mapPathData.interiors)}/>
          </g>
          <g>
           {coordData.map(d => {
               const [x,y] = projection([d.long, d.lat]);
               return <circle key={uuidv4()} style={{fill: "rgba(255, 0, 0, 0.6)"}} cx={x} cy={y} r= {Math.sqrt(d.cases)*.007} />
           })}
         </g>
      
         </React.Fragment>
       
       )
}

export default Marks;