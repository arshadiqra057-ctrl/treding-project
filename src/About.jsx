import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import abo from "./assets/bulb.png";
import Dgi from "./assets/dg.jpg";
import web from "./assets/weba.jpg";
import seo from "./assets/seo.jpg";
import ab from "./assets/abo.jpg";
import so from "./assets/so.jpg";
import "./About.css";

function About() {
  const [showContent, setShowContent] = useState(false);
  const [active, setActive] = useState(null);

  // ✅ Circle data array (images + text)
  const circles = [
    { id: 1, img: web, text: "We build responsive and creative websites that grow your business." },
    { id: 2, img: Dgi, text: "Our digital marketing boosts engagement and drives real conversions." },
    { id: 3, img: seo, text: "Optimize your site to rank higher on Google and attract more traffic." },
    { id: 4, img: ab, text: "We craft brand identities that connect emotionally with audiences." },
    { id: 5, img: so, text: "We manage social media that builds loyalty and community around your brand." },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ===== About Section ===== */}
      <div className="about-section">
        {/* LEFT SIDE — Circular Image */}
        <motion.div
          className="about-left"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="circle-bg">
            <img src={abo} alt="About" className="about-photo" />
          </div>
        </motion.div>

        {/* RIGHT SIDE — Text Section */}
        {showContent && (
          <motion.div
            className="about-right"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2}}
          >
            <div className="about-circle-box">
              <h1>Building Digital Brands That Lead</h1>
              <p>
                At <strong>LA Digital Agency</strong>, we transform ideas into
                digital success. From <strong>Social Media Marketing</strong> and{" "}
                <strong>SEO</strong> to <strong>WordPress</strong>,{" "}
                <strong>Shopify</strong>, <strong>Web</strong> &{" "}
                <strong>App Development</strong> — we deliver creative,
                data-driven, and impactful solutions that make your brand stand
                out.
              </p>

              <div className="about-points">
                <div >
                  <h4 className="point" >Growth-Focused Strategy</h4>
                  <p  >Smart, data-based campaigns to scale your brand online.</p>
                </div>
                <div>
                  <h4 className="point">Modern Creative Design</h4>
                  <p>Bold and aesthetic visuals that connect and convert.</p>
                </div>
                <div className="point">
                  <h4 className="point" >Innovation & Support</h4>
                  <p>We focus on innovation, performance, and client success.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* ===== Circle Boxes Section ===== */}
      <div className="circle-container">
  {circles.map((item) => (
    <motion.div
      key={item.id}
      className={`circle ${active === item.id ? "active" : ""}`}
      onClick={() => setActive(active === item.id ? null : item.id)}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: item.id * 0.2 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.img
        src={item.img}
        alt="service"
        whileHover={{ rotate: 3, scale: 1.05 }}
        transition={{ duration: 0.4 }}
      />

      {active === item.id && (
        <motion.div
          className="circle-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>{item.text}</p>
        </motion.div>
      )}
    </motion.div>
  ))}
</div>
    </>
  );
}

export default About;
