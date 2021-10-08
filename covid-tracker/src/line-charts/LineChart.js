import { scaleTime, scaleLinear, max, min, line, timeParse, extent } from 'd3';
/*This component was made with the help of this example: https://vizhub.com/curran/25aa65a6fe514b889f8365b0f7f26014?edit=files&file=LineChart.js */

const LineChart = ({ data }) => {
    //width and height for svg and d3 margin convention
    const width = 380;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 20, left: 80 };

    //these values will be used as x,y values in createLine() which executes d3.line
    const xValue = d => d.dates;
    const yValue = d => d.data;
    //function to parse our dates into d3 date format for use with scaleTime()
    const parseDate = timeParse('%m/%d/%y');

    //d3.scaleTime dates can't be rendered as strings so first grab the dates we want to render 
    let day1;
    let day30;
    let index = 0;

    //create an array of objects with date and data
    let dataArray = [];
    for(let key in data.timeline){
      if(index === 0) day1 = key;
      if(index ===29) day30 = key;
      dataArray.push({ dates: parseDate(key), data: data.timeline[key]})
      index++  
    }

    //chart will fit in these boundaries
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    //x axis uses dates as domain and fits into range of 0-innerwidth
    const xScale = scaleTime()
    .domain(extent(dataArray, xValue))
    .range([0, innerWidth]);

    //grab min and max values of data for our y axis
    const maxVal = max(dataArray, (d) => d.data);
    const minVal = min(dataArray, (d) => d.data);

    //y domain starts with min val and goes up to max val in a range that starts at the bottom of the graph up to 0
    const yScale = scaleLinear()
    .domain([minVal, maxVal])
    .range([innerHeight, 0])

    //create line function to be used in the path attribute of path element
    const createLine = line()
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
            <path fill="none" stroke="rgb(66, 105, 245)"  strokeWidth="3.2px" d={createLine  (dataArray)} />
            <line stroke="rgb(81, 81, 81)" strokeWidth="2.5px" x1={0} x2={innerWidth} y1=  {innerHeight} y2={innerHeight} />
            <text y={innerHeight + margin.bottom} style={{fill: "rgb(126, 126, 126)"}}>Date range:{day1}-{day30}</text>
             </g>
           </svg> 
    )
}

export default LineChart;