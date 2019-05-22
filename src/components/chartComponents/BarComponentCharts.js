import * as React from 'react'
import { Bar } from 'react-chartjs-2'
import { Row,Column } from 'simple-flexbox'
import { randomBlue } from '../randomBlueFunction'

const textStyleClass = {
    color:'#1C83B0',
    fontFamily:'Arial',
    fontWeight:1500,
    width:'100%',
    marginBottom:'11px  ',
    paddingRight:'10px',
    marginTop: '12px'
}

export class BarComponentChart extends React.Component{

    _data = {}
    months = ["Jan", "Feb", "Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"]
    amountOfNodes = 0

    constructor(props){
        super(props)

        let colors = []
        
        //loops through amount of values, appends color for each and changes amountOfNodes to represent length of xAxis. 
        for(let i= 0 ; i < this.props.data.data.length;i++){
            colors.push(randomBlue(5 * i)) 
            if(this.props.data.data[i].graphData.length > this.amountOfNodes)
                this.amountOfNodes = this.props.data.data[i].graphData.length
        }

        //appends data to public variabe _data, which is the data of the graph. (loops through object sent in)
        this._data = {
            labels: this.props.data.labels !== undefined ? this.props.data.labels : this.months.slice(0,this.amountOfNodes),
            datasets: 
            this.props.data.data.map( (object,index) => {
                return({
                    label: object.label,
                    backgroundColor: colors[index],
                    data: object.graphData
                })
            }).concat({
                label:"goal",
                backgroundColor:'gray',
                data: this.props.data.goalGraphData
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
            styles = {color:'green',textAlign:'center',margin:30, paddingBottom: 15,marginTop: 12 ,fontFamily:'Arial Black'}
        else 
            styles= {color:'red',textAlign:'center',margin:30, paddingBottom: 15,marginTop: 12, fontFamily:'Arial Black'}
    
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
        styles = {color:'green',textAlign:'center',margin:30,paddingBottom: 15,marginTop: 12,fontFamily:'Arial Black'}
        else 
        styles= {color:'red',textAlign:'center',margin:30,paddingBottom: 15, fontFamily:'Arial Black'}

        return(
        <div style={styles}>
            <h1>{this.months[this.amountOfNodes-1]}</h1>
            <p>{achieved + " of " + goal} </p>
            <p>{(achieved/goal).toFixed(4) * 100 + "%"}</p>
        </div>
        )
    
    }

    render(){
        return(
            <Row>         
                <Column>
                    {this.props.data.header !== undefined ? this.createHeader(this.props.data.header) : null}
                    <Bar
                        data={this._data}
                        options={{ legend:false, barValueSpacing: 20,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        min: 0
                                    }
                                }]
                            },
                            plugins:{
                                datalabels:{
                                    color:'white',
                                    formatter: (value, ctx) => {
                                        return value   
                                    }
                                }
                            }
                        }}
                    />
                </Column>
                <Column>
                    {this.createSummary()}
                </Column>
            </Row>
        )
    }

}
