import React, { Component } from "react";
import axios from "axios";
import Night from "../../public/Video/HD.mp4";
import Morning from "../../public/Video/Morning.mp4";
import Sunset1 from "../../public/Video/Sunsetpt1.mp4";
import Sunset2 from "../../public/Video/Sunsetp2.mp4";
import Sunset3 from "../../public/Video/Susentpt3.mp4";
import Sunset4 from "../../public/Video/Sunsetpt4.mp4";
import Display from "../components/display/display";
import classes from "./style.css";

export class homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios
      .get("http://raspberrypi.local:1234/live_data")
      .then((res) => {
        console.log("RES \n", res);
        console.log("RES.DATA\n", res.data);
        const apiResponse = res.data;

        this.setState(apiResponse);
        console.log(this.state);
      })
      .catch((err) => console.log(err));
  }

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
            <div className="Text_back">
              <Display
                temperature={this.state.temperature}
                humidity={this.state.humidity}
                pressure={this.state.pressure}
                air_quality={this.state.air_quality}
              />
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default homepage;
