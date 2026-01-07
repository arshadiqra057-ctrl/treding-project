import React from "react";
import { Link } from "react-router-dom";
import './Nav.css';

function Nav() {
    return (
        <>
            {/* Announcement Bar */}
            <div className="announcement-bar">
                <span className="announcement-icon">⚙️</span>
                <span className="announcement-text">
                    <strong>Limited Time Offer:</strong> 0% Commission on All Trades! Sign up today.
                </span>
            </div>

            {/* Main Navbar */}
            <nav className="main-navbar">
                <div className="navbar-container">
                    {/* Logo */}
                    <Link to="/" className="navbar-logo">
                        <div className="logo-icon">
                            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 5L35 15V25L20 35L5 25V15L20 5Z" fill="#4A9FD4" stroke="#4A9FD4" strokeWidth="2" />
                                <path d="M12 18L20 12L28 18V26L20 32L12 26V18Z" fill="#1a3a5c" stroke="#4A9FD4" strokeWidth="1" />
                            </svg>
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <ul className="nav-menu">
                        <li><Link to="/" className="nav-link">Home</Link></li>
                        <li><Link to="/about" className="nav-link">About</Link></li>
                        <li><Link to="/compliance" className="nav-link">Compliance</Link></li>
                        <li><Link to="/support" className="nav-link">Support</Link></li>
                        {localStorage.getItem('isAdmin') === 'true' && (
                            <li><Link to="/admin" className="nav-link admin-link" style={{ color: '#4A9FD4' }}>Admin</Link></li>
                        )}
                    </ul>

                    {/* Auth Buttons */}
                    <div className="auth-buttons">
                        <Link to="/login" className="login-btn">Login</Link>
                        <Link to="/signup" className="signup-btn">
                            Sign Up <span className="arrow">→</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Nav;
