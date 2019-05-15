import * as React from 'react';
import { Pie } from 'react-chartjs-2';
import { Column, Row} from 'simple-flexbox';
// eslint-disable-next-line
import { makePiechart } from "../chartComponents/chart";

import { randomBlue } from './randomBlueFunction';

const textStyleClass = {
    color:'#1C83B0',
    fontFamily:'Verdana',
    fontWeight:500,
    width:'100%',
    textAlign:'center',
    marginBottom:'0'
}

export class PieComponentChart extends React.Component {

    _data = {}
    _pieChartData = []
    constructor(props){
        super(props)
        let colors = []
        

        for(let i= 0 ; i < this.props.data.data.length;i++){
            colors.push(randomBlue(5 * i))
        }

        this._data = {
            labels: this.props.data.labels != undefined ? this.props.data.labels : [],
            datasets:[{
                data: this.props.data.data,
                backgroundColor: colors
            }]
        }

        for(let value of this.props.data.data){
            this._pieChartData.push({
                name:"dawda",
                value:value,
                xStart:0,
                yStart:0,
                xEnd:0,
                yEnd:0,
                midAngle:0
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
        console.log(makePiechart(200,200,this._pieChartData,true,false))
        return <span dangerouslySetInnerHTML={{__html:"<div>" + makePiechart(200,200,this._pieChartData,true,false) + "</div>"}} />;
    }
    

    render(){
        let a = React.createElement("html")

        return(
            <Column>
                {this.props.data.header != undefined ? this.createHeader(this.props.data.header) : null}
                <Row>
                    {this.renderDangerous()}
                    
                </Row>
            </Column>
        )
    }
}