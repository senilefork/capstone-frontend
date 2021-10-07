
const InfoBox = () => {
    return(
        <div id="info-box">
        
         <p>The information on this page is derived from <a href="https://disease.sh/docs/#/">disease.sh</a> which pulls data from several APIs including <a href="https://www.worldometers.info/coronavirus/">worldometers.info</a> and <a href="https://www.raps.org/">raps.org</a> among others.</p>
         <br/>
         <p>Please note that the percentage calculation seen in the map above is calculated using total confirmed cases and total population of a given state. It does not take into account multiple infections and there is no adjustment made to the total population as a result of confirmed deaths from COVID-19. The calculations made can only be seen as a rough estimate made with the information available from the public resources listed above.</p>
         <br/>
         <p>Please also note that the information on this page may vary slightly from other publicly available data. Although the APIs that this data is pulled from is updated on a daily bases other resouces may update their data at a different time and this may cause a slight discrepancy in numbers between sources.</p>
         
        </div>
    )
}

export default InfoBox