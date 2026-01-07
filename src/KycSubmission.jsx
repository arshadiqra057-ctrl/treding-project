import React, { useState } from 'react';
import api from './api';
import { motion } from 'framer-motion';
import './Auth.css'; // Reusing auth styles for consistency

const KycSubmission = ({ isEmbedded }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [docType, setDocType] = useState('passport');
    const [docNumber, setDocNumber] = useState('');
    const [frontFile, setFrontFile] = useState(null);
    const [backFile, setBackFile] = useState(null);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Uploading...');

        const formData = new FormData();
        // Optional personal details (also stored on user, but useful for back-office review)
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('country', country);
        formData.append('city', city);

        formData.append('document_type', docType);
        formData.append('document_number', docNumber);
        formData.append('document_front', frontFile);
        if (backFile) formData.append('document_back', backFile);

        try {
            await api.post('/kyc/submit', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage('Documents submitted successfully! Waiting for approval.');
            setStatus('success');
        } catch (err) {
            setMessage('Upload failed: ' + (err.response?.data?.message || err.message));
            setStatus('error');
        }
    };

    const wrapperStyle = isEmbedded ? {} : {};

    return (
        <motion.div
            className={!isEmbedded ? "auth-page" : ""}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className={!isEmbedded ? "auth-container" : ""}>
                <div className="auth-card">
                    <div className="auth-form-side" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
                        <div className="auth-header">
                            <h1>Identity Verification</h1>
                            <p>To comply with regulations, please verify your identity.</p>
                        </div>

                        {message && (
                            <div className={`error-message ${status === 'success' ? 'success' : ''}`}
                                style={{
                                    color: status === 'success' ? 'green' : 'red',
                                    textAlign: 'center',
                                    marginBottom: '20px'
                                }}>
                                {message}
                            </div>
                        )}

                        <form className="auth-form" onSubmit={handleSubmit}>
                            {/* First & Last name on one row */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                        placeholder="Enter first name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                        placeholder="Enter last name"
                                    />
                                </div>
                            </div>

                            {/* City then Country on one row */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                        placeholder="Enter city"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Country</label>
                                    <input
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        required
                                        placeholder="Enter country"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Document Type</label>
                                <select value={docType} onChange={(e) => setDocType(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}>
                                    <option value="passport">Passport</option>
                                    <option value="id_card">National ID Card</option>
                                    <option value="driving_license">Driving License</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Document Number</label>
                                <input
                                    type="text"
                                    value={docNumber}
                                    onChange={(e) => setDocNumber(e.target.value)}
                                    required
                                    placeholder="Enter document number"
                                />
                            </div>

                            <div className="form-group">
                                <label>Front Image</label>
                                <input
                                    type="file"
                                    onChange={(e) => setFrontFile(e.target.files[0])}
                                    required
                                    accept="image/*"
                                />
                            </div>

                            <div className="form-group">
                                <label>Back Image (Optional)</label>
                                <input
                                    type="file"
                                    onChange={(e) => setBackFile(e.target.files[0])}
                                    accept="image/*"
                                />
                            </div>

                            <button type="submit" className="auth-submit-btn">Submit Documents</button>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default KycSubmission;
