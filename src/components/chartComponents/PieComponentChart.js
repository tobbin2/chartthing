import * as React from 'react';
import { Pie } from 'react-chartjs-2';
import { Column, Row} from 'simple-flexbox';
// eslint-disable-next-line
import { makePieChart } from "../chartComponents/chart";

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

        for(let i = 0 ; i < this.props.data.data.length; i++){
            this._pieChartData.push({
                name:this.props.data.labels[i],
                value:this.props.data.data[i]
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
        //console.log(makePiechart(200,200,this._pieChartData,true,false).outerHTML);
        return <div style={{marginTop:'4px'}} dangerouslySetInnerHTML={{__html: makePieChart(200,200,this._pieChartData,false,true).outerHTML}} />;
    }
    

    render(){
        let a = React.createElement("html")

        return(
            <Column alignItems="center" justifyContent='center'>
                <Row>
                    {this.renderDangerous()}
                    
                </Row>
            </Column>
        )
    }
}