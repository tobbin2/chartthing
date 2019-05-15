import * as React from 'react'
import { Doughnut } from 'react-chartjs-2'
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

export class DoughnutComponentChart extends React.Component{

    _data = {}
    constructor(props){
        super(props)

        let colors = []

        for(let i= 0 ; i < this.props.data.data.length;i++){
            colors.push(randomBlue(5 * i))
        }

        this._data = {
            labels: this.props.data.labels !== undefined ? this.props.data.labels : [],
            datasets:[{
                data: this.props.data.data,
                backgroundColor: colors
            }]
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
                <Doughnut
                    data={this._data}
                />
                </Row>
            </Column>
        )
    }

}
