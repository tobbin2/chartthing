import * as React from 'react'
import { Bar } from 'react-chartjs-2'
import { Row,Column } from 'simple-flexbox'
import { makeBarChart } from '../svgComponents/chart.js'

const textStyleClass = {
    color:'#1272A4',
    fontFamily:'Arial',
    fontWeight:1500,
    width:'100%',
    marginBottom:'0'
}

export class BarComponentChart extends React.Component{

    _data = {}
    _values = []
    months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    numberOfValues = 0

    constructor(props){
        super(props)

        this.numberOfValues = this.props.data.data[0].graphData.length;

        //appends data to public variabe _data, which is the data of the graph. (loops through object sent in)
        this._data = {
            labels: this.props.data.labels !== undefined ? this.props.data.labels : this.months.slice(0,this.numberOfValues),
            datasets: 
            this.props.data.data.map( (object,index) => {
                return({
                    label: object.label,
                    data: object.graphData
                })
            }).concat({
                label:"goal",
                backgroundColor:'gray',
                data: this.props.data.goalGraphData
            })
        }

        //console.log(this._data)

        for(let i = 0 ; i < this._data.datasets[0].data.length; i++){
            this._values.push({
                goal:this._data.datasets[1].data[i], value:this._data.datasets[0].data[i]
            }) 
          }

    }

    //creates header if requested
    createHeader = (text) => {
        return(
            <Row>
                <h2 style={textStyleClass}>{text}</h2>
            </Row>
        )
    }

    //creates summary of graph on last month (current)
    /*createSummary = () => {
    
        let lastObject = this.props.data.graphData
        //console.log(lastObject, this.numberOfValues)
        let achieved = lastObject[this.numberOfValues - 1]

        console.log()
        let goal = this.props.data.goalGraphData[this.numberOfValues - 1]
    
        console.log("goal", goal);

        let styles = {}
    
        //reached goal true, else false
        if(achieved >= goal)
            styles = {color:'#706D01',textAlign:'center',margin:30,fontFamily:'Arial Black'}
        else 
            styles= {color:'#B0252E',textAlign:'center',margin:30, fontFamily:'Arial Black'}
    
        return(
          <div style={styles}>
            <h1>{this.months[this.numberOfValues-1]}</h1>
            <p>{achieved + " of " + goal} </p>
            <p>{(achieved/goal).toFixed(4) * 100 + "%"}</p>
          </div>
        )
    }*/

    //creates the summary of graph
    createSummary = () => {
        
        let lastObject = []

        for(let obj of this.props.data.data){
        if(lastObject.length < obj.graphData.length)
            lastObject = obj.graphData
        }

        let achieved = lastObject[this.numberOfValues - 1]
        let goal = this.props.data.goalGraphData[this.numberOfValues - 1]

        console.log("goal", this.props.data.goalGraphData);

        let styles = {}

        //reached goal true, else false
        if(achieved >= goal)
        styles = {color:'#706D01',textAlign:'center',margin:30,fontFamily:'Arial Black'}
        else 
        styles= {color:'#B0252E',textAlign:'center',margin:30, fontFamily:'Arial Black'}

        return(
        <div style={styles}>
            <h1>{this.months[this.numberOfValues-1]}</h1>
            <p>{achieved + " of " + goal} </p>
            <p>{(achieved/goal).toFixed(4) * 100 + "%"}</p>
        </div>
        )
    
    }


    renderDangerous = () => {
        return <div style={{marginTop:'4px'}} dangerouslySetInnerHTML={{__html: makeBarChart(200,200,this._values,false,true).outerHTML }} />;
    }

    render(){
        return(
            <Row> 
                        
                <Column>
                {this.props.data.header !== undefined ? this.createHeader(this.props.data.header) : null}
                    {this.renderDangerous()}
                    
                </Column>
                <Column>
                    {this.createSummary()}
                </Column>
            </Row>
        )
    }

}
