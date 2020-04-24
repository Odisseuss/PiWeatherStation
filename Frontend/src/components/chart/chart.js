import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "./chart.css";

const Chart = (props) => {
  let chart_data = {
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
        label: "Temperature",
        data: [props.data.temperature],
      },
    ],
  };
  console.log(chart_data);
  return (
    <div className="chart">
      <Line data={chart_data} width={750} height={300} />
    </div>
  );
};

export default Chart;
