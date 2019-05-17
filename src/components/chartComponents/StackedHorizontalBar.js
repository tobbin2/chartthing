import * as React from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import { Column, Row } from 'simple-flexbox'

import { randomBlue } from './randomBlueFunction'

const textStyleClass = {
    color:'#1C83B0',
    fontFamily:'Verdana',
    fontWeight:500,
    width:'100%',
    marginBottom:'0'
}

export class StackedHorizontalBar extends React.Component{

    _data = {}
    constructor(props){
        super(props)

        let colors = []

        for(let i= 0 ; i < this.props.data.data.length;i++){
            colors.push(randomBlue(5 * i))
        }
        let standardArray = []
        let failureArray = []
        let successArray = []
        for(let i = 0 ; i < this.props.data.data.length; i++){
            if(this.props.data.goalData[i] - this.props.data.data[i] == 0){
                standardArray.push(this.props.data.data[i])
                failureArray.push(0)
                successArray.push(0)
            }
            else if(this.props.data.data[i] - this.props.data.goalData[i] > 0){
                standardArray.push(this.props.data.goalData[i])
                failureArray.push(0)
                successArray.push(this.props.data.data[i] - this.props.data.goalData[i])
            }
            else {
                standardArray.push(this.props.data.data[i])
                failureArray.push((this.props.data.goalData[i] - this.props.data.data[i]))
                successArray.push(0)
            }
        }

        this._data = {
            labels: this.props.data.labels !== undefined ? this.props.data.labels : ["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"].slice(0,this.props.data.data.length),
            datasets:[
                {
                    data :standardArray,
                    backgroundColor:'blue'
                },
                {
                    data :failureArray,
                    backgroundColor:'grey'
                },
                { 
                    data: successArray,
                    backgroundColor: 'green'
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

    render() {
        return(
            <Column justifyContent='center'>
                {this.props.data.header !== undefined ? this.createHeader(this.props.data.header) : null}
                <Row>
                <HorizontalBar
                    data={this._data}
                    options={{ legend:false, scales: {
                       
                        yAxes: [{
                            stacked: true
                        }],
                        xAxes:[{
                            stacked:true
                        }]
                    }}}
                />
                </Row>
            </Column>
        )
    }   
}    
        


        