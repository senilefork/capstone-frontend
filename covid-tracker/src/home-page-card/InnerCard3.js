import { useContext } from "react";
import GraphCard from "../graph-card/GraphCard";
import CovidDataContext from "../context/CovidDataContext"; 

//Right most column, renders 3 bar charts using historical data
const InnerCard3 = () =>{

  const { globalHistoricalData } = useContext(CovidDataContext);
  const data = globalHistoricalData;
  console.log("GLOBAL HISTORICAL", data)
    return(
        <div id="col-3">
          <GraphCard data={data.cases} dataType="cases" color="red" />
          <GraphCard data={data.deaths} dataType="deaths" color="white"/>
          <GraphCard id="bottom-graph-card" data={data.recovered} dataType="recovered" color="rgb(99,245,66)"/>
        </div>
    )
}

export default InnerCard3;