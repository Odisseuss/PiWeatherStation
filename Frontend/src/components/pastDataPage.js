import React, { Component } from "react";
import bg1 from "../../public/images/wave.svg";
import { ButtonGroup, Button } from "react-bootstrap";
import Chart from "./chart/chart";
import axios from "axios";
import Style from "./pastDataPage.css";
import Night from "../../public/Video/HD.mp4";
import Morning from "../../public/Video/Morning.mp4";
import Sunset1 from "../../public/Video/Sunsetpt1.mp4";
import Sunset2 from "../../public/Video/Sunsetp2.mp4";
import Sunset3 from "../../public/Video/Susentpt3.mp4";
import Sunset4 from "../../public/Video/Sunsetpt4.mp4";

export class pastDataPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleButtonClick = (event) => {
    axios
      .get("localhost:1234/chart_data", {
        params: {
          typeOfTime: event.target.value,
        },
      })
      .then((res) => {
        console.log("RES DATA\n", res.data);
        var avgObj = {
          timestamp: [],
          temperature: [],
          humidity: [],
          aq: [],
          pressure: [],
        };
        res.data.forEach((obiect) => {
          avgObj.timestamp.push(obiect.data_computed_for);
          avgObj.temperature.push(obiect.i_temperature_avg);
          avgObj.humidity.push(obiect.i_humidity_avg);
          avgObj.aq.push(obiect.i_aq_avg);
          avgObj.pressure.push(obiect.i_pressure_avg);
        });
        console.log("OBIECT\n", avgObj);
        this.setState(avgObj);
      })
      .catch((err) => console.log(err));
  };

  backgroundHours = (morningHour, noonHour, sunsetHour, nightHour) => {
    var Hours = new Date().getHours();
    var Video;
    if (nightHour <= Hours <= 23 || 0 <= Hours <= morningHour) {
      Video = Night;
    } else if (morningHour < Hours <= noonHour) {
      Video = Morning;
    } else if (noonHour < Hours <= sunsetHour) {
      Video = Sunset1;
    } else {
      Video = Sunset2;
    }
    return Video;
  };

  // Sunrise, sunset times depends on the month.
  backgroundMonth = () => {
    var Video;
    var Month = new Date().getMonth();

    if (Month == 12 || Month <= 2) {
      Video = this.backgroundHours(7, 15, 16, 17, 18);
    } else if (2 < Month <= 4) {
      Video = this.backgroundHours(6, 17, 18, 19, 20);
    } else if (4 < Month <= 7) {
      Video = this.backgroundHours(5, 18, 19, 20, 21);
    } else if (7 < Month <= 9) {
      Video = this.backgroundHours(7, 16, 17, 18, 19);
    } else if (10 < Month <= 12) {
      Video = this.backgroundHours(8, 13, 14, 15, 16);
    }
    return Video;
  };

  render() {
    var Video = this.backgroundMonth();

    return (
      <div>
        <div>
          <video
            autoPlay={true}
            loop={true}
            style={{
              position: "absolute",
              width: "100%",
              left: "50%",
              top: "50%",
              height: "100%",
              objectFit: "cover",
              transform: "translate(-50%,-50%)",
              zIndex: "-1",
            }}
          >
            <source src={Video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <main>
            <section className="past_Data_Section">
              <h2 className="Text">Choose Timeframe </h2>
              <br />
              <ButtonGroup aria-label="Basic example">
                <Button
                  variant="secondary"
                  value="Daily"
                  className="Button"
                  onClick={this.handleButtonClick}
                >
                  Daily
                </Button>
                <Button
                  variant="secondary"
                  value="Weekly"
                  className="Button"
                  onClick={this.handleButtonClick}
                >
                  Weekly
                </Button>
                <Button
                  variant="secondary"
                  value="Monthly"
                  className="Button"
                  onClick={this.handleButtonClick}
                >
                  Monthly
                </Button>
              </ButtonGroup>
            </section>
            <Chart data={this.state} />

            <img
              src={bg1}
              alt="background"
              style={{
                position: "fixed",
                bottom: "0px",
                left: "0",
                zIndex: "-1",
                backgroundPosition: "right bottom",
                opacity: "30%",
              }}
            />
          </main>
        </div>
      </div>
    );
  }
}

export default pastDataPage;
