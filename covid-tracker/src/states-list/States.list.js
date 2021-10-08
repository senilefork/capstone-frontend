import CovidTrackerApi from "../covidApi";
import { useEffect, useState, useContext } from "react";
import StatesCovidDataContext from "../context/StatesCovidDataContext";
import "./StatesList.css"
import { v4 as uuidv4 } from 'uuid';
//component that renders list of states
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

    //handleClick that changes currentState and triggers a re-render of charts on the right
    const handleClick = (e) => {
        const state = e.target.id;
        setCurrentState(state)
    }
    
    if(!statesData) return <h1 style={{color:"white"}}>Loading...</h1>
    statesData.sort((a,b) => b.cases - a.cases)
    return(
        <div id="us-list-box-div">
          <h4>Confirmed Cases by State</h4>
          {statesData.map(s =>(
              <div key={uuidv4()} className="state-div">
                <p className="states-cases-p">{s.cases} confirmed</p>
                <p className="state" id={s.state.toLowerCase()} onClick={handleClick}>{s.state}</p>
                <hr/>
              </div>
          ))}
        </div>
    )
}

export default StatesList;