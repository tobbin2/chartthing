import * as React from 'react'
import { Line } from 'react-chartjs-2'
import { Column, Row } from 'simple-flexbox'

export class GradientLineComponentChart extends React.Component{

    _data = {}
    constructor(props){
        super(props)
        this._data = {
            labels: ["2010","2012","2014","2016", "2018", "2020"],
            datasets:[
                {
                    label: "Rates",
                    backgroundColor: 'blue',
                    borderColor: "blue",
                    fill: true,
                    data: [5, 5, 1 ,2 ,7,4]
                },
                {  
                    label: "test",
                    backgroundColor:'pink',
                    borderColor: 'pink',
                    fill: true,
                    data: [1, 10, 5 ,2 ,8, 12]
                }
            ]
        }
    }   
        render() {
            return(
                <div>
                <Line
                    data={this._data}
                    options={{maintainAspectRatio:true,legend:false, devicePixelRatio:70}}                  
                />
            </div>
            )
   }   }    
        


        