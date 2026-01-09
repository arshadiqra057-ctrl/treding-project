import React from "react";
import { motion } from "framer-motion";
import "./Contact.css";

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="contact-container"
    >
      <h1>Contact Us</h1>
    </motion.div>
  );
};

export default Contact;
