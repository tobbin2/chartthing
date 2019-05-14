import * as React from 'react'
import { Pie } from 'react-chartjs-2';
import { Column, Row } from 'simple-flexbox';

export class PieComponentChart extends React.Component {

    _data = {}
    constructor(){
        super()
        this._data = {
            labels: ["Red", "Green", "blue"],
            datasets:[{
                data: [2000,4000,2850],
                backgroundColor: ['red', 'blue', 'green']
            }]
        }
    }
    render(){

        return(
            <div>
                <Pie
                    data={this._data}
                    options={{maintainAspectRatio:true}}                  
                />
            </div>
        )
    }
}