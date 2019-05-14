import * as React from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import { Column, Row } from 'simple-flexbox'

export class HorizontalBarComponentChart extends React.Component{

    _data = {}
    constructor(props){
        super(props)
        this._data = {
            labels: ["Red", "Green", "blue"],
            datasets:[{
                data: [3000,4000,2850],
                backgroundColor: ['red', 'blue', 'green']
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
