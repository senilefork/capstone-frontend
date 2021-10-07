import CovidTrackerApi from "../covidApi";
import { useEffect, useState, useContext } from "react";
import StatesCovidDataContext from "../context/StatesCovidDataContext";
import "./StatesList.css"
import { v4 as uuidv4 } from 'uuid';

const StatesList = () =>{
    const { setCurrentState } = useContext(StatesCovidDataContext)
    const [statesData, setStatesData] = useState(null);
    
    useEffect(() =>{
        async function getStatesData(){
            const data = await CovidTrackerApi.getAllUSDataPerState();
            setStatesData(data);
        }
        getStatesData();
    },[]);

    const handleClick = (e) => {
        const state = e.target.id;
        setCurrentState(state)
    }
    
    if(!statesData) return <h1>Loading...</h1>
    statesData.sort((a,b) => b.cases - a.cases)
    return(
        <div id="us-list-box-div">
          <h4>Confirmed Cases by State</h4>
          {statesData.map(s =>(
              <div key={uuidv4()} className="state-div">
                <p className="states-cases-p">{s.cases} confirmed</p>
                <p id={s.state.toLowerCase()} onClick={handleClick}>{s.state}</p>
                <hr/>
              </div>
          ))}
        </div>
    )
}

export default StatesList;