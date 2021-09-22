
const TotalRecoveredCard = ({ totalData }) => {
    return(
        <div className="total-card">
          <p className="totals-header">Total Recovered</p>
          <p className="totals" style={{color: "rgb(99,245,66)"}}>{totalData}</p>
        </div>
    )  
}

export default TotalRecoveredCard;