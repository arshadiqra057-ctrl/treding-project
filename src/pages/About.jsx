import React, { useState } from 'react';
import './About.css';
import { motion } from "framer-motion";
import CountUp from '../components/CountUp';
import teamImage from '../assets/team-collaboration.png';
import avatar1 from '../assets/man.jpg';
import avatar2 from '../assets/an.jpg';
import avatar3 from '../assets/ani.jpg';
import avatar4 from '../assets/men.jpg';

const About = () => {
  const [activeTab, setActiveTab] = useState('about');

  const tabContent = {
    mission: {
      title: 'Our Mission',
      text: 'To democratize investing and make financial growth accessible to everyone. We believe that everyone deserves the opportunity to build wealth, regardless of their background or experience level.'
    },
    about: {
      title: 'About Us',
      text: 'At BuckHolding, we are committed to providing an intuitive and reliable trading experience. Our platform is designed to simplify the trading process and empower investors with the resources they need to succeed. With offices across four continents, we challenge our people to think differently and ask themselves; how should trading look like tomorrow?'
    },
    vision: {
      title: 'Our Vision',
      text: 'To be the world\'s most trusted and innovative investment platform, transforming how people interact with financial markets and helping millions achieve their financial goals.'
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="about-page"
    >
      <section className="about-hero">
        <div className="about-container">
          {/* Left Column - Charts & Stats */}
          <div className="about-left-column">
            {/* Contact Data Chart */}
            <div className="chart-card">
              <div className="chart-header">
                <span className="chart-title">Contact data</span>
                <div className="chart-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="bar-chart">
                <div className="chart-y-axis">
                  <span>5k</span>
                  <span>4k</span>
                  <span>3k</span>
                  <span>2k</span>
                  <span>1k</span>
                </div>
                <div className="chart-bars">
                  <div className="bar-group">
                    <div className="bar bar-blue" style={{ height: '60%' }}></div>
                    <div className="bar bar-yellow" style={{ height: '45%' }}></div>
                    <div className="bar bar-green" style={{ height: '70%' }}></div>
                    <span className="bar-label">March 01</span>
                  </div>
                  <div className="bar-group">
                    <div className="bar bar-blue" style={{ height: '80%' }}></div>
                    <div className="bar bar-yellow" style={{ height: '55%' }}></div>
                    <div className="bar bar-green" style={{ height: '40%' }}></div>
                    <span className="bar-label">March 05</span>
                  </div>
                  <div className="bar-group">
                    <div className="bar bar-blue" style={{ height: '50%' }}></div>
                    <div className="bar bar-yellow" style={{ height: '75%' }}></div>
                    <div className="bar bar-green" style={{ height: '60%' }}></div>
                    <span className="bar-label">March 10</span>
                  </div>
                  <div className="bar-group">
                    <div className="bar bar-blue" style={{ height: '90%' }}></div>
                    <div className="bar bar-yellow" style={{ height: '65%' }}></div>
                    <div className="bar bar-green" style={{ height: '85%' }}></div>
                    <span className="bar-label">March 15</span>
                  </div>
                </div>
              </div>
              <div className="chart-stats">
                <div className="stat-item">
                  <span className="stat-arrow up">↑</span>
                  <span className="stat-value">$1,234.00</span>
                </div>
                <div className="stat-item">
                  <span className="stat-arrow down">↓</span>
                  <span className="stat-value">$5,678.00</span>
                </div>
              </div>
            </div>

            {/* Investment Card */}
            <div className="investment-card">
              <div className="investment-header">
                <span className="investment-title">Investment</span>
                <div className="investment-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
              <div className="investment-legend">
                <span className="legend-item">
                  <span className="dot green"></span> Lorem
                </span>
                <span className="legend-item">
                  <span className="dot yellow"></span> Lorem
                </span>
                <span className="legend-item">
                  <span className="dot blue"></span> Lorem
                </span>
              </div>
            </div>


            {/* Active Users Stat */}
            <div className="active-users">
              <h2 className="users-number">
                <CountUp end={10} suffix="k+" />
              </h2>
              <p className="users-label">Active User</p>
            </div>
          </div>

          {/* Right Column - About Content */}
          <div className="about-right-column">
            <div className="about-tag">
              <span className="star-icon">✦</span>
              <span className="tag-text">About Us</span>
            </div>

            <h1 className="about-heading">
              We help you maximize your income.
            </h1>

            {/* Tab Navigation */}
            <div className="tab-navigation">
              <button
                className={`tab-btn ${activeTab === 'mission' ? 'active' : ''}`}
                onClick={() => setActiveTab('mission')}
              >
                Mission
              </button>
              <button
                className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => setActiveTab('about')}
              >
                About Us
              </button>
              <button
                className={`tab-btn ${activeTab === 'vision' ? 'active' : ''}`}
                onClick={() => setActiveTab('vision')}
              >
                Vision
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              <p>{tabContent[activeTab].text}</p>
            </div>

            {/* Values List */}
            <div className="values-section">
              <div className="values-list">
                <div className="value-item">
                  <span className="value-icon">✓</span>
                  <span className="value-text">Excellence & Integrity</span>
                </div>
                <div className="value-item">
                  <span className="value-icon">✓</span>
                  <span className="value-text">Empowering Financial Well-Being</span>
                </div>
                <div className="value-item">
                  <span className="value-icon">✓</span>
                  <span className="value-text">Client-Centric Approach</span>
                </div>
              </div>

              {/* Employees Pie Chart */}
              <div className="employees-chart">
                <div className="pie-chart">
                  <svg viewBox="0 0 100 100" className="pie-svg">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#1e3a5f"
                      strokeWidth="10"
                      strokeDasharray="200 283"
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#4A9FD4"
                      strokeWidth="10"
                      strokeDasharray="70 283"
                      strokeDashoffset="-200"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="pie-center">
                    <span className="pie-number">2k</span>
                    <span className="pie-label">Employees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple and Transparent Trading Section */}
      <section className="trading-features">
        <div className="features-wrapper">
          <div className="section-header-top">
            <div className="header-left">
              <div className="section-tag-pill">
                <span className="dot-blue"></span>
                <span className="tag-text">Our Benefits</span>
              </div>
              <h2 className="features-heading">Simple and Transparent Trading</h2>
            </div>
            <div className="header-right">
              <p className="features-description-text">
                Get market insights, lively news, and trading tips. Keep up to date with any major changes in the market and professional leading tips to help reduce your risk, identify trends, and build your trading strategy.
              </p>
            </div>
          </div>

          <div className="features-grid">
            {/* No Hidden Fees */}
            <div className="feature-box card-no-fees">
              <h3 className="feature-box-title">No Hidden Fees</h3>
              <p className="feature-box-text">Enjoy competitive pricing with no surprise charges.</p>
              <div className="payment-mockup">
                <div className="mockup-inner">
                  <div className="mockup-field">
                    <label>Email</label>
                    <div className="mockup-input">support123@gmail.com</div>
                  </div>
                  <div className="mockup-field">
                    <label>Payment method</label>
                    <div className="payment-methods">
                      <div className="payment-method-item">
                        <div className="card-icon">💳</div>
                        <span>Card Payment</span>
                      </div>
                      <div className="payment-method-item">
                        <div className="card-icon">💳</div>
                        <span>Card Payment</span>
                      </div>
                      <div className="payment-method-item">
                        <div className="card-icon">💳</div>
                        <span>Card Payment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="feature-box card-qr">
              <div className="qr-mockup-container">
                <p className="qr-value">$158,349</p>
                <div className="qr-image-placeholder">
                  <svg viewBox="0 0 100 100" className="qr-svg-mock">
                    <rect x="10" y="10" width="80" height="80" fill="none" stroke="#93c23e" strokeWidth="2" />
                    <rect x="20" y="20" width="20" height="20" fill="#93c23e" />
                    <rect x="60" y="20" width="20" height="20" fill="#93c23e" />
                    <rect x="20" y="60" width="20" height="20" fill="#93c23e" />
                    <rect x="45" y="45" width="10" height="10" fill="#000" />
                  </svg>
                </div>
                <p className="qr-footer">Scan QR & Pay</p>
              </div>
              <h3 className="feature-box-title">Discounts For High-Volume Traders</h3>
              <p className="feature-box-text">Benefit from reduced rates as your trading volume.</p>
            </div>

            {/* Trade With Peace */}
            <div className="feature-box card-peace">
              <div className="peace-mockup">
                <div className="phone-stack">
                  <div className="phone-item phone-1">
                    <div className="card-on-phone">💳</div>
                  </div>
                  <div className="phone-item phone-2">
                    <div className="card-on-phone">💳</div>
                  </div>
                </div>
              </div>
              <h3 className="feature-box-title">Trade With A Peace Of Mind</h3>
              <p className="feature-box-text">Not only are we multi-regulated, clients' funds are always held in segregated accounts in AA-rated banks.</p>
            </div>

            {/* Supporting You */}
            <div className="feature-box card-support">
              <h3 className="feature-box-title">Supporting You In Every Step</h3>
              <p className="feature-box-text">Our customer care support team is available 24/7.</p>
              <div className="support-mockup">
                <div className="review-orders-card">
                  <span className="card-title">Review Orders</span>
                  <div className="review-field">
                    <label>Email</label>
                    <div className="review-input">support123@gmail.com</div>
                  </div>
                  <div className="review-field">
                    <label>Ship no</label>
                    <div className="review-input">Lorem Ipsum is simply dummy text</div>
                  </div>
                  <div className="review-field">
                    <label>Card no</label>
                    <div className="review-input">**** **** **** 4567</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BuckHolding More Than Trading Section */}
      <section className="more-than-trading">
        <div className="more-container">
          <div className="more-left">
            <div className="section-tag">
              <span className="star-icon">👤</span>
              <span className="tag-text">Financial Success</span>
            </div>

            <h2 className="more-heading">
              BuckHolding: More Than Trading
            </h2>

            <p className="more-description">
              Your security is our priority. Trade with confidence knowing your data and transactions are protected.
            </p>

            {/* User Avatars */}
            <div className="user-trust">
              <div className="user-avatars">
                <img src={avatar1} alt="User" className="avatar" />
                <img src={avatar2} alt="User" className="avatar" />
                <img src={avatar3} alt="User" className="avatar" />
                <img src={avatar4} alt="User" className="avatar" />
                <div className="avatar plus-avatar" style={{ backgroundColor: '#4A9FD4' }}>+</div>
              </div>
              <div className="trust-text">
                <p className="trust-title">Trusted by 800k+ Worldwide Brands & Customer</p>
              </div>
            </div>

            <button className="register-now-btn">
              Register Now <span className="arrow">→</span>
            </button>
          </div>

          <div className="more-right">
            <div className="team-image-wrapper">
              <img
                src={teamImage}
                alt="BuckHolding Team"
                className="team-image"
              />
              <div className="chart-overlay-mockup">
                <div className="mini-bar-chart">
                  <div className="mini-bar" style={{ height: '40%' }}></div>
                  <div className="mini-bar" style={{ height: '70%' }}></div>
                  <div className="mini-bar" style={{ height: '50%' }}></div>
                  <div className="mini-bar" style={{ height: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seamless Trading Section */}
      <section className="steps-section">
        <div className="steps-header">
          <div className="header-left">
            <div className="section-tag-pill">
              <span className="dot-blue"></span>
              <span className="tag-text">How To Get Started</span>
            </div>
            <h2 className="steps-heading">Seamless Trading in 3 Easy Steps</h2>
          </div>
          <div className="header-right">
            <p className="steps-intro">Our account opening is easy and straight forward.</p>
          </div>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-visual-bg" style={{ backgroundImage: `url(${require('../assets/step-register.png')})` }}></div>
            <div className="step-info-overlay">
              <h3 className="step-card-title">Register</h3>
              <p className="step-card-text">Sign up for a BuckHolding Live Account with our hassle-free process.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-visual-bg" style={{ backgroundImage: `url(${require('../assets/step-fund.png')})` }}></div>
            <div className="step-info-overlay">
              <h3 className="step-card-title">Fund</h3>
              <p className="step-card-text">Effortlessly fund your account with a wide range of channels and accepted currencies.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-visual-bg" style={{ backgroundImage: `url(${require('../assets/mee.jpg')})` }}></div>
            <div className="step-info-overlay">
              <h3 className="step-card-title">Start Trading</h3>
              <p className="step-card-text">Access hundreds of instruments under market-leading trading conditions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us-section">
        <div className="why-us-container">
          <div className="why-us-content">
            <div className="section-tag">
              <span className="star-icon">✦</span>
              <span className="tag-text">Key Features</span>
            </div>
            <h2 className="why-us-title">Why Choose Us?</h2>

            <div className="features-stack">
              <div className="feature-item-card">
                <div className="feature-icon-circle">
                  <span className="icon">🛡️</span>
                </div>
                <div className="feature-details">
                  <h3 className="feature-title">Advanced Trading Tools</h3>
                  <p className="feature-desc">Utilize cutting-edge tools for in-depth market analysis.</p>
                </div>
              </div>

              <div className="feature-item-card highlighted">
                <div className="feature-icon-circle">
                  <span className="icon">📈</span>
                </div>
                <div className="feature-details">
                  <h3 className="feature-title">Diverse Investment Options</h3>
                  <p className="feature-desc">From stocks and ETFs to options and futures, explore a wide range of investment opportunities.</p>
                </div>
              </div>

              <div className="feature-item-card">
                <div className="feature-icon-circle">
                  <span className="icon">🎓</span>
                </div>
                <div className="feature-details">
                  <h3 className="feature-title">Educational Resources</h3>
                  <p className="feature-desc">Boost your trading knowledge with our comprehensive library of tutorials, webinars, and market analysis.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="why-us-visual">
            <div className="visual-wrapper">
              <img src={require('../assets/you.jpg')} alt="Trading Analysis" className="why-us-img" />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;

