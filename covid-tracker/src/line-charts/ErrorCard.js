/*This component was made as a last ditch effor to handle an edge case that I noticed last minute. It is used in place of the line chart used on us-page for New York which does not have vaccine data available*/
const ErrorCard = () => {
    return(
        <div id="graph-card">
         <div id="error-div">
           <h1>No current vaccine data</h1>
         </div>
        </div>
    )
}

export default ErrorCard;