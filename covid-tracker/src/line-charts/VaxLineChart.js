import { useState, useEffect } from "react";
import CovidTrackerApi from "../covidApi";
import LineChart from "./LineChart";

//This component grabs data for LineChart and renders it
const VaxLineChart = ({ currentState }) =>{

    const [data, setData] = useState(null);

    console.log("vax data",data)
    
    useEffect(() => {
        async function getStateVaxData(){
            const vaxData = await CovidTrackerApi.getVaccineDataUSStateThirtyDays(currentState);
            setData(vaxData);
        };
        getStateVaxData();
    },[currentState])

    if(!data) return <h1 style={{color:"white"}}>Loading...</h1>

    return(
        <div id="graph-card">
        <div id="graph-card-header">
        <h4>
          30 Day Vaccination Totals
        </h4>
      </div>
          <LineChart data={data} />
        </div>
    )
}

export default VaxLineChart;