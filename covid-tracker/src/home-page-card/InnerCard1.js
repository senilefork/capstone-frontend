import DescriptionBox from "../description-comp/DescriptionBox";
import ListBox from "../list-comp/ListBox";

//left most div, renders description box and listbox
const InnerCard1 = () =>{

    return(
        <div id="col-1">
          <DescriptionBox />
          <ListBox />
        </div>
    )
}

export default InnerCard1;