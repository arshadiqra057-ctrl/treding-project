import React from 'react';
import './Compliance.css';
import teamImage from '../assets/team-collaboration.png';
import { motion } from 'framer-motion';

const Compliance = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="compliance-page"
        >
            {/* Hero Section */}
            <section className="compliance-hero">
                <div className="container">
                    <h1 className="hero-title">Privacy Policy</h1>
                </div>
            </section>

            {/* Content Section */}
            <section className="compliance-content">
                <div className="container">
                    {/* Main Image */}
                    <div className="compliance-image-wrapper">
                        <img src={teamImage} alt="Compliance Team" className="compliance-hero-img" />
                    </div>

                    {/* Policy Text */}
                    <div className="policy-text-section">
                        <p className="intro-text">
                            BuckHolding ("we," "us," or "our") values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. Please read this policy carefully to understand our views and practices regarding your personal data.
                        </p>

                        <div className="policy-block">
                            <h2 className="section-title">1. Information We Collect</h2>
                            <p>We may collect and process the following types of information:</p>
                            <ul className="policy-list">
                                <li>
                                    <strong>Personal Information:</strong> Name, email address, phone number, mailing address, date of birth, and other identifiers you provide when registering for an account.
                                </li>
                                <li>
                                    <strong>Financial Information:</strong> Bank account details, payment card information, and transaction history necessary for processing your trades and payments.
                                </li>
                                <li>
                                    <strong>Usage Data:</strong> Information about your use of our website, including IP addresses, browser type, operating system, pages visited, and time spent on the site.
                                </li>
                                <li>
                                    <strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to enhance your experience and gather information about site usage.
                                </li>
                            </ul>
                        </div>

                        <div className="policy-block">
                            <h2 className="section-title">2. How We Use Your Information</h2>
                            <p>We use the information we collect for the following purposes:</p>
                            <ul className="policy-list">
                                <li>
                                    <strong>Account Management:</strong> To create and manage your account, process transactions, and provide customer support.
                                </li>
                                <li>
                                    <strong>Personalization:</strong> To personalize your experience and provide content and product offerings relevant to your interests.
                                </li>
                                <li>
                                    <strong>Security:</strong> To protect the security of your account and our platform, including fraud detection and prevention.
                                </li>
                                <li>
                                    <strong>Legal Compliance:</strong> To comply with legal obligations, respond to legal requests, and prevent harm to our rights, property, or safety.
                                </li>
                                <li>
                                    <strong>Marketing and Communication:</strong> To send you promotional materials and updates about our services, where permitted by law.
                                </li>
                            </ul>
                        </div>

                        <div className="policy-block">
                            <h2 className="section-title">3. How We Share Your Information</h2>
                            <p>We do not sell your personal information. We may share your information with third parties in the following situations:</p>
                            <ul className="policy-list">
                                <li>
                                    <strong>Service Providers:</strong> With trusted third-party service providers who perform services on our behalf, such as payment processing, data analysis, and customer service.
                                </li>
                                <li>
                                    <strong>Legal Obligations:</strong> When required to comply with legal processes or to protect the rights and safety of our company, customers, or others.
                                </li>
                                <li>
                                    <strong>Business Transfers:</strong> In the event of a merger, sale, or acquisition of all or a portion of our business, your information may be transferred as part of that transaction.
                                </li>
                            </ul>
                        </div>

                        <div className="policy-block">
                            <h2 className="section-title">4. Data Security</h2>
                            <p>We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction. However, no security measure is 100% secure, and we cannot guarantee the absolute security of your data.</p>
                        </div>

                        <div className="policy-block">
                            <h2 className="section-title">5. Your Rights</h2>
                            <p>You have the following rights regarding your personal data:</p>
                            <ul className="policy-list">
                                <li>
                                    <strong>Access and Correction:</strong> You can access and update your personal information through your account settings.
                                </li>
                                <li>
                                    <strong>Data Portability:</strong> You have the right to request a copy of the personal data we hold about you in a structured, commonly used, and machine-readable format.
                                </li>
                                <li>
                                    <strong>Deletion:</strong> You may request the deletion of your personal data, subject to legal and contractual obligations.
                                </li>
                                <li>
                                    <strong>Opt-Out:</strong> You can opt-out of receiving promotional communications by following the instructions in those messages or contacting us directly.
                                </li>
                            </ul>
                        </div>

                        <div className="policy-block">
                            <h2 className="section-title">8. Changes to This Privacy Policy</h2>
                            <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our website and updating the effective date. Your continued use of our services after any changes indicates your acceptance of the updated policy.</p>
                        </div>

                        <p className="outro-text">
                            By using our website and services, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our services.
                        </p>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Compliance;
