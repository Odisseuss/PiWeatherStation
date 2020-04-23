import React, { Component } from 'react'
import axios from 'axios'
import Night from "./Video/HD.mp4"
import Morning from "./Video/Morning.mp4"
import Sunset1 from "./Video/Sunsetpt1.mp4"
import Sunset2 from "./Video/Sunsetp2.mp4"
import Sunset3 from "./Video/Susentpt3.mp4"
import Sunset4 from "./Video/Sunsetpt4.mp4"
import Info from '../components/info/info'
import Display from '../components/display/display'
import classes from './style.css'


export class homepage extends Component {
    constructor(props){
        super(props);
        this.state = {
            liveData: []
        }
    }

    componentDidMount(){
        axios
        .get("http://localhost:1234/chart_data")
        .then(res => {
          const apiResponse = res.data.map(live => {
            return{
              labels: live.labels,
              data: live.data
            };
          });
    
          const newState = Object.assign({}, this.state, {
            liveData: apiResponse
          });
    
          this.setState(newState);
        })
        .catch(err => console.log(err));
      }
    
    render() {
      var Day = new Date()
      var Hours = Day.getHours()

      // The Video to display..
      var Video

      // Checks what time it is to change the wallpaper..
      if ((Hours >= 20 && Hours <= 23) || (Hours >= 0 && Hours<=6)){
        Video = Night
      }
      // Else change the background to the appropriate time..
      else if(Hours > 6 && Hours <= 15){Video = Morning}
      else if(Hours == 16){Video = Sunset1}
      else if(Hours == 17){Video = Sunset2}
      else if(Hours == 18){Video = Sunset3}
      else if(Hours == 19){Video = Sunset4}
          
        return (
          <div>
            <div>
                  <video 
                  autoPlay="true" loop="true"
                  style = {{
                    position: "absolute",
                    width: "100%",
                    left: "50%",
                    top: "50%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "translate(-50%,-50%)",
                    zIndex: "-1"
                  }} 
                  >
                  <source src= {Video} type="video/mp4" />
                  Your browser does not support the video tag.
                  </video>
                  <main>
            
                  
                    <Info/>
                    <Display/>
                    

                    </main>

              </div>
          </div>
      )
                
        
    }
}

export default homepage
