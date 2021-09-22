import TotalRecoveredCard from "./TotalRecoveredCard";
import TodayRecoveredCard from "./TodayRecoveredCard";

const TotalsColumn3 = ({ totalData, todayData }) =>{
    return(
        <div className="totals-column-3">
          <TotalRecoveredCard totalData={totalData} />
          <TodayRecoveredCard todayData={todayData} />
        </div>
    )
}

export default TotalsColumn3;