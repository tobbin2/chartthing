import * as React from 'react'
import { Line } from 'react-chartjs-2';
import { Column, Row } from 'simple-flexbox';

export class LineComponent extends React.Component {
  _data = {}
  constructor(){
      super()
      this._data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Data',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [65, 59, 80, 81, 56, 55, 40]
        }]
      }
  }
  render(){

      return(
          <div>
              <Line
                  data={this._data}
                  options={{maintainAspectRatio:false}}                  
              />
          </div>
      )
  }
}