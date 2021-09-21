import TotalsCard from "./TotalsCard";
import ThirtyDayTotalCard from "./ThirtyDayTotalsCard";

const TotalsColumn= () =>{
    return(
        <div className="totals-column">
          <TotalsCard />
          <ThirtyDayTotalCard />
        </div>
    )
}

export default TotalsColumn;