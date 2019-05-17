import * as React from 'react'
import { Pie } from 'react-chartjs-2';
import { Column, Row} from 'simple-flexbox'

import { randomBlue } from '../randomBlueFunction'

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
    constructor(props){
        super(props)
        let colors = []
        

        for(let i= 0 ; i < this.props.data.graphData.length;i++){
            colors.push(randomBlue(5 * i))
        }

        this._data = {
            labels: this.props.data.labels !== undefined ? this.props.data.labels : [],
            datasets:[{
                data: this.props.data.graphData,
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
                    <Pie
                        data={this._data}
                        options={{maintainAspectRatio:true,devicePixelRatio:1,responsive:true}}      
                                    
                    />
                </Row>
            </Column>
        )
    }
}