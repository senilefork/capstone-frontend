
const TodayCasesCard = ({ todayData }) =>{
    return(
        <div className="today-card">
          <p className="totals-header">Cases Today</p>
          <p className="totals" style={{color: "red"}}>{todayData}</p>
        </div>
    )
}

export default TodayCasesCard;