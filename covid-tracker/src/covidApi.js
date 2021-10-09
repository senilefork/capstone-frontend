import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

class CovidTrackerApi {

  static token;
  /* method for making axios requests to our server  */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${CovidTrackerApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

/*----------------------Methods for Global Covid Data----------------------------*/

  /* Get global covid data from server */
  static async getGlobalData(){
    let res = await this.request('data/all');
    return res.data;
  }
  
  /* Get covid data per country */
  static async getCountriesData(){
    let res = await this.request('data/countries');
    return res.data;
  }
  
  /* Get covid data per country */
  static async getCountryData(country){
    let res = await this.request(`data/countries/${country}`);
    return res.data;
  }

  /* Get historical data per country*/
  static async getHistoricalCountry(country, days){
    let res = await this.request(`data/countries/${country}/${days}`);
    return res.data;
  }

  /* Get globals historical data: cases, deaths, recovered for last 30 days */
  static async getGlobalHistoricalThirtyDays(){
    let res = await this.request(`data/historical-all`);
    return res.data;
  }
  
  /* Get globals historical data: cases, deaths, recovered days specified*/
  static async getGlobalHistorical(days){
    let res = await this.request(`data/historical-all/${days}`);
    return res.data;
  }
  
  /* Get historical data: cases, deaths, recovered per country for last 30 days*/
  static async getHistoricalCountriesThiryDays(){
    let res = await this.request(`data/historical-countries`);
    return res.data;
  }
  
  /* Get historical data: cases, deaths, recovered per country # of days specified*/
  static async getHistoricalCountries(days){
    let res = await this.request(`data/historical-countries/${days}`);
    return res.data;
  }

/*-----------------------Methods for US Covid Data ------------------------------*/

/* Get cases, deaths (total and today), recovered, active, population each state*/
static async getAllUSDataPerState(){
  let res = await this.request(`data/us-states-all`);
  return res.data;
}

/* Get cases, deaths (total and today), recovered, active, population state specified */
static async getUSDataState(state){
  let res = await this.request(`data/us-states-all/${state}`);
  return res.data;
}

/* Get US counties available for querying */
static async getUSCounties(){
  let res = await this.request(`data/us-counties`);
  return res.data;
}

/* Get cases, deaths time line per county from state specified last 30 days*/
static async getHistoricalDataCountyThirtyDays(state){
  let res = await this.request(`data/us-counties/${state}`);
  return res.data;
}

/* Get cases, deaths time line per county from state specified, days specified */
static async getHistoricalDataCounty(state, days){
  let res = await this.request(`data/us-counties/${state}/${days}`);
  return res.data;
}

/*------------------------- Methods for Vaccine Data---------------------------*/

/* Global total vaccines given last 30 days */
static async getGlobalVaccineDataTotalThirtyDays(){
  let res = await this.request(`data/vaccine/global-total`);
  return res.data;
}

/*  Global total vaccines given # of days specified*/
static async getGlobalVaccineData(days){
  let res = await this.request(`data/vaccine/global-total/${days}`);
  return res.data;
}

/* Get time series vaccine coverage per country 30 days default*/
static async getVaccineDataCountriesThirtyDays(){
  let res = await this.request(`data/vaccine/countries`);
  return res.data;
}

/* Get time series vaccine coverage per country, days specified */
static async getVaccineDataCountries(days){
  let res = await this.request(`data/vaccine/countries/${days}`);
  return res.data;
}

/* Get time series vaccine coverage per country for last 30 days */
static async getVaccineDataCountryThirtyDays(country){
  let res = await this.request(`data/vaccine/country/${country}`);
  return res.data; 
}

/* Get  time series vaccine coverage per country specified for # of days specified */
static async getVaccineDataCountry(country, days){
  let res = await this.request(`data/vaccine/country/${country}/${days}`);
  return res.data; 
}

/* Get time series vaccine coverage per state, 30 days default*/
static async getVaccineDataUSStatesThirtyDays(){
  let res = await this.request(`data/vaccine/us-states`);
  return res.data;
}

/* Get time series vaccine coverage per state, # of days specified */
static async getVaccineDataUSStates(days){
  let res = await this.request(`data/vaccine/us-states/${days}`);
  return res.data;
}

/* Get //time series vaccine admins last 30 days per state specified */
static async getVaccineDataUSStateThirtyDays(state){
  let res = await this.request(`data/vaccine/us-state/${state}`);
  return res.data;
}

/* Get time series vaccine admins per state specified, # of days specified */
static async getVaccineDataUSState(state, days){
  let res = await this.request(`data/vaccine/us-state/${state}/${days}`);
  return res.data;
}

/*-------------------- Methods for Hospitalizations, ICU Capacity, Testing, etc IN US-------------------*/

/* Get comprehensive country wide data */
static async getCompData(){
  let res = await this.request(`data/comp-data/all`);
  return res.data;
}

/* Get comprehensive data for all US states*/
static async getCompDataStates(){
  let res = await this.request(`data/comp-data/states`);
  return res.data;
}

/* Get comprehensive per US state*/
static async getCompDataState(state){
  let res = await this.request(`data/comp-data/${state}`);
  return res.data;
}

/* time series per state specified start 2020-03-02 */
static async getCompTimeSeriesData(state){
  let res = await this.request(`data/comp-data/time-series/${state}`);
  return res.data;
}

}

export default CovidTrackerApi;