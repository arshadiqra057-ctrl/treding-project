import React, { useState } from 'react';
import './Home.css';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import CountUp from './CountUp';
import heroImage from './assets/hero-woman.png';
import teamImage from './assets/team-collaboration.png';
import avatar1 from './assets/man.jpg';
import avatar2 from './assets/an.jpg';
import avatar3 from './assets/ani.jpg';
import avatar4 from './assets/men.jpg';
import boxImage from './assets/security-visual.png';

import { stockTickerData, etfCategories, stockListings } from './data/mockData';

const Home = () => {
    const [activeSecurityTab, setActiveSecurityTab] = useState('Data Encryption');

    const securityTabs = [
        { id: 'Data Encryption', title: 'Data Encryption', text: 'All sensitive data is encrypted and stored securely', desc: 'We implement the highest security standards to ensure your personal information and trading activities are safe.' },
        { id: 'Account Protection', title: 'Account Protection', text: 'Multi-factor authentication and advanced fraud detection', desc: 'Secure your wealth with industry-leading protection protocols.' },
        { id: 'Compliance', title: 'Compliance', text: 'Fully regulated and compliant with global standards', desc: 'We operate with transparency and adhere to all legal requirements.' },
        { id: 'Refer And Earn', title: 'Refer And Earn', text: 'Invite friends and get rewards for every successful referral', desc: 'Grow your portfolio by sharing the BuckHolding experience with others.' },
    ];

    const activeTabContent = securityTabs.find(tab => tab.id === activeSecurityTab);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="home-container"
        >
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    {/* Left Column - Welcome Text */}
                    <div className="hero-left">
                        <div className="brand-tag">
                            <span className="star-icon">✦</span>
                            <span className="brand-name">BuckHolding</span>
                        </div>
                        <h1 className="hero-title">
                            Welcome to<br />
                            <span className="highlight">BuckHolding</span>
                        </h1>
                        <p className="hero-subtitle">
                            Empower your financial future with our user-friendly stock trading platform.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/login" className="cta-btn primary">Login</Link>
                            <Link to="/signup" className="cta-btn secondary">Sign Up</Link>
                        </div>
                    </div>

                    {/* Center Column - Hero Image */}
                    <div className="hero-center">
                        <div className="image-circle">
                            <div className="circle-bg"></div>
                            <img
                                src={heroImage}
                                alt="Woman using trading app"
                                className="hero-image"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    </div>

                    {/* Right Column - Stats */}
                    <div className="hero-right">
                        <div className="stats-block">
                            <h2 className="stats-number">
                                <CountUp end={50} suffix="k+" />
                            </h2>
                            <h3 className="stats-label">investors</h3>
                            <p className="stats-desc">
                                Whether you're a seasoned investor or just starting out,
                                we provide the tools, insights, and support you need.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="hero-decor">
                    <div className="plant-left"></div>
                    <div className="plant-right"></div>
                </div>
            </section>

            {/* Stock Ticker Marquee (Relocated) */}
            <div className="stock-ticker">
                <div className="ticker-track">
                    {[...stockTickerData, ...stockTickerData].map((stock, index) => (
                        <div key={index} className="ticker-item">
                            <span className="ticker-symbol">{stock.symbol}</span>
                            <span className="ticker-price">${stock.price}</span>
                            <span className={`ticker-change ${stock.positive ? 'positive' : 'negative'}`}>
                                {stock.change}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ETF Investment Section */}
            <section className="etf-section">
                <div className="etf-container">
                    {/* Left Column - ETF Categories */}
                    <div className="etf-categories">
                        {etfCategories.map((category, catIndex) => (
                            <div key={catIndex} className="etf-category-card">
                                <h3 className="etf-title">{category.title}</h3>
                                <p className="etf-description">{category.description}</p>
                                <button className="invest-btn">
                                    Invest <span className="arrow">→</span>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Right Column - Stock Charts & Listings */}
                    <div className="stock-panels">
                        {stockListings.map((stocks, panelIndex) => (
                            <div key={panelIndex} className="stock-panel">
                                {/* Mini Chart */}
                                <div className="mini-chart">
                                    <div className="chart-header">
                                        <span className="chart-label">Jul</span>
                                        <span className="chart-label">Aug</span>
                                        <span className="chart-label">Sep</span>
                                    </div>
                                    <svg className="chart-svg" viewBox="0 0 200 60" preserveAspectRatio="none">
                                        <path
                                            d={panelIndex === 0
                                                ? "M0,45 Q30,30 50,35 T100,25 T150,30 T200,20"
                                                : panelIndex === 1
                                                    ? "M0,40 Q40,45 80,30 T120,35 T160,25 T200,30"
                                                    : "M0,50 Q50,35 100,40 T150,25 T200,15"
                                            }
                                            fill="none"
                                            stroke="#4A9FD4"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d={panelIndex === 0
                                                ? "M0,45 Q30,30 50,35 T100,25 T150,30 T200,20 V60 H0 Z"
                                                : panelIndex === 1
                                                    ? "M0,40 Q40,45 80,30 T120,35 T160,25 T200,30 V60 H0 Z"
                                                    : "M0,50 Q50,35 100,40 T150,25 T200,15 V60 H0 Z"
                                            }
                                            fill="url(#chartGradient)"
                                            opacity="0.3"
                                        />
                                        <defs>
                                            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#4A9FD4" />
                                                <stop offset="100%" stopColor="transparent" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="chart-footer">
                                        <span>12</span>
                                        <span>19</span>
                                        <span>26</span>
                                        <span>07</span>
                                        <span>14</span>
                                    </div>
                                </div>

                                {/* Stock Listings */}
                                <div className="stock-list">
                                    {stocks.map((stock, index) => (
                                        <div key={index} className="stock-item">
                                            <div className="stock-info">
                                                <div
                                                    className="stock-logo"
                                                    style={{ backgroundColor: stock.color }}
                                                >
                                                    {stock.symbol.charAt(0)}
                                                </div>
                                                <div className="stock-details">
                                                    <span className="stock-symbol">{stock.symbol}</span>
                                                    <span className="stock-name">{stock.name}</span>
                                                </div>
                                            </div>
                                            <div className="stock-price-info">
                                                <span className="stock-price">${stock.price}</span>
                                                <span className={`stock-change ${stock.positive ? 'positive' : 'negative'}`}>
                                                    {stock.change}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
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

            {/* Market Heatmap Section */}
            <section className="market-heatmap-section">
                <div className="section-header-centered">
                    <div className="section-tag-pill">
                        <span className="dot-blue"></span>
                        <span className="tag-text">Market Overview</span>
                    </div>
                    <h2 className="heatmap-heading">Real-Time Market Heatmap</h2>
                </div>

                <div className="heatmap-container">
                    <div className="heatmap-grid">
                        <div className="heatmap-box large red">
                            <span className="box-symbol">NVDA</span>
                            <span className="box-change">-1.21%</span>
                        </div>
                        <div className="heatmap-box medium green">
                            <span className="box-symbol">GOOGL</span>
                            <span className="box-change">+0.02%</span>
                        </div>
                        <div className="heatmap-box medium red">
                            <span className="box-symbol">MSFT</span>
                            <span className="box-change">-0.13%</span>
                        </div>
                        <div className="heatmap-box large green">
                            <span className="box-symbol">AAPL</span>
                            <span className="box-change">+0.13%</span>
                        </div>
                        <div className="heatmap-box medium red">
                            <span className="box-symbol">META</span>
                            <span className="box-change">-0.69%</span>
                        </div>
                        <div className="heatmap-box small red">
                            <span className="box-symbol">AMZN</span>
                            <span className="box-change">-0.19%</span>
                        </div>
                        <div className="heatmap-box small green">
                            <span className="box-symbol">TSLA</span>
                            <span className="box-change">-3.27%</span>
                        </div>
                        {/* More boxes can be added to fill the grid */}
                        <div className="heatmap-box extra-small green"></div>
                        <div className="heatmap-box extra-small red"></div>
                        <div className="heatmap-box extra-small green"></div>
                        <div className="heatmap-box extra-small red"></div>
                    </div>
                </div>
            </section>

            {/* Security Section */}
            <section className="security-priority-section">
                <div className="security-container">
                    <div className="security-header">
                        <div className="security-header-left">
                            <div className="section-tag">
                                <span className="star-icon">🛡️</span>
                                <span className="tag-text">Security</span>
                            </div>
                            <h2 className="security-title">Your Security, Our Priority</h2>
                        </div>
                        <div className="security-header-right">
                            <p className="security-intro">
                                {activeTabContent.desc}
                            </p>
                        </div>
                    </div>

                    <div className="security-tabs-control">
                        {securityTabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`security-tab-btn ${activeSecurityTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveSecurityTab(tab.id)}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>

                    <div className="security-content-area">
                        <div className="security-card">
                            <h3 className="card-feature-title">{activeTabContent.title}:</h3>
                            <p className="card-feature-text">{activeTabContent.text}</p>
                            <Link to="/about" className="about-us-btn">
                                About Us <span className="arrow">→</span>
                            </Link>
                        </div>
                        <div className="security-visual">
                            <img src={boxImage} alt="Security Visual" className="security-img" />
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
                        <div className="step-visual-bg" style={{ backgroundImage: `url(${require('./assets/step-register.png')})` }}></div>
                        <div className="step-info-overlay">
                            <h3 className="step-card-title">Register</h3>
                            <p className="step-card-text">Sign up for a BuckHolding Live Account with our hassle-free process.</p>
                        </div>
                    </div>
                    <div className="step-card">
                        <div className="step-number">02</div>
                        <div className="step-visual-bg" style={{ backgroundImage: `url(${require('./assets/step-fund.png')})` }}></div>
                        <div className="step-info-overlay">
                            <h3 className="step-card-title">Fund</h3>
                            <p className="step-card-text">Effortlessly fund your account with a wide range of channels and accepted currencies.</p>
                        </div>
                    </div>
                    <div className="step-card">
                        <div className="step-number">03</div>
                        <div className="step-visual-bg" style={{ backgroundImage: `url(${require('./assets/mee.jpg')})` }}></div>
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
                            <img src={require('./assets/you.jpg')} alt="Trading Analysis" className="why-us-img" />
                        </div>
                    </div>
                </div>
            </section>
            {/* Testimonials Section */}
            <section className="testimonials-section">
                <div className="section-header-top">
                    <div className="header-left">
                        <div className="section-tag-pill">
                            <span className="dot-blue"></span>
                            <span className="tag-text">Testimonial</span>
                        </div>
                        <h2 className="testimonials-heading">Genuine reviews from satisfied customers</h2>
                    </div>
                    <div className="header-right">
                        <Link to="/contact" className="contact-now-btn">
                            Contact Now <span className="arrow">→</span>
                        </Link>
                    </div>
                </div>

                <div className="testimonial-content">
                    <div className="testimonial-quote-box">
                        <p className="quote-text">
                            "The best place for anything stock trading. They are the best and they offer only the best companies that would make you alot of money. Will recomment anytime, anywhere, anyday!"
                        </p>
                        <div className="testimonial-author">
                            <img src={avatar1} alt="John Benson" className="author-img" />
                            <div className="author-info">
                                <h4 className="author-name">John Benson</h4>
                                <p className="author-role">Investor</p>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-side-note">
                        <p>
                            Northoldings reported Assets Under Custody (AUC) is currently totaling $8.9 billion. With 64% of funded customer accounts owned by North American investors. This growth is attributed to continued net deposits and higher valuations in equity and cryptocurrency holding.
                        </p>
                        <div className="testimonial-nav">
                            <button className="nav-circle prev">←</button>
                            <button className="nav-circle next">→</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trade Assets CTA Banner */}
            <section className="trade-assets-cta">
                <div className="cta-banner-card">
                    <div className="cta-visual">
                        <img src={require('./assets/step-fund.png')} alt="Global Markets" className="cta-img" />
                    </div>
                    <div className="cta-content">
                        <div className="section-tag">
                            <span className="star-icon">✦</span>
                            <span className="tag-text">Get Started</span>
                        </div>
                        <h2 className="cta-title">Trade assets from global markets</h2>
                        <p className="cta-desc">Capitalize on every opportunity with the world's most popular assets.</p>
                        <div className="cta-actions">
                            <Link to="/login" className="cta-btn primary-bg">Login</Link>
                            <Link to="/signup" className="cta-btn white-bg">Register</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs Section */}
            <section className="faq-section">
                <div className="section-header-top">
                    <div className="header-left">
                        <div className="section-tag-pill">
                            <span className="dot-blue"></span>
                            <span className="tag-text">FAQs</span>
                        </div>
                        <h2 className="faq-heading">Frequently Asked Questions</h2>
                    </div>
                    <div className="header-right">
                        <Link to="/contact" className="contact-now-btn">
                            Contact Now <span className="arrow">→</span>
                        </Link>
                    </div>
                </div>

                <div className="faq-grid">
                    <div className="faq-item">
                        <div className="faq-icon-circle">?</div>
                        <div className="faq-details">
                            <h3 className="faq-question">How do I start trading?</h3>
                            <p className="faq-answer">Sign up for an account, fund it, and you're ready to start trading.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <div className="faq-icon-circle">?</div>
                        <div className="faq-details">
                            <h3 className="faq-question">What types of accounts do you offer?</h3>
                            <p className="faq-answer">We offer individual, joint, and retirement accounts to meet your specific needs.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <div className="faq-icon-circle">?</div>
                        <div className="faq-details">
                            <h3 className="faq-question">Is my money safe?</h3>
                            <p className="faq-answer">Yes, your funds are held in secure accounts, and we employ robust security measures to protect your investments.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <div className="faq-icon-circle">?</div>
                        <div className="faq-details">
                            <h3 className="faq-question">What are the most popular stocks to trade today?</h3>
                            <p className="faq-answer">The most popular to trade are typically those that have high liquidity, volatility, and trading volume. In stock trading, liquidity basically means the ease at which a stock can be bought or sold with minimal price movement.</p>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
