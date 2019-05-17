import * as React from "react";
import { Line } from "react-chartjs-2";
import { Column, Row } from "simple-flexbox";

import { randomBlue } from './randomBlueFunction';

const textStyleClass = {
  color:'#1C83B0',
  fontFamily:'Verdana',
  fontWeight:500,
  width:'100%',
  marginBottom:'0'
}

export class LineComponent extends React.Component {

  _data = {};

  constructor(props) {
    super(props);

    let colors = []
    
    let amountOfNodes = 0
    console.log(this.props.data.data[0].data)
    
    for(let i= 0 ; i < this.props.data.data.length;i++){
      colors.push(randomBlue(5 * i))
      if(this.props.data.data[i].data.length > amountOfNodes)
        amountOfNodes = this.props.data.data[i].data.length
    }

    this._data = {
      labels: this.props.data.labels !== undefined ? this.props.data.labels : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Okt","Nov","Dev"].slice(0,amountOfNodes+1),
      datasets: this.props.data.data.map( (object,index) => {
        return({
          label: object.label,
          borderColor: colors[index],
          fill:false,
          borderWidth: 3,
          data: object.data
        })
      }).concat({label: "goal", borderColor: "gray", fill:false,borderWidth:3,data: this.props.data.goalData})
    };
  }

  createHeader = (text) => {
    return(
        <Row>
            <h2 style={textStyleClass}>{text}</h2>
        </Row>
    )
  }

  render() {
      return(
        <Column>
            {this.props.data.header !== undefined ? this.createHeader(this.props.data.header) : null}
            <Row>
            <Line
                data={this._data}
                options={{ legend:false }}
            />
            </Row>
        </Column>
      )
  }   
} 