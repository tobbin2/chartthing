import * as React from 'react'
import { Bar } from 'react-chartjs-2'
import { Row,Column } from 'simple-flexbox'
import { makeBarChart } from '../svgComponents/chart.js'

const textStyleClass = {
    color:'#1C83B0',
    fontFamily:'Arial',
    fontWeight:1500,
    width:'100%',
    marginBottom:'0'
}

export class BarComponentChart extends React.Component{

    _data = {}
    _values = []
    months = ["Jan", "Feb", "Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"]
    amountOfNodes = 0

    constructor(props){
        super(props)

        //appends data to public variabe _data, which is the data of the graph. (loops through object sent in)
        this._data = {
            labels: this.props.data.labels !== undefined ? this.props.data.labels : this.months.slice(0,this.amountOfNodes),
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

        console.log(this._data)

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
    createSummary = () => {
    
        let lastObject = this.props.data.graphData
        console.log(lastObject, this.amountOfNodes)
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
    
    }


    renderDangerous = () => {
        return <div style={{marginTop:'4px'}} dangerouslySetInnerHTML={{__html: makeBarChart(200,200,this._values,true,true).outerHTML }} />;
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
