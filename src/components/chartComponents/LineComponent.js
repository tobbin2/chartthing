import * as React from "react";
import { Line } from "react-chartjs-2";
import { Column, Row } from "simple-flexbox";

import { makeLineChart } from '../svgComponents/chart.js'

const textStyleClass = {
  color:'#1272A4',
  fontFamily:'Arial',
  fontWeight:1500,
  width:'100%',
  marginBottom:'0'
}

export class LineComponent extends React.Component {

  _data = {};
  _coords = [];
  numberOfValues = 0;
  months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  constructor(props) {
    super(props);

    this.numberOfValues = this.props.data.data[0].graphData.length;

    //appends data to public variabe _data, which is the data of the graph. (loops through object sent in)
    this._data = {
      labels: this.props.data.labels !== undefined ? this.props.data.labels : this.months.slice(0,this.numberOfValues+1),
      datasets: this.props.data.data.map( (object,index) => {
        return({
          label: object.label,
          fill:false,
          borderWidth: 3, 
          data: object.graphData
        })
      }).concat({label: "goal", borderColor: "gray", fill:false,borderWidth:3,data: this.props.data.goalGraphData})
    };

    //console.log(`data`,this._data);

    for(let i = 0 ; i < this._data.datasets[0].data.length; i++){
      this._coords.push({
         x:i,
         y:this._data.datasets[0].data[i]
      }) 
    }
    //console.log(`coords`,this._coords)
  }

  createHeader = (text) => {
    return(
        <Row>
            <h2 style={textStyleClass}>{text}</h2>
        </Row>
    )
  }

  //creates the summary of graph
  createSummary = () => {
    
    let lastObject = []

    for(let obj of this.props.data.data){
      if(lastObject.length < obj.graphData.length)
        lastObject = obj.graphData
    }

    let achieved = lastObject[this.numberOfValues - 1]
    let goal = this.props.data.goalGraphData;

    let styles = {}

    //reached goal true, else false
    if(achieved >= goal)
      styles = {color:'#706D01',textAlign:'center',margin:30,fontFamily:'Arial Black'}
    else 
      styles= {color:'#B0252E',textAlign:'center',margin:30, fontFamily:'Arial Black'}

    return(
      <div style={styles}>
        <h1>{this.months[this.numberOfValues - 1]}</h1>
        <p>{achieved + " of " + goal} </p>
        <p>{(achieved/goal).toFixed(4) * 100 + "%"}</p>
      </div>
    )
  }



  

  renderDangerous = () => {
    return <div style={{marginTop:'4px'}} dangerouslySetInnerHTML={{__html: makeLineChart(200,200,[this._coords],this._data.datasets[1].data).outerHTML }} />;
  }

  render() {
    return(
      <Row>
        <Column>
          {this.props.data.header !== undefined ? this.createHeader(this.props.data.header) : null}
            <Row>
              {this.renderDangerous()}
            </Row>
        </Column>
        <Column justifyContent="center">
          {this.createSummary()}  
        </Column>
      </Row>
    )
  }   
} 