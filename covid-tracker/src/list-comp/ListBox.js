import { useContext } from "react";
import CovidDataContext from "../context/CovidDataContext";
import "./ListBox.css";

const ListBox = () =>{
  const { countriesCovidData } = useContext(CovidDataContext);
    return(
        <div id="list-box-div">
          <div id="list-box-heading">
             <h4>Cases | Deaths by Country</h4>
          </div>
          {countriesCovidData.map(c => (
            <div id="country-div">
            <p id="country-p">{c.country}</p>
            <p>Total: {c.cases} | {c.deaths}</p>
            <p>30 Day:</p>
            </div>
            ))}
        </div>
    )
};

export default ListBox;