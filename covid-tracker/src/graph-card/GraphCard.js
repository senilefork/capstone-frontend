import { scaleBand, scaleLinear, max, min } from 'd3';
import { v4 as uuidv4 } from 'uuid';

/* This component is used to render a bar chart.
The structure of this component was inspired by this example https://vizhub.com/curran/32dfc8d2393844c6a5b9d199d9a35946 */

const GraphCard = ({ data, dataType, color }) =>{
  //size for svg element and d3 margin convention used to make space for axis
  const width = 380;
  const height = 200;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };

  //takes the data passed and creates an array of objects {dates:1/1/2020, data: some number}
  let dataArray = [];
  for(let key in data){
    dataArray.push({ dates: key, data: data[key]})    
  }
  
  //the graph itself will render within these boundaries
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  /*d3.scaleBand determines the x and y positions as well as size of bands represented below as svg rectangles. The domain is the total dates in dataArray and fits into a range starting at 100px and ending at innerWidth */
  const xScale = scaleBand()
    .domain(dataArray.map((d) => d.dates))
    .range([100, innerWidth]);

  //get min and max values of data values
  const maxVal = max(dataArray, (d) => d.data);
  const minVal = min(dataArray, (d) => d.data);

  /*The y domain starts at 0 and goes up to maxVal + minVal. I wanted the y scale to scale slightly further than the current max value and found that this formula works nicely. The y range starts at the bottom of the graph and goes up to 0 */
  const yScale = scaleLinear()
  .domain([0, maxVal + minVal])
  .nice()
  .range([innerHeight, 0])

  //let react render elements and use the d3 calculations from above for positioning
  return(
      <div id="graph-card" >
        <div id="graph-card-header">
          <h4>
            Total {dataType} 365 Days
          </h4>
        </div>
       
          <svg height="auto" width="auto" >
            {dataArray.map((d) => (
              <rect
               key={uuidv4()} 
               x={xScale(d.dates)}
               y={yScale(d.data)}
               width={xScale.bandwidth()}
               height={innerHeight - yScale(d.data)}
               style={{fill: color}}
               />
              ))}
              {yScale.ticks(6).map(tickValue => (
                <text
                  key={uuidv4()} 
                  x={0}
                  y={yScale(tickValue) }
                  style={{fill: "rgb(107,107,107)"}}
                  >{tickValue}</text>
              ))}
              <text x={100} y={innerHeight + margin.bottom} style={{fill: "rgb(126, 126, 126)"}}>Date range: {dataArray[0].dates} - {dataArray[dataArray.length-1].dates}</text>
           </svg>
       
      </div>
  )
}

export default GraphCard