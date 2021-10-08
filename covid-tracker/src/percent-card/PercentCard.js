import { useEffect,useState } from "react";
import CovidTrackerApi from "../covidApi";

//component rendered in lower right corner of us-page
/*there is some logic in the component to handle a last minute edge case I noticed 
New York does not have any vaccine data available from the api that I use and so an error is thrown when a user clicks on new york in the states list.
I plan on revisiting this issue and creating a more dynamic solution to handle errors*/
const PercentCard = ({ currentState }) => {

    const [data, setData] = useState(null);
    const [vaxData, setVaxData] = useState(null);
    
    //pull and set vax data and state covid data
    useEffect(() =>{
        async function getStateData(){
            const d = await CovidTrackerApi.getUSDataState(currentState);
            if(currentState === "new york"){
            setVaxData("none")
            } else{
                const v = await CovidTrackerApi. getVaccineDataUSStateThirtyDays(currentState);
                setVaxData(v);
            }
            setData(d);
        }
        getStateData()
    },[currentState])

    if(!data || !vaxData) return <h1 style={{color: "white"}}>Loading...</h1>

    let vaxTotal;
    if(currentState === "new york") vaxTotal = "no data"

    
    else{
        for(let key in vaxData.timeline){
        vaxTotal = vaxData.timeline[key]
       }
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
          <p>Total Vaccine Doses Administered:{vaxTotal}</p>
          
        </div>
    )
}

export default PercentCard;

