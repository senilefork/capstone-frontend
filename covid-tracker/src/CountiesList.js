import CovidTrackerApi from "./covidApi";
import { useState, useEffect } from "react";

const CountiesList = () => {
    const [counties, setCounties] = useState(null);

    useEffect(() =>{
      async function getCountiesData() {
          let data = await CovidTrackerApi.getUSCounties();
          setCounties(data);
      }
      getCountiesData()
    }, [])

    if(!counties) return <h1>Loading...</h1>

    return(

        <div>
          {counties.map(c => (
              <p>{c}</p>
          ))}
        </div>
    )
};

export default CountiesList;