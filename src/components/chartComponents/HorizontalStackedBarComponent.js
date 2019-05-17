import * as React from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import 'chartjs-plugin-datalabels'
import { Column, Row } from 'simple-flexbox'

const textStyleClass = {
    color:'#1C83B0',
    fontFamily:'Lucida Console',
    fontWeight:1500,
    width:'100%',
    marginBottom:'0',
    marginTop:"0"
}

export class HorizontalStackerBarComponent extends React.Component{

    _data = {}
    months = ["Jan", "Feb", "Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"]
    amountOfNodes = 0
    maximumNode = 0

    constructor(props){
        super(props)

        this.amountOfNodes = this.props.data.graphData.length

        let standardArray = []
        let failureArray = []
        let successArray = []

        /*
            This graph consist of 3 parts on each seciton: standard, failure and successful parts.
            This function push into each array depending on if you reached to goal at that certain point or not
            and is later visualized by color
        */
        for(let i = 0 ; i < this.props.data.graphData.length; i++){
            
            if(this.maximumNode < this.props.data.graphData[i])
                this.maximumNode = Number(this.props.data.graphData[i])

            if(this.maximumNode < this.props.data.goalGraphData[i])
                this.maximumNode = Number(this.props.data.goalGraphData[i])

            if(this.props.data.goalGraphData[i] - this.props.data.graphData[i] === 0){
                standardArray.push(this.props.data.graphData[i])
                failureArray.push(0)
                successArray.push(0)
            }
            else if(this.props.data.graphData[i] - this.props.data.goalGraphData[i] > 0){
                standardArray.push(this.props.data.goalGraphData[i])
                failureArray.push(0)
                successArray.push(this.props.data.graphData[i] - this.props.data.goalGraphData[i])
            }
            else {
                standardArray.push(this.props.data.graphData[i])
                failureArray.push((this.props.data.goalGraphData[i] - this.props.data.graphData[i]))
                successArray.push(0)
            }
            
        }

        this.maximumNode += 20

        this._data = {
            labels: this.props.data.labels !== undefined ? this.props.data.labels.slice(0,this.amountOfNodes) : this.months.slice(0,this.props.data.graphData.length),
            datasets:[
                {
                    data :standardArray,
                    backgroundColor:'#316eaa'
                },
                {
                    data :failureArray,
                    backgroundColor:'red'
                },
                { 
                    data: successArray,
                    backgroundColor: '#3daa31'
                }
            ]
        }
    }   

    //creates summary of graph on last month (current)
    createSummary = () => {
    
        let achieved = this.props.data.graphData[this.amountOfNodes - 1]
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

    render() {

        let values = {}
        return(
            <Row>
                <Column justifyContent='center'>
                    {this.props.data.header !== undefined ? this.createHeader(this.props.data.header) : null}
                    <Row>
                    <HorizontalBar
                        data={this._data}
                        options={{
                            legend:false,
                            responsive:true,
                            scales: {
                                yAxes: [{
                                    stacked:true
                                }],
                                xAxes:[{
                                    stacked:true,
                                    ticks:{max:this.maximumNode}
                                }]
                            },
                            plugins:{
                                datalabels:{
                                    align:'right',
                                    anchor:'end',
                                    formatter: (value, ctx) => {
                                        if(ctx.datasetIndex == 0){
                                            values[ctx.dataIndex] = Number(value)
                                        }else if(ctx.datasetIndex == 2){
                                            return values[ctx.dataIndex] += Number(value)
                                        }
                                        return null

                                    }
                                }
                            }
                            
                        }}
                        
                    />
                    </Row>
                </Column>
            <Column>
                {this.createSummary()}
            </Column>
            </Row>
        )
    }   
}    
        


        