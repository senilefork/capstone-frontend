import { useEffect,useState } from "react";
import CovidTrackerApi from "../covidApi";

const PercentCard = ({ currentState }) => {

    const [data, setData] = useState(null);
    const [vaxData, setVaxData] = useState(null);
    console.log(data)

    useEffect(() =>{
        async function getStateData(){
            const d = await CovidTrackerApi.getUSDataState(currentState);
            if(currentState !== "new york"){
                const v = await CovidTrackerApi. getVaccineDataUSStateThirtyDays(currentState)
                setVaxData(v);
            }
        
            setData(d);
            setVaxData("No data");
        }
        getStateData()
    },[currentState])

    if(!data || !vaxData) return <h1 style={{color: "white"}}>Loading...</h1>

    let vaxTotal = null;
    for(let key in vaxData.timeline){
        vaxTotal = vaxData.timeline[key]
    }
    return(
        <div id="state-totals-card">
          <div id="state-totals-header">
            <h4>{data.state} Population: {data.population}</h4>
          </div>
          <p>Total Cases: {data.cases}</p>
          <p>Cases Today: {data.todayCases}</p>
          <p>Total Deaths: {data.deaths}</p>
          <p>Deaths Today: {data.todayDeaths}</p>
          <p>Total Vaccine Doses Administered:{vaxTotal ? vaxTotal : vaxData}</p>

        </div>
    )
}

export default PercentCard;