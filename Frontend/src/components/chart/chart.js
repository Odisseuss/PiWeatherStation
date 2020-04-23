import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "./chart.css";

class chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [
          "10.00",
          "10.30",
          "11.00",
          "11.30",
          "12.00",
          "12.30",
          "13.00",
          "13.30",
        ],
        datasets: [
          {
            label: "Times",
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
