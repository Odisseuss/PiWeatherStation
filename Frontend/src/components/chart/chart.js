import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "./chart.css";

class chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart1Data: {
        labels: [
          "19/04/2020",
          "20/04/2020",
          "21/04/2020",
          "22/04/2020",
          "23/04/2020",
        ],
        datasets: [
          {
            label: "Temperature",
            data: [21, 21, 26, 23, 17],
          },
        ],
      },
      chart2Data: {
        labels: [
          "19/04/2020",
          "20/04/2020",
          "21/04/2020",
          "22/04/2020",
          "23/04/2020",
        ],
        datasets: [
          {
            label: "Humidity",
            data: [40, 36, 69, 45, 42],
          },
        ],
      },
      chart3Data: {
        labels: [
          "19/04/2020",
          "20/04/2020",
          "21/04/2020",
          "22/04/2020",
          "23/04/2020",
        ],
        datasets: [
          {
            label: "Pressure",
            data: [1012, 1013, 1015, 1012, 1012],
          },
        ],
      },
      chart4Data: {
        labels: [
          "19/04/2020",
          "20/04/2020",
          "21/04/2020",
          "22/04/2020",
          "23/04/2020",
        ],
        datasets: [
          {
            label: "Air Quality",
            data: [3, 4, 5, 2, 6, 3, 2, 9],
          },
        ],
      },
    };
  }

  render() {
    return (
      <div className="chart">
        <Line
          className="chart_padding"
          data={this.state.chart1Data}
          width={350}
          height={150}
        />
        <Line
          className="chart_padding"
          data={this.state.chart2Data}
          width={350}
          height={150}
        />
        <Line
          className="chart_padding"
          data={this.state.chart3Data}
          width={350}
          height={150}
        />
        <Line
          className="chart_padding"
          data={this.state.chart4Data}
          width={350}
          height={150}
        />
      </div>
    );
  }
}

export default chart;
