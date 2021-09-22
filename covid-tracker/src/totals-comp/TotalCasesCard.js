
const TotalCasesCard = ({ totalData}) =>{
       
   return(
       <div className="total-card">
       <p className="totals-header">Total Cases</p>
       <p className="totals" style={{color: "red"}}>{totalData}</p>
       </div>
   )
}

export default TotalCasesCard;