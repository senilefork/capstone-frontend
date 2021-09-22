import TotalDeathsCard from "./TotalDeathsCard";
import TodayDeathsCard from "./TodayDeathsCard";

const TotalsColumn2 = ({ totalData, todayData }) =>{
    return(
        <div className="totals-column-2">
          <TotalDeathsCard totalData={totalData} />
          <TodayDeathsCard todayData={todayData}/>
        </div>
    )
}

export default TotalsColumn2;