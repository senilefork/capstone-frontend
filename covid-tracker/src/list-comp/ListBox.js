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
            <div className="country-div">
              <div className="country-header">
                <p className="country-p">{c.country}</p>
                <img src={c.flag} style={{height: "20px", width: "30px", marginTop: "8px"}}/>
              </div>
              <p className="totals-p">Total: {c.cases} | {c.deaths}</p>
              <p className="today-p">Today: {c.todayCases} | {c.todayDeaths}</p>
              <hr/>
            </div>
            ))}
        </div>
    )
};

export default ListBox;