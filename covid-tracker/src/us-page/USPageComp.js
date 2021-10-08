import { useEffect, useState } from "react";
import CovidTrackerApi from "../covidApi";
import SiteNav from "../site-nav/SiteNav";
import InnerUSCard1 from "./InnerUSCard1";
import InnerUSCard2 from "./InnerUSCard2";
import InnerUSCard3 from "./InnerUSCard3";
import sumStateTimeline from "../helpers/sumStateTimeline";
import StatesCovidDataContext from "../context/StatesCovidDataContext";
import "./US-Page.css";

const USPageComp = () => {

  const [historicalCountyData, setData] = useState();
  const [currentState, setCurrentState] = useState('california');

  useEffect(() =>{
    async function getData() {
      const d = await CovidTrackerApi.getHistoricalDataCounty(currentState, 365);
      setData(d);
    }
    getData()
  }, [currentState])

  if(!historicalCountyData) return <h1 stlye={{color: "white"}}>Loading...</h1>

  const casesObject = sumStateTimeline(historicalCountyData);

    return (
        <div>
          <div id="us-page-container">
           <StatesCovidDataContext.Provider value={{casesObject: casesObject, setCurrentState}} >
            <InnerUSCard1 />
            <InnerUSCard2 />
            <InnerUSCard3 currentState={currentState}/>
           </StatesCovidDataContext.Provider>
          </div>
        </div>
    )
}

export default USPageComp;
