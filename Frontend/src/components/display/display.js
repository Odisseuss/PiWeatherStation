import React from "react";
import "./display.css";
import { Container, Row, Col } from "react-bootstrap";

// This is the javascript code for the display..

export default function display(props) {
  return (
    <Container className="justify-content-md-center bigfont">
      <Row className="justify-content-md-center">
        <Col xs={18} className="">
          <span className="bigbigfont">Weather App Interface</span>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={18} style={{ marginBottom: "120px" }}>
          Rasperry-Pi:{" "}
          <span style={{ color: "green" }}>
            {props.temperature != null ? "Connected" : "Offline"}
          </span>
        </Col>
      </Row>
      <Row className="justify-content-md-center align-items-md-center ce-ai-frt">
        <Col className="text-center" sm>
          Temperature : {props.temperature}°C
        </Col>
        <Col className="text-center" sm>
          Air pressure : {props.pressure} hPa
        </Col>
      </Row>
      <Row className="justify-content-md-center align-items-md-center">
        <Col className="text-center" sm>
          Humidity : {props.humidity} %RH
        </Col>
        <Col className="text-center" sm>
          Air Quality : {props.air_quality}%
        </Col>
      </Row>
    </Container>
  );
}
