import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "./chart.css";

class chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
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
          {
            label: "Humidity",
            data: [40, 36, 69, 45, 42],
          },
          {
            label: "Pressure",
            data: [1012, 1013, 1015, 1012, 1012],
          },
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
        <Line data={this.state.chartData} width={750} height={300} />
      </div>
    );
  }
}

export default chart;
