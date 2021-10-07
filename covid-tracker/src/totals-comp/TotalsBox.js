import { useContext, useState } from "react";
import CovidDataContext from "../context/CovidDataContext";
import TotalsColumn1 from "./TotalsColumn1";
import TotalsColumn2 from "./TotalsColumn2";
import TotalsColumn3 from "./TotalsColumn3";


const TotalsBox = () =>{
    const { globalCovidData } = useContext(CovidDataContext); 
   return(
       <div id="totals-box">
          <TotalsColumn1 
            totalData={globalCovidData.cases}
            todayData={globalCovidData.todayCases} />
          <TotalsColumn2 
            totalData={globalCovidData.deaths}
            todayData={globalCovidData.todayDeaths} />
          <TotalsColumn3 
            totalData={globalCovidData.recovered}
            todayData={globalCovidData.todayRecovered} />
       </div>
   )
}

export default TotalsBox;