import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "./chart.css";
import { Container, Row, Col } from "react-bootstrap";

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
            borderColor: "#6ad96a",
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
            borderColor: "#4b7fc4",
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
            borderColor: "#eb5759",
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
            data: [39, 44, 52, 21, 66],
            borderColor: "#fccd74",
          },
        ],
      },
    };
  }

  render() {
    return (
      <Container
        fluid
        className="justify-content-md-center allign-items-md-center chart"
      >
        <Row>
          <Col>
            <Line data={this.state.chart1Data} width={650} height={300} />
          </Col>
          <Col>
            <Line data={this.state.chart2Data} width={650} height={300} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Line data={this.state.chart3Data} width={650} height={300} />
          </Col>
          <Col>
            <Line data={this.state.chart4Data} width={650} height={300} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default chart;
