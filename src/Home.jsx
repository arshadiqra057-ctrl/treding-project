
import './Home.css'
import { motion } from "framer-motion"; 
import img from './assets/men.jpg'
import abo from './assets/pic.jpeg';




import React, { useState, useEffect } from 'react';



function Home (){


    const [paused, setPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPaused(true);
      setTimeout(() => setPaused(false), 1000); // 1 second pause
    }, 3000); // 3 seconds total cycle: 2 seconds moving + 1 second pause

    return () => clearInterval(interval);
  }, []);
               const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true); // 2 second ke baad content dikhega
    }, 2000); // 2000ms = 2 seconds

    return () => clearTimeout(timer); // cleanup
  }, []);

  return(
<>
    <div className="march">
      <div>
<motion.h3
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 1 }}
  className="welcome"
>      
  Welcome to LA <br /> Digital Agency
</motion.h3>  

<motion.p
  initial={{ x: -100, opacity: 1 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ delay: 0.8, duration: 1 }}
  className="paragraph"
>
  Transforming ideas into powerful digital realities that <br />
  connect and convert. Helping brands grow, connect, and lead <br />
  through impactful design and digital innovation.
</motion.p>
      </div>

      <div className="febr">
        <img src={img} alt="Digital agency team" /> 
      </div>
    </div>

    <div className="arrange">
      <div className="col-3">
        <h2>Why Choose Us</h2>
        <p className="space">
          We craft smart, creative, and reliable digital solutions that help brands grow faster, <br />
          connect deeper, and shine brighter in the digital world. From strategy and design to execution,
        </p>
      </div>

      <div className="col-3">
        <h2>Save Your Time</h2>
        <p className="space">
          Grow your business with our custom digital plans — flexible, <br />
          transparent, and budget-friendly without sacrificing innovation.
        </p>
      </div>

      <div className="col-3 active">
        <h2>Affordable Price For You</h2>
        <p className="space">
          Enjoy top-tier creative services made simple and cost-effective <br />
          we help your brand grow without overspending.
        </p>
      </div>

      <div className="col-3">
        <h2>Best Strategy</h2>
        <p className="space">
          We turn strategy into success — helping your brand <br />
          grow online with impactful design, targeted marketing, <br/>
          and measurable results.
        </p>
      </div>
    </div>

    <div>
<motion.h2
  initial={{ x: -100, opacity: 1 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ delay: 0.8, duration: 1 }}
  className="about"
  ><span style={{ color: "#741801c2", fontWeight: "bold" }}> About LA Digital Agency</span> </motion.h2>
    </div>

<div className="about-section">
      <div className="about-left">
        <div className="circle-bg">
          <img src={abo} alt="About" className="about-photo" />
        </div>
        <div className="badge top-left">
          <h3>120%</h3>
          <p>Engagement</p>
        </div>
        <div className="badge bottom-left">
          <h3>85%</h3>
          <p>Sales Growth</p>
        </div>
      </div>

      <div className="about-right">
        <h1>15 Years Of Experiences on Marketing</h1>
        <p className="about-desc">
          We provide expert digital marketing, SEO, WordPress, and more —
          helping businesses grow online with smart strategies and powerful
          results.
        </p>

        <div className="about-feature">
          
          <div>
            <h4>Engine Rank Optimization Services</h4>
            <p>
              Providing all kinds of digital solutions including SEO, WordPress,
              and marketing to help your business grow online.
            </p>
          </div>
        </div>

        <div className="about-feature active">
          <div>
            <h4>Listen & Engage with Followers</h4>
            <p>
              Helping your brand grow online with comprehensive digital services
              and effective strategies.
            </p>
          </div>
        </div>

        <div className="about-feature">
          <div>
            <h4>Higher Customer Satisfaction</h4>
            <p>
              Ensuring higher customer satisfaction by delivering quality
              services that meet client needs and exceed expectations.
            </p>
          </div>
        </div>
      </div>
    </div>
 <div className="transparent-box">
          <button className="tag-btn">OUR SERVICES </button>
          <h3>We Provide The Best Service For You</h3>

          <p>We focus on delivering high-impact digital solutions tailored to<br /> 
           your business goals. 
            From strategy to execution, we ensure every step <br />
             adds value and drives result</p>
</div>



                  

  </>
  );
}

export default Home;