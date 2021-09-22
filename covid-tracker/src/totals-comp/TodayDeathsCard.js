
const TodayDeathsCard = ({ todayData }) =>{
    return(
        <div className="today-card">
        <p className="totals-header">Deaths Today</p>
        <p className="totals" style={{color: "white"}}>{todayData}</p>
        </div>
    )
}

export default TodayDeathsCard;