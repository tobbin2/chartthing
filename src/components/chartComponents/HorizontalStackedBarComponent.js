import * as React from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import 'chartjs-plugin-datalabels'
import { Column, Row } from 'simple-flexbox'

import { makeHorizontalBarChart } from '../svgComponents/chart.js'
import { makeHorizontalBarChartRedGreen } from '../svgComponents/chart.js';

const textStyleClass = {
    color:'#1272A4',
    fontFamily:'Arial',
    fontWeight:1500,
    width:'100%',
    marginBottom:'20px',
    marginTop:"10px",
   
    
}

export class HorizontalStackerBarComponent extends React.Component{

    _data = {};
    months = ["Jan", "Feb", "Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"];
    numberOfBars = 0;
    barData = [];

    constructor(props){
        super(props)

        this.numberOfBars = this.props.data.values.length;

        this._data = {
            values: this.props.data.values,
            goals: this.props.data.goals,
            labels: this.props.data.labels !== undefined ? this.props.data.labels.slice(0,this.numberOfBars) : this.months.slice(0,this.numberOfBars),
        }

        for(var i = 0; i < this.numberOfBars; i++){
            this.barData.push({value: this._data.values[i], goal: this._data.goals[i]})
        }
    }   

    //creates summary of graph on last month (current)
    createSummary = () => {
    
        let achieved = this._data.values[this.numberOfBars - 1]
        let goal = this._data.goals[this.numberOfBars - 1]
    
        let styles = {}
    
        //reached goal true, else false
        if(achieved >= goal)
            styles = {color:'#706D01',textAlign:'center',margin:30,fontFamily:'Arial Black'}
        else 
            styles= {color:'#B0252E',textAlign:'center',margin:30, fontFamily:'Arial Black'}
    
        return(
          <div style={styles}>
            <h1>{this.months[this.numberOfBars-1]}</h1>
            <p>{achieved + " of " + goal} </p>
            <p>{achieved/goal * 100 + "%"}</p>
          </div>
        )
    }
    
    createHeader = (text) => {
        return(
            <Row>
                <h2 style={textStyleClass}>{text}</h2>
            </Row>
        )
    }

    renderDangerous = () => {
        return <div style={{marginTop:'4px'}} dangerouslySetInnerHTML={{__html: makeHorizontalBarChartRedGreen(200,200,this.barData,false,true).outerHTML }} />;
    }

    render() {

        let values = {}
        return(
            <Row>
                <Column justifyContent='center'>
                    {this.props.data.header !== undefined ? this.createHeader(this.props.data.header) : null}
                    <Row>
                        {this.renderDangerous()}
                    </Row>
                </Column>
            <Column>
                {this.createSummary()}
            </Column>
            </Row>
        )
    }   
}    
        


        