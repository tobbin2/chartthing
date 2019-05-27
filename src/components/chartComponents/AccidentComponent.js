import * as React from "react";
import { Column, Row } from 'simple-flexbox'

const textStyleClass = {
    color:'#1C83B0',
    fontFamily:'Arial',
    fontWeight:1500,
    width:'100%',
    fontSize: 35,
    textAlign: 'center',
    marginTop: '42px'
}

export class AccidentComponent extends React.Component{

    _data = {}
    months = ["Jan", "Feb", "Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"]
    amountOfNodes = 0
    yearAccidents = 0
    year = ['2019']

    constructor(props) {
        super(props);
            
        let colors = []
        this.amountOfNodes = this.props.data.data[0].graphData.length

        console.log(JSON.stringify(this.props.data));
        console.log("Accident data: " + this.props.data.data[0].graphData);
        console.log("Accident label: " + this.props.data.data[0].label);
        console.log("Accident header: " + this.props.data.header);
        console.log("Accident goal: " + this.props.data.goalGraphData);

        this._data = {
            labels: this.props.data.labels !== undefined ? this.props.data.labels.slice(0, this.amountOfNodes) : this.months.slice(0, this.amountOfNodes),
            datasets: [{
                data: this.props.data.graphData,
                backgroundColor: colors
            }]
        }

        for (let i = 0; i < this.amountOfNodes; i++) {
            this.yearAccidents += this.props.data.data[0].graphData[i];
        }
    }

    createHeader = (text) => {
        return (
            <Row>
                <h2 style={textStyleClass}>{text}</h2>
            </Row>
        )
    }

    createSummary = () => {

        let lastObject = this.props.data.data[0].graphData
        console.log(lastObject, this.amountOfNodes)
        let achieved = lastObject[this.amountOfNodes - 1]
        let goal = this.props.data.goalGraphData[this.amountOfNodes - 1]

        let stylesMonth = {}
        let stylesYear = {}

        //reached goal true = green, else false = red
        if (achieved <= goal) {
            stylesMonth = { color: '#0FA34D', textAlign: 'center', fontFamily: 'Arial Black' }
        } else {
            stylesMonth = { color: '#d82020', textAlign: 'center', fontFamily: 'Arial Black' }
        }

        console.log(this.yearAccidents);
        console.log(goal);

        if (this.yearAccidents <= goal) {
            stylesYear = { color: '#0FA34D', textAlign: 'center', fontFamily: 'Arial Black' }
        } else {
            stylesYear = { color: '#d82020', textAlign: 'center', fontFamily: 'Arial Black' }
        }

        return (
            <div>
                <div style={stylesMonth}>
                    <h1>{this.months[this.amountOfNodes - 1]}</h1>
                    <p>{achieved} </p>
                </div>
                <div style={stylesYear}>
                    <h1>I år</h1>
                    <p>{this.yearAccidents}</p>
                </div>
            </div>
        )
    }

    render() {
        return (
            <Row>
                <Column justify-content='center'>
                    {this.props.data.header !== undefined ? this.createHeader(this.props.data.header) : null}
                    <Row justify-content='center' style={{ paddingLeft: '37px', marginBottom: '30px' }}>
                        {this.createSummary()}
                    </Row>
                </Column>
            </Row>
        )
    }
}


