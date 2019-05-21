import * as React from "react";
import { Line } from "react-chartjs-2";
import { Column, Row } from "simple-flexbox";

import { randomBlue } from '../randomBlueFunction';

const textStyleClass = {
  color:'#1C83B0',
  fontFamily:'Arial',
  fontWeight:1500,
  width:'100%',
  
  paddingRight:'10px',
  marginTop: '12px'
  
  
  
  
}

export class LineComponent extends React.Component {

  _data = {};
  amountOfNodes = 0
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Okt","Nov","Dev"]

  constructor(props) {
    super(props);

    let colors = []
        
    //loops through amount of values, appends color for each and changes amountOfNodes to represent length of xAxis. 
    for(let i= 0 ; i < this.props.data.data.length;i++){
      colors.push(randomBlue(5 * i))
      if(this.props.data.data[i].graphData.length > this.amountOfNodes)
        this.amountOfNodes = this.props.data.data[i].graphData.length
    }

    //appends data to public variabe _data, which is the data of the graph. (loops through object sent in)
    this._data = {
      labels: this.props.data.labels !== undefined ? this.props.data.labels : this.months.slice(0,this.amountOfNodes+1),
      datasets: this.props.data.data.map( (object,index) => {
        return({
          label: object.label,
          borderColor: colors[index],
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
      styles = {color:'green',textAlign:'center',margin:30,marginTop: 12,fontFamily:'Arial Black'}
    else 
      styles= {color:'red',textAlign:'center',margin:30,paddingBottom:'15px', marginTop: 12, fontFamily:'Arial Black'}

    return(
      <div style={styles}>
        <h1>{this.months[this.amountOfNodes-1]}</h1>
        <p>{achieved + " of " + goal} </p>
        <p>{(achieved/goal).toFixed(4) * 100 + "%"}</p>
      </div>
    )
  
  }

  render() {
      return(
        <Row>
          <Column>
              {this.props.data.header !== undefined ? this.createHeader(this.props.data.header) : null}
              <Row>
              <Line
                  data={this._data}
                  options={{ legend:false, plugins:{datalabels:{display:false}}}}
                  
              />
              </Row>
          </Column>
          <Column justifyContent="center">
            {this.createSummary()}
          </Column>
        </Row>
      )
  }   
} 