import { useEffect, useState } from "react";
import "./HomePageCard.css";
import CovidDataContext from "../context/CovidDataContext";
import CovidTrackerApi from "../covidApi";
import InnerCard1 from "./InnerCard1";
import InnerCard2 from "./InnerCard2";
import InnerCard3 from "./InnerCard3";

const HomePageCard = () =>{
   
   const [countriesData, setCountriesData] = useState(null);
   const [globalData, setGlobalData] = useState(null); 
   console.log(globalData)
   useEffect(() =>{
     async function getCountriesCovidData(){
        //Get country, cases, deaths lat and long from api and store as objs in array
        const apiData = await CovidTrackerApi.getCountriesData(); 
        const countriesCovidAndCoorData = apiData.map(c => (
          {country: c.country, lat: c.countryInfo.lat, long: c.countryInfo.long, cases: c.cases, deaths: c.deaths}
      ));
      setCountriesData(countriesCovidAndCoorData);
     }

     async function getGlobalCovidData(){
         const apiData = await CovidTrackerApi.getGlobalData();
         setGlobalData(apiData);
     }

     getCountriesCovidData();
     getGlobalCovidData();

   }, [])

   if(!countriesData || !globalData) return <p>Loading...</p>

   return(
       <div className="home-page-container">
        <CovidDataContext.Provider value={{countriesCovidData: countriesData, globalCovidData: globalData }}>
         <InnerCard1 />
         <InnerCard2 />
         <InnerCard3 />
        </CovidDataContext.Provider>
       </div>
   )
};

export default HomePageCard;