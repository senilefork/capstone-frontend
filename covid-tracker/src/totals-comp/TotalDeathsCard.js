
const TotalDeathsCard = ({ totalData }) =>{
    return(
        <div className="total-card">
        <p className="totals-header">Total Deaths</p>
        <p className="totals" style={{color: "white"}}>{totalData}</p>
        </div>
    )   
}

export default TotalDeathsCard;