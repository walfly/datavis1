import React, { Component } from 'react';
import logo from './logo.svg';
import parsedData from './parsedData';
import './App.css';
const width = 900;
const height = 600;
import createPath from "./createPath";

const colorMap = {
  "24N-90N": "#a6cee3",
  "24S-24N": "#1f78b4",
  "90S-24S": "#b2df8a",
  "64N-90N": "#33a02c",
  "44N-64N": "#fb9a99",
  "24N-44N": "#e31a1c",
  "EQU-24N": "#fdbf6f",
  "24S-EQU": "#ff7f00",
  "44S-24S": "#cab2d6",
  "64S-44S": "#6a3d9a",
  "90S-64S": "#ffff99"
};

const locations = Object.keys(colorMap);

const paths = parsedData.reduce((memo, item, key) => {
  if(locations.includes(key)) {
    memo.push({
      name: key,
      path: (createPath(item, width, height, parsedData.get('min'), parsedData.get('max'), 30)),
      color: colorMap[key]
    });
  }
  return memo;
}, []);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "selected": "all"
    };
  }
  render() {
    const years = parsedData.get('years');
    const scalar = Math.max(Math.abs(parsedData.get('min'), parsedData.get('max')));
    let pathsToRender;
    if (this.state.selected === "all") {
      pathsToRender = paths.map(item => <path d={item.path} stroke={item.color} strokeWidth={1.5} fill="none" key={item.name} />);
    } else {
      const p = paths.find(item => item.name === this.state.selected);
      pathsToRender = <path d={p.path} stroke={p.color} strokeWidth={1.5} fill="none"/>
    }
    return (
      <div className="App">
        <h1 style={{fontSize: "24px"}}> Annual mean Land-Ocean Temperature Index in 0.01 degrees Celsius selected zonal means </h1>
        <svg width={width} height={height}>
          <text x={9} y={12} textAnchor="start" fontSize="12px">{parsedData.get('max')}</text>
          <text x={9} y={(height/2) - ((100/scalar) * (height/2))} textAnchor="start" fontSize="12px">100</text>
          <text x={14} y={(height/2) + 4} textAnchor="start" fontSize="12px">{0}</text>
          <text x={3} y={(height/2) + ((100/scalar) * (height/2))} textAnchor="start" fontSize="12px">-100</text>
          <text x={3} y={height - 2} textAnchor="start" fontSize="12px">{parsedData.get('min')}</text>
          <rect x={30} y={0} width={width-30} height={height} fill="#e4e4e4" stroke="none"/> 
          <line x1={0} x2={width} y1={height/2} y2={height/2} stroke="#808080" strokeWidth={0.75} />
          {pathsToRender}
          <line x1={0} x2={width} y1={height} y2={height} stroke="#808080" strokeWidth={0.75} />
        </svg>
        <svg height={35} width={width}>
              <text x={30} y={2} transform="rotate(90 30,2)" textAnchor="start" fontSize="12px">{years.first()}</text>
              <text x={(width-30)/2} y={2} transform={`rotate(90 ${(width-30)/2},2)`} textAnchor="start" fontSize="12px">{years.get(Math.floor(years.size/2))}</text>
              <text x={width-12} y={2} transform={`rotate(90 ${width-12},2)`} textAnchor="start" fontSize="12px">{years.last()}</text>
        </svg>
        <svg height={50} width={width} className="legend">
          {locations.map((item,index) => {
            const x = (width/locations.length) * index;
            return <g key={index} onMouseEnter={() => this.setState({selected: item})} onMouseLeave={() => this.setState({selected: "all"})}>
              <text x={x + 20} y={17} textAnchor="start" fontSize="12px">{item}</text>
              <rect x={x} y={5} width={15} height={15} fill={colorMap[item]} stroke={colorMap[item]}/>
            </g>
          })}
        </svg>
      </div>
    );
  }
}

export default App;
