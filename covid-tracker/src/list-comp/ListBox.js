import { useContext, useEffect, useState } from "react";
import CovidDataContext from "../context/CovidDataContext";
import CovidTrackerApi from "../covidApi";
import { v4 as uuidv4 } from 'uuid';
import "./ListBox.css";

/*This component renders the list of countries seen on the homepage. */
const ListBox = () =>{
    const [countriesData, setCountriesData] = useState(null);
    const { setGlobalData, setGlobalHistoricalData } = useContext(CovidDataContext);

    useEffect(() =>{
      async function getCountriesCovidData(){
         //Get country, cases, deaths lat and long from api and store as objs in array
         const apiData = await CovidTrackerApi.getCountriesData(); 
         const countriesCovidAndCoorData = apiData.map(c => (
           {country: c.country, lat: c.countryInfo.lat, long: c.countryInfo.long, cases: c.cases, deaths: c.deaths, recovered: c.recovered, todayCases: c.todayCases, todayDeaths: c.todayDeaths, todayRecovered: c.todayRecovered,  flag: c.countryInfo.flag}
       ));
       setCountriesData(countriesCovidAndCoorData);
      }
      getCountriesCovidData();
    }, []);

    //when a user clicks a country the global and historical data states changes and components re-render
    async function handleClick(e){
      const country = e.target.id;
      const data = await CovidTrackerApi.getCountryData(country);
      setGlobalData({cases: data.cases, deaths: data.deaths, recovered: data.recovered, todayCases: data.todayCases, todayDeaths: data.todayDeaths, todayRecovered: data.todayRecovered});
      let timeData = await CovidTrackerApi.getHistoricalCountry(country, 365);
      timeData = timeData.timeline;
      setGlobalHistoricalData({cases: timeData.cases, deaths: timeData.deaths, recovered: timeData.recovered});
    }

    if(!countriesData) return <h1 style={{color: "white"}}>Loading</h1>
    return(
        <div id="list-box-div">
          <div id="list-box-heading">
             <h4>Cases | Deaths by Country</h4>
          </div>
          {countriesData.map(c => (
            <div className="country-div" key={uuidv4()}>
              <div className="country-header">
                <p className="country-p" id={c.country} onClick={handleClick}>{c.country}</p>
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