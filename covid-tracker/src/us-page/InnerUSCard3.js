import GraphCard from "../graph-card/GraphCard";
import VaxLineChart from "../line-charts/VaxLineChart";
import PercentCard from "../percent-card/PercentCard";
import ErrorCard from "../line-charts/ErrorCard";
import State from "../state/State";
import { useContext } from "react";
import StatesCovidDataContext from "../context/StatesCovidDataContext";

const InnerUSCard3 = ({ currentState }) => {
    const { casesObject } = useContext(StatesCovidDataContext);
    return(
        <div id="us-col-3">
          <State currentState={currentState} />
          <GraphCard  data={casesObject} dataType="cases" color="red" />
          { currentState === "new york" ? <ErrorCard /> : <VaxLineChart currentState={currentState}/> }
          <PercentCard currentState={currentState} />
        </div>
    )
}

export default InnerUSCard3;

