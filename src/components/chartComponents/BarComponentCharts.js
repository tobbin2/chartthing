import * as React from 'react'
import { Bar } from 'react-chartjs-2'
import { Row,Column } from 'simple-flexbox'
import { randomBlue } from './randomBlueFunction'

const textStyleClass = {
    color:'#1C83B0',
    fontFamily:'Verdana',
    fontWeight:500,
    width:'100%',
    textAlign:'center',
    marginBottom:'0'
}

export class BarComponentChart extends React.Component{

    _data = {}
    constructor(props){
        super(props)

        let colors = []
        let amountOfNodes = 0
        
        for(let i= 0 ; i < this.props.data.data.length;i++){
            colors.push(randomBlue(5 * i))      
            if(this.props.data.data.length > amountOfNodes)
                amountOfNodes = this.props.data.data.length
        }
        let array = []
        for(let i = 0 ; i< this.props.data.data.length; i++){
            array.push([this.props.data.data[i],this.props.data.goalData[i]])
        }

        this._data = {
            labels: this.props.data.labels !== undefined ? this.props.data.labels : ["Jan", "Feb", "Mar"],
            datasets: [
                {
                    backgroundColor:'blue',
                    data: this.props.data.data
                },
                {
                    backgroundColor:'gray',
                    data: this.props.data.goalData
                }
            ]
        }

    }

    createHeader = (text) => {
        return(
            <Row>
                <h2 style={textStyleClass}>{text}</h2>
            </Row>
        )
    }

    render(){
        return(
            <Column>
                {this.props.data.header !== undefined ? this.createHeader(this.props.data.header) : null}
                <Row>
                <Bar
                    data={this._data}
                    options={{ legend:false, barValueSpacing: 20,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    min: 0,
                                }
                            }]
                        }}}
                />
                </Row>
            </Column>
        )
    }

}
