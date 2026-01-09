import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-container">
                <div className="footer-brand-section">
                    <div className="footer-logo">
                        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 5L35 15V25L20 35L5 25V15L20 5Z" fill="#4A9FD4" stroke="#4A9FD4" strokeWidth="2" />
                            <path d="M12 18L20 12L28 18V26L20 32L12 26V18Z" fill="#1a3a5c" stroke="#4A9FD4" strokeWidth="1" />
                        </svg>
                        <span className="footer-brand-name">BuckHolding</span>
                    </div>
                    <p className="footer-description">
                        BuckHolding is a multi-asset, tech-focused broker utilizing advanced algorithms for enhanced trading conditions.
                    </p>
                </div>

                <div className="footer-links-grid">
                    <div className="footer-column">
                        <h3>Company</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/support">Support</Link></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Policy</h3>
                        <ul>
                            <li><Link to="/compliance">Compliance</Link></li>
                            <li><Link to="/terms">Terms & Conditions</Link></li>
                            <li><Link to="/cookies">Cookies Policy</Link></li>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">Copyright © 2024 All Rights Reserved.</p>
                    <div className="social-icons">
                        <a href="#!" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                        <a href="#!" className="social-icon"><i className="fab fa-x-twitter"></i></a>
                        <a href="#!" className="social-icon"><i className="fab fa-instagram"></i></a>
                        <a href="#!" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
