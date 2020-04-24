import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "./chart.css";

const Chart = (props) => {
  let chart_data = {
    labels: [props.data.timestamp],
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
