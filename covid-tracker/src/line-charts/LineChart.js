import { scaleBand, scaleTime, scaleLinear, max, min, line, timeParse, extent } from 'd3';

const LineChart = ({ data }) => {

    const width = 380;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 20, left: 80 };
    
    const xValue = d => d.dates;
    const yValue = d => d.data;
    const parseDate = timeParse('%m/%d/%y');

    let day1;
    let day30;
    let index = 0;

    let dataArray = [];
    for(let key in data.timeline){
      if(index === 0) day1 = key;
      if(index ===29) day30 = key;
      dataArray.push({ dates: parseDate(key), data: data.timeline[key]})
      index++  
    }

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xScale = scaleTime()
    .domain(extent(dataArray, xValue))
    .range([0, innerWidth]);
    console.log(dataArray, xScale.domain())

    const maxVal = max(dataArray, (d) => d.data);
    const minVal = min(dataArray, (d) => d.data);

    const yScale = scaleLinear()
    .domain([minVal, maxVal])
    .range([innerHeight, 0])

    const lineGenerator = line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)));

    return(     
           <svg width="auto" height="auto">
             <g transform={`translate(${margin.left},${margin.top})`}>
             {yScale.ticks(6).map(tickValue => (
              <text
                x={-80}
                y={yScale(tickValue) }
                style={{fill: "rgb(107,107,107)"}}
                >{tickValue}</text>
            ))}
            <path fill="none" stroke="rgb(66, 105, 245)"  strokeWidth="3.2px" d={lineGenerator  (dataArray)} />
            <line stroke="rgb(81, 81, 81)" strokeWidth="2.5px" x1={0} x2={innerWidth} y1=  {innerHeight} y2={innerHeight} />
            <text y={innerHeight + margin.bottom} style={{fill: "rgb(126, 126, 126)"}}>Date range:{day1}-{day30}</text>
             </g>
           </svg> 
    )
}

export default LineChart;