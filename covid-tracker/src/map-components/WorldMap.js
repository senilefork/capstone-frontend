import React, { useState, useEffect } from "react";
import { json, zoom } from "d3";
import * as topojson from "topojson-client";
import Marks from "./Marks";
import CovidTrackerApi from "../covidApi";

const WorldMap = () =>{
    //url contains topojson data we will convert to geojson for map points
   const jsonUrl = `https://unpkg.com/world-atlas@2.0.2/countries-50m.json`;

   //store map data here
   const [mapPathData, setMapPathData] = useState(null);
   //country coordinate data here
   const [coordData, setCoordData] = useState(null);

   useEffect(() => {
      async function getMapAndCoordInfo(){
        //Get topojson from url 
        const topojsonData = await json(jsonUrl);
        //topojsonData.objects.countries has polygon data for each country
        const { countries } = topojsonData.objects;
        setMapPathData({
            //topojson.feature returns returns the geojson feature for specified obj
            countries: topojson.feature(topojsonData, countries),
            //topojson.mesh Returns the GeoJSON MultiLineString geometry object representing the mesh for the specified object, used for rendering edges that are shared
            interiors: topojson.mesh(topojsonData, countries, (a,b) => a!== b)
        });

        //Get country, lat and long from api and store as objs in array
        const apiData = await CovidTrackerApi.getCountriesData();       
        const countriesAndCoordinates = apiData.map(c => (
               {country: c.country, lat: c.countryInfo.lat, long: c.countryInfo.long, cases: c.cases}
           ))
        setCoordData(countriesAndCoordinates);   
      }
      getMapAndCoordInfo();
   }, []);

   if(!mapPathData || !coordData) return(<h1>Loading...</h1>)

   return (
     <div id="map-div">
        <svg className="map-body" width="auto" height="auto">
          <Marks mapPathData={mapPathData} coordData={coordData} />
        </svg>
     </div>
   );
}

export default WorldMap;