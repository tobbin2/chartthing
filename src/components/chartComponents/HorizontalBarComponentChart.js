import * as React from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import { Row,Column } from 'simple-flexbox'

const textStyleClass = {
    color:'#1C83B0',
    fontFamily:'Arial',
    fontWeight:1500,
    width:'100%',
    marginTop: '12px',
    marginBottom:'15px',
}

export class HorizontalBarComponentChart extends React.Component{

    _data = {}
    months = ["Jan", "Feb", "Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"]
    amountOfNodes = 0

    constructor(props){
        super(props)

        let colors = []
        this.amountOfNodes = this.props.data.graphData.length

        for(let i= 0 ; i < this.props.data.graphData.length;i++){
            if(this.props.data.graphData[i] === this.props.data.goalGraphData[i])
                colors.push("#316eaa")
            else if(this.props.data.graphData[i] > this.props.data.goalGraphData[i])
                colors.push("#3daa31")
            else
                colors.push('red')
        }

        //appends data to public variabe _data, which is the data of the graph. (loops through object sent in)
        this._data = {
            labels: this.props.data.labels !== undefined ? this.props.data.labels.slice(0, this.amountOfNodes) : this.months.slice(0,this.amountOfNodes),
            datasets:[{
                data: this.props.data.graphData,
                backgroundColor: colors
            }]
        }

    }

    //creates header of graph
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
            styles = {color:'green',textAlign:'center',margin:30,paddingBottom:'15px',fontFamily:'Arial Black'}
        else 
            styles= {color:'red',textAlign:'center',margin:30,paddingBottom:'15px', fontFamily:'Arial Black'}
    
        return(
          <div style={styles}>
            <h1>{this.months[this.amountOfNodes-1]}</h1>
            <p>{achieved + " of " + goal} </p>
            <p>{achieved/goal * 100 + "%"}</p>
          </div>
        )
    }

    render(){
        return(
            <Row>
                <Column>
                    {this.props.data.header !== undefined ? this.createHeader(this.props.data.header) : null}
                    <Row>
                    <HorizontalBar
                        data={this._data}
                        options={{ 
                            legend:false, 
                            scales: {xAxes: [{ticks: { beginAtZero: true }}]}, 
                            plugins:{
                                datalabels:{
                                    align:'top',
                                    anchor:'top',
                                    formatter: (value, ctx) => {
                                        if(ctx.datasetIndex === 0)
                                            return value
                                        else
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
