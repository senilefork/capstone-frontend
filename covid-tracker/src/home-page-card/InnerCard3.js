import { useState, useEffect } from "react";
import CovidTrackerApi from "../covidApi";
import GraphCard from "../graph-card/GraphCard";


const InnerCard3 = () =>{

  const [data, setData] = useState(null);
  //const[test, setTest] = useState(null);
  //console.log(data.timeline.cases)
  useEffect(() =>{
    async function getData(){
      const d = await CovidTrackerApi.getGlobalHistorical(365);
      const t = await CovidTrackerApi.getHistoricalCountry("Iran",365);
      setData(d);
    }
    getData();
  }, []);

  if(!data) return <h1>Loading...</h1>
  if(data.timeline) setData(data.timeline)


    return(
        <div id="col-3">
          <GraphCard data={data.cases} dataType="cases" color="red" />
          <GraphCard data={data.deaths} dataType="deaths" color="white"/>
          <GraphCard id="bottom-graph-card" data={data.recovered} dataType="recovered" color="rgb(99,245,66)"/>
        </div>
    )
}

export default InnerCard3;