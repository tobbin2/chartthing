import * as React from "react";
import { Line } from "react-chartjs-2";
import { Column, Row } from "simple-flexbox";

import { makeLineChart } from '../svgComponents/chart.js'

const textStyleClass = {
  color:'#1C83B0',
  fontFamily:'Lucida Console',
  fontWeight:1500,
  width:'100%',
  marginBottom:'0'
}

export class LineComponent extends React.Component {

  /*_data = {};
  amountOfNodes = 0
  months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Okt","Nov","Dec"]

  constructor(props) {
    super(props);

    //appends data to public variabe _data, which is the data of the graph. (loops through object sent in)
    this._data = {
      labels: this.props.data.labels !== undefined ? this.props.data.labels : this.months.slice(0,this.amountOfNodes+1),
      datasets: this.props.data.data.map( (object,index) => {
        return({
          label: object.label,
          fill:false,
          borderWidth: 3,
          data: object.graphData
        })
      }).concat({label: "goal", borderColor: "gray", fill:false,borderWidth:3,data: this.props.data.goalGraphData})
    };
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

    let achieved = lastObject[this.amountOfNodes - 1]
    let goal = this.props.data.goalGraphData[this.amountOfNodes - 1]

    let styles = {}

    //reached goal true, else false
    if(achieved >= goal)
      styles = {color:'green',textAlign:'center',margin:30,fontFamily:'Arial Black'}
    else 
      styles= {color:'red',textAlign:'center',margin:30, fontFamily:'Arial Black'}

    return(
      <div style={styles}>
        <h1>{this.months[this.amountOfNodes-1]}</h1>
        <p>{achieved + " of " + goal} </p>
        <p>{(achieved/goal).toFixed(4) * 100 + "%"}</p>
      </div>
    )
  
  }*/

  renderDangerous = () => {
    return <div style={{marginTop:'4px'}} dangerouslySetInnerHTML={{__html: makeLineChart(200,200,[[{x:0,y:1},{x:1,y:4},{x:2,y:2},{x:3,y:3},{x:4,y:4},]],3).outerHTML }} />;
  }
//{this.props.data.header !== undefined ? this.createHeader(this.props.data.header) : null}
//{this.createSummary()}
  render() {
    return(
      <Row>
        <Column>
            
            <Row>
              {this.renderDangerous()}
            </Row>
        </Column>
        <Column justifyContent="center">
          
        </Column>
      </Row>
    )
  }   
} 