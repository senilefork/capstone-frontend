import { scaleBand, scaleLinear, max, min } from 'd3';

const GraphCard = ({ data, dataType, color }) =>{
  const width = 380;
  const height = 200;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };

  let dataArray = [];
  for(let key in data){
    dataArray.push({ dates: key, data: data[key]})    
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = scaleBand()
    .domain(dataArray.map((d) => d.dates))
    .range([100, innerWidth]);

  const maxVal = max(dataArray, (d) => d.data);
  const minVal = min(dataArray, (d) => d.data);

  const yScale = scaleLinear()
  .domain([0, maxVal + minVal])
  .nice()
  .range([innerHeight, 0])

  return(
      <div id="graph-card" style={{display: "flex", flexDirection: "column"}}>
        <div id="graph-card-header">
          <h4>
            Total {dataType} 365 Days
          </h4>
        </div>
       
          <svg height="auto" width="auto">
            {dataArray.map((d) => (
              <rect 
               x={xScale(d.dates)}
               y={yScale(d.data)}
               width={xScale.bandwidth()}
               height={innerHeight - yScale(d.data)}
               style={{fill: color}}
               />
              ))}
              {yScale.ticks(6).map(tickValue => (
                <text
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