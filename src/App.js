import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home.jsx';
import Project from './Project.jsx';
import Services from './Services.jsx';
import Contact from './Contact.jsx';
import About from './About.jsx';
import Nav from './Nav.jsx'; 
import Footer from "./Footer/Footer.jsx";


function App() {
  return (
      
    <Router>
      <Nav />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/footer" element={<Footer />}/>
      </Routes>
        <Footer/>  
    </Router>
    
  );
}

export default App;