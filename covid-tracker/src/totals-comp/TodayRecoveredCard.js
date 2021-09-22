
const TodayRecoveredCard = ({ todayData }) =>{
    return(
        <div className="today-card">
          <p className="totals-header">Recovered Today</p>
          <p className="totals" style={{color: "rgb(99,245,66)"}}>{todayData}</p>
        </div>
    )
}

export default TodayRecoveredCard;