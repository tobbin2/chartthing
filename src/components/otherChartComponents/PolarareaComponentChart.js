import * as React from 'react'
import { Polar } from 'react-chartjs-2'

import { randomBlue } from '../randomBlueFunction'

const textStyleClass = {
    color:'#1C83B0',
    fontFamily:'Verdana',
    fontWeight:500,
    width:'100%',
    textAlign:'center',
    marginBottom:'0'
}

export class PolarareaComponentChart extends React.Component{

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
                <h2 style={textStyleClass}>{text}</h2>
        )
    }

    render(){
        return(
            <div>
                {this.props.data.header !== undefined ? this.createHeader(this.props.data.header) : null}
                <Polar
                    data={this._data}
                    //options={{legend:false}}
                />
              
            </div>
        )
    }

}
