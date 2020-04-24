import React from "react";
import "./display.css";

// This is the javascript code for the display..
export default function display(props) {
  return (
    <div className="display">
      <section>
        <h2>
          Rasperry-Pi: <span style={{ color: "green" }}>Connected</span>
        </h2>
        <br />
        <h3>Temperature : {props.temperature}°C</h3>
        <br></br>
        <h3>Air pressure : {props.pressure}</h3>
        <br></br>
        <h3>Humidity : {props.humidity}</h3>
        <br></br>
        <h3>Air Quality : {props.air_quality}</h3>
      </section>
    </div>
  );
}
