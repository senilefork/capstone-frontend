import TotalsBox from "../totals-comp/TotalsBox";
import WorldMap from "../map-components/WorldMap";

//Center column renders totals and world map
const InnerCard2 = () =>{
    return(
        <div id="col-2">
           <TotalsBox />
           <WorldMap />
        </div>
    )
}

export default InnerCard2;