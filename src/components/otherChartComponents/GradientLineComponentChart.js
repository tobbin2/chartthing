import * as React from 'react'
import { Line } from 'react-chartjs-2'
import { Column, Row } from 'simple-flexbox'

import {makeLineChart} from '../svgComponents/chart.js'
 
import { randomBlue } from '../randomBlueFunction'

const textStyleClass = {
    color:'#1C83B0',
    fontFamily:'Lucida Console',
    fontWeight:500,
    width:'100%',
    marginBottom:'20px',
    marginTop: '12px'
}

export class GradientLineComponentChart extends React.Component{

    _data = {}
    constructor(props){
        super(props)

        let colors = []
        let amountOfNodes = 0

        for(let i= 0 ; i < this.props.data.data.length;i++){
            colors.push(randomBlue(5 * i))
            if(this.props.data.data[i].graphData.length > amountOfNodes)
                amountOfNodes = this.props.data.data[i].graphData.length
        }


        this._data = {
            labels: this.props.data.labels !== undefined ? this.props.data.labels : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Okt","Nov","Dec"].slice(0,amountOfNodes+1),
            datasets:this.props.data.data.map( (object,index) => {
                return({
                    label:object.label,
                    borderColor: colors[index],
                    backgroundColor: colors[index],
                    fill: true,
                    data: object.graphData
                })
            })
        }
    }   
    
    createHeader = (text) => {
        return(
            <Row>
                <h2 style={textStyleClass}>{text}</h2>
            </Row>
        )
    }

    renderDangerous = () => {
        return <div style={{marginTop:'4px'}} dangerouslySetInnerHTML={{__html: makeLineChart(200,200,this._pieChartData,false,true).outerHTML}} />;
    }

    render() {
        return(
            <Column justifyContent='center'>
                {this.props.data.header !== undefined ? this.createHeader(this.props.data.header) : null}
                <Row>
                    {this.renderDangerous()}
                </Row>
            </Column>
        )
    }   
}    
        


        