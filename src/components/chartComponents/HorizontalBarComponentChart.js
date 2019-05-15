import * as React from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import { Column, Row } from 'simple-flexbox'

export class HorizontalBarComponentChart extends React.Component{

    _data = {}
    constructor(props){
        super(props)

        console.log(this.props.data)
        this._data = {
            labels: ["Red", "Green", "blue","orange"],
            datasets:[{
                data: this.props.data,
                backgroundColor: ['red', 'blue', 'green','orange']
            }]
        }

    }

    renderHorizontalBar = () => {
        return (
            <HorizontalBar
                data={this._data}
                options={{maintainAspectRatio:false}}
          
            />
        )
    }

    render(){
        return(
            <div>
                {this.renderHorizontalBar()}   
            </div>
        )
    }

}
