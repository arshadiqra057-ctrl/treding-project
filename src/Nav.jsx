import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Nav.css';

function Nav() {
  return (
    
    <nav className="navbar">
      
      <ul className="nav-links">
      <li className="digital">
          <Link to="/">
            <span className="sky">L</span>
            <span className="black ">A </span>
            <span className="sky">D</span>
            <span className="sky ">i</span>
            <span className="black">g</span>
            <span className="sky">i</span>
            <span className="black">T</span>
            <span className="black">a</span>
            <span className="sky">L</span>
          </Link>
        </li>
        <span className="nav-links">
          <li><Link to="/">Home</Link></li>
        <li><Link to="/project">Portfolio</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li></span>
        
      </ul> 
                 
    </nav>
    
  );
}

export default Nav;