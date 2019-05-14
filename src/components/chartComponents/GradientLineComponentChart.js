import * as React from 'react'
import { Line } from 'react-chartjs-2'
import { Column, Row } from 'simple-flexbox'

export class GradientLineComponentChart extends React.Component{

    _data = {}
    constructor(props){
        super(props)
        this._data = {
            labels: ["Rates","test","a","b"],
            datasets:[
                {
                    label: "Rates",
                    backgroundColor:'red',
                    data: [3, 5, 1 ,2 ,3]
                },
                {  
                    label: "test",
                    backgroundColor:'blue',
                    data: [3, 10, 5 ,2 ,3]
                }
            ]
        }
    }   
        render() {
            return(
                <div>
                <Line
                    data={this._data}
                    options={{maintainAspectRatio:true, devicePixelRatio:10}}                  
                />
            </div>
            )
   }   }    
        


        