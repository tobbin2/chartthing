import * as React from 'react'
import { Line } from 'react-chartjs-2';
import { Column, Row } from 'simple-flexbox';

export class LineComponent extends React.Component {

    state = {
        lineChartData: {
          labels: [],
          datasets: [
            {
              type: "line",
              label: " BTC-USD",
              backgroundColor: "rgba(0, 0, 0, 0)",
             
             
              borderWidth: "2",
              lineTension: 0.45,
              data: []
            }
          ]
        },
        lineChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            enabled: true
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10
                }
              }
            ]
          }
        }
      };
    
      componentDidMount() {
        const subscribe = {
          type: "subscribe",
          channels: [
            {
              name: "ticker",
              product_ids: ["BTC-USD"]
            }
          ]
        };
    
        this.ws = new WebSocket("wss://ws-feed.gdax.com");
    
        this.ws.onopen = () => {
          this.ws.send(JSON.stringify(subscribe));
        };
    
        this.ws.onmessage = e => {
          const value = JSON.parse(e.data);
          if (value.type !== "ticker") {
            return;
          }
    
          const oldBtcDataSet = this.state.lineChartData.datasets[0];
          const newBtcDataSet = { ...oldBtcDataSet };
          newBtcDataSet.data.push(value.price);
    
          const newChartData = {
            ...this.state.lineChartData,
            datasets: [newBtcDataSet],
            labels: this.state.lineChartData.labels.concat(
              new Date().toLocaleTimeString()
            )
          };
          this.setState({ lineChartData: newChartData });
        };
      }
    
      componentWillUnmount() {
        this.ws.close();
      }
    render(){
        console.log(this._data)
        return(
            <div>
                <p>this is the pie chart</p>
                <Line
                data={this.state.lineChartData}
                options={this.state.lineChartOptions}
                />
            </div>
        )
    }
}