import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Contact.css";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    setShowToast(true);
    setFormData({ name: "", email: "", phone: "", message: "" });

    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <>
      <div className="contact">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h3><b>Contact Us</b></h3>
          <h1 className="font">We’d love to hear from you 💬</h1>
        </motion.div>

        <motion.div
          className="contact-container"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="left-side"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="let">Let's Get in Touch</h2>
            <p>
              Your privacy is important to us. We will never share your
              information or project request with anyone outside our
              organization.
            </p>
            <a href="mailto:ladigitalagency87@gmail.com">
              ladigitalagency87@gmail.com
            </a>
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
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="text"
              name="phone"
              placeholder="Contact phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Comment ..."
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
            >
              SUBMIT MESSAGE
            </motion.button>
          </motion.form>
        </motion.div>

        {/* 🔔 Toast Message Animation */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              className="toast"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <p>✅ Thank you for reaching out! We’ll contact you soon.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Contact;
