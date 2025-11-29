import React from "react";
import "./Services.css";

import mee from "./assets/m.jpg";
import you from "./assets/sy.jpg";
import an from "./assets/an.jpg";
import med from "./assets/med.jpg";
import soo from "./assets/soo.jpg";
import oho from "./assets/oho.jpg";


function Services() {
  return (
    <>
      <div className="next">
        <h1 className="gen">Next-Gen Brand Solutions</h1>
        <p>
          From concept to creation <br />
          We design motion-driven digital experiences that connect and convert.
        </p>
      </div>

      {/* ✅ Image Grid Section */}
      
      <div className="imgset">
        <div className="imgBox">
          <img src={you} alt="Social Media" />
          <div className="overlay">
            <p>Search Engine Optimization</p>
          </div>
        </div>

        <div className="imgBox">
          <img src={mee} alt="Video Editing" />
          <div className="overlay">
            <p>Digital Marketing </p>
          </div>
        </div>

        <div className="imgBox">
          <img src={an} alt="Web Design" />
          <div className="overlay">
            <p>App Development</p>
          </div>
        </div>

        <div className="imgBox">
          <img src={med} alt="Graphic Design" />
          <div className="overlay">
            <p>Graphic Design</p>
          </div>
        </div>

        <div className="imgBox">
          <img src={soo} alt="Digital Marketing" />
          <div className="overlay">
            <p>Social Media Marketing</p>
          </div>
        </div>

        <div className="imgBox">
          <img src={oho} alt="App Development" />
         
            <div className="overlay">
          <p>Web Development</p>
         </div>
         </div>
      </div>
      
    </>
  );
}

export default Services;
