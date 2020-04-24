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
  handleButtonClick = (event) => {
    axios
      .get("localhost:1234/chart_data", {
        params: {
          typeOfTime: event.target.value,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  render() {
    var Day = new Date();
    var Hours = Day.getHours();

    // The Video to display..
    var Video;

    // Checks what time it is to change the wallpaper..
    if ((Hours >= 20 && Hours <= 23) || (Hours >= 0 && Hours <= 6)) {
      Video = Night;
    }
    // Else change the background to the appropriate time..
    else if (Hours > 6 && Hours <= 15) {
      Video = Morning;
    } else if (Hours == 16) {
      Video = Sunset1;
    } else if (Hours == 17) {
      Video = Sunset2;
    } else if (Hours == 18) {
      Video = Sunset3;
    } else if (Hours == 19) {
      Video = Sunset4;
    }

    return (
      <div>
        <div>
          <video
            autoPlay="true"
            loop="true"
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
            <Chart />

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
