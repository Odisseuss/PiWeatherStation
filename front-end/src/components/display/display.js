import React from 'react'
import './display.css'

// This is the javascript code for the display..
export default function display() {
    return (
        <div className="display">
            <section>
            <h2>Rasperry-Pi: <span style={{color:"green"}}>Connected</span></h2>
            <br />
            <h3>Temperature : 7°C</h3><br></br>
            <h3>Air pressure : 1060,3 hPa (795,2 mmHg)</h3><br></br>
            <h3>Humidity : Low</h3>
            </section>
        </div>
    )
}
