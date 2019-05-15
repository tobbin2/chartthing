import * as React from "react";
import { Line } from "react-chartjs-2";
import { Column, Row } from "simple-flexbox";

export class LineComponent extends React.Component {
  _data = {};
  constructor() {
    super();
    this._data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Data",
          backgroundColor: "rgba(rgba(44, 79, 150, 1)",
          fill: false,
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(32,78,255,1)",
          pointBorderColor: "rgba(32,78,255,1)",
          hoverBorderColor: "rgba(255,99,132,1)",
          borderColor: "rgba(32,78,255,1)",
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "Data2",
          backgroundColor: "rgba(rgba(44, 79, 150, 1)",
          fill: false,
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(32,78,255,1)",
          pointBorderColor: "rgba(32,78,255,1)",
          hoverBorderColor: "rgba(255,99,132,1)",
          borderColor: "rgba(32,78,255,1)",
          data: [80, 45, 17, 21, 90, 42, 14]
        },
        {
          label: "Data3",
          backgroundColor: "rgba(rgba(44, 79, 150, 1)",
          fill: false,
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(32,78,255,1)",
          pointBorderColor: "rgba(32,78,255,1)",
          hoverBorderColor: "rgba(255,99,132,1)",
          borderColor: "rgba(32,78,255,1)",
          data: [12, 30, 16, 10, 75, 90, 25]
        }
      ]
    };
  }
  render() {
    return (
      <div>
        <Line data={this._data} options={{legend:false, maintainAspectRatio: true }} />
      </div>
    );
  }
}
