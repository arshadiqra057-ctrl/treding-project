import './Footer.css';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      <div className="footer">
        <div className="footer-section">
          <h2>LA Digital</h2>
          <p>
            Building creative digital experiences that make your brand stand out.
            Join our newsletter to stay updated.
          </p>
        </div>

        <div className="footer-section">
          <h2>Protfolio</h2>
          <ul>
            <li>Web Development</li>
            <li>App Development</li>
            <li>Graphic Design</li>
            <li>Social Media</li>
            <li>Digital Marketing</li>
          </ul>
        </div>

        <div className="footer-section">
          <h2>Company</h2>
          <ul className="footer-links">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>

      {/* Footer bottom row */}
      <div className="footer-bottom">
        <div className="social-icons">
          <a href="https://www.facebook.com/profile.php?id=61574728847861" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="mailto:ladigitalagency87@gmail.com">
            <i className="bi bi-envelope-fill"></i>
          </a>
          <a href="https://wa.me/923058490633" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-whatsapp"></i>
          </a>
        </div>
        <p className="copyright">
          © 2025 LA Digital Agency. All Rights Reserved.
        </p>
      </div>

      {/* Scroll-to-top button */}
      {showScroll && (
        <button className="scroll-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </footer>
  );
}
