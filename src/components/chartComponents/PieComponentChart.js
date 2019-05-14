import * as React from 'react'
import { Pie } from 'react-chartjs-2';
import { Column, Row } from 'simple-flexbox';

export class PieComponentChart extends React.Component {

    _data = {}
    constructor(props){
        super(props)
        this._data = {
            labels: ["Red", "Green", "blue"],
            datasets:[{
                data: this.props.data,
                backgroundColor: [this.randomBlue(), this.randomBlue(), this.randomBlue()]
            }]
        }
    }

    randomBlue = (extra) => {
        let h = 180 + extra;
        let s = 100;
        let l = 52;
        let color = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
        return color
    }

    render(){

        return(
            <div>
                <Pie
                    data={this._data}
                    options={{maintainAspectRatio:true,devicePixelRatio:1}}      
                                
                />
            </div>
        )
    }
}