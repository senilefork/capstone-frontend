import TotalCasesCard from "./TotalCasesCard";
import TodayCasesCard from "./TodayCasesCard";

const TotalsColumn1 = ({ totalData, todayData }) =>{
    return(
        <div className="totals-column-1">
          <TotalCasesCard totalData={totalData} />
          <TodayCasesCard todayData={todayData}/>
        </div>
    )
}

export default TotalsColumn1;