import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "./chart.css";

const chart = (props) => {
  let chart_data = {
    labels: [...props.timestamp],
    datasets: [
      {
        label: "Temperature",
        data: [...props.temperature],
      },
    ],
  };
  return (
    <div className="chart">
      <Line data={chart_data} width={750} height={300} />
    </div>
  );
};

export default chart;
