import React from "react";
import "./Project.css";
import { useNavigate } from "react-router-dom";
import mee from "./assets/m.jpg";
import you from "./assets/sy.jpg";
import an from "./assets/an0.jpeg";
import med from "./assets/med.jpg";
import soo from "./assets/soo.jpg";
import oho from "./assets/oho.jpg";


function Services() {
    const navigate = useNavigate();

  return (
    <>
      <section class="portfolio-section">
  <h2 className="our"><b>Our Portfolio</b></h2>
  <h5 className="ourr">
    Every project tells a story of creativity, innovation,  and impact.  
    At <br /> <strong >LA Digital Agency</strong>,<br /> we don’t just design   we build digital 
    experiences that inspire, engage, and deliver results.
  </h5>

  <div class="portfolio-grid">
    <div class="portfolio-item">
      <h3>🌐 Web Development</h3>
      <p>
        Modern, responsive, and high-performing websites built on WordPress,
        Shopify, and custom code — designed to elevate your brand presence.
      </p>
    </div>

    <div class="portfolio-item">
      <h3>🎨 Graphic & Motion Design</h3>
      <p>
        Stunning visuals, motion graphics, and branding designs that speak louder 
        than words — because first impressions matter.
      </p>
    </div>

    <div class="portfolio-item">
      <h3>📱 App & UI/UX Design</h3>
      <p>
        Beautiful, functional, and user-focused mobile and web app interfaces 
        that make every interaction seamless.
      </p>
    </div>

    <div class="portfolio-item">
      <h3>📈 Marketing Campaigns</h3>
      <p>
        From social media to SEO, our campaigns are crafted to grow your business,
        increase engagement, and boost conversions.
      </p>
    </div>
  </div>
</section>
      <div className="portfolio-box">
  <h3>COMPANY PORTFOLIO</h3>
  <p>
    At <strong>LA Digital Agency</strong>, our portfolio reflects creativity,
    strategy, and innovation. From eye-catching designs to high-performing
    websites and impactful digital campaigns, every project we deliver tells
    a story of growth and success.
    
    <div className="btn">
    <button onClick={() => window.open("https://ladigitalagency.io/", "_blank")}>
      Check Company  Portfolio
    </button>
  </div>
  </p>

  
</div>


      {/* ✅ Image Grid Section */}
      
      <div className="imgset">
        <div>
          <div className="imgBox">
          <img src={you} alt="Social Media" />
        </div>
         <div className="Button">
              <a><button>Previw</button>
              <button>Download</button></a>
            </div>
        </div>

        <div className="imgBox">
          <img src={mee} alt="Video Editing" />
         
        </div>

       <div className="imgBox">
  <img src={an} alt="Web Design" />
  <h2 className="imgText">Web Developer</h2>
</div>


        <div className="imgBox">
          <img src={med} alt="Graphic Design" />
          
        </div>

   <div>
        <div className="imgBox">
  <img src={soo} alt="Digital Marketing" />
</div>
<button
    onClick={() =>
      window.open(
        "https://drive.google.com/file/d/1I_gJEVhh4timyZnBZrUQcFE_DWrCf3ls/view?usp=sharing",
        "_blank"
      )
    }
  > Download
  </button>
   </div>


        <div className="imgBox">
          <img src={oho} alt="App Development" />
         
  
         </div>
      </div>
      
    </>
  );
}

export default Services;
