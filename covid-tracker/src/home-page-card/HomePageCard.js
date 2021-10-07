import { useEffect, useState } from "react";
import "./HomePageCard.css";
import CovidDataContext from "../context/CovidDataContext";
import CovidTrackerApi from "../covidApi";
import InnerCard1 from "./InnerCard1";
import InnerCard2 from "./InnerCard2";
import InnerCard3 from "./InnerCard3";
import SiteNav from '../site-nav/SiteNav';

const HomePageCard = () =>{
   
   const [globalData, setGlobalData] = useState({}); 
   const [globalHistoricalData, setGlobalHistoricalData] = useState({});
  
   useEffect(() =>{
     async function getGlobalCovidData(){
         const data = await CovidTrackerApi.getGlobalData();
         setGlobalData(data);
     }

     async function getGlobalHistoricalData() {
       const data = await CovidTrackerApi.getGlobalHistorical(365);
       setGlobalHistoricalData(data);
     }

     getGlobalCovidData();
     getGlobalHistoricalData();

   }, []);

   if(Object.keys(globalData).length === 0 || Object.keys(globalHistoricalData).length === 0 ) return <p>Loading...</p>

   return(
       <div>
       <SiteNav />
       <div className="home-page-container">
         <CovidDataContext.Provider value={{globalCovidData: globalData, setGlobalData,   globalHistoricalData, setGlobalHistoricalData}}>  
           <InnerCard1 />
           <InnerCard2 />
           <InnerCard3 />
         </CovidDataContext.Provider>
       </div>
       </div>
   )
};

export default HomePageCard;