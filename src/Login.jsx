import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api';
import './Auth.css';
import { motion } from 'framer-motion';

const Login = () => {
    const [formData, setFormData] = React.useState({
        email: '',
        password: ''
    });
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        // use input "name" attribute so we update the correct field
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        setError('');
        try {
            const response = await api.post('/login', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('isAdmin', response.data.user.is_admin ? 'true' : 'false');
            setLoading(false);
            // After login, send admins to admin panel and normal users to dashboard
            if (response.data.user.is_admin) {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setLoading(false);
            setError('Invalid credentials');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="auth-page"
        >
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-image-side">
                        <div className="auth-overlay">
                            <h2>Welcome Back!</h2>
                            <p>Continue your trading journey with the world's most trusted investment platform.</p>
                        </div>
                    </div>
                    <div className="auth-form-side">
                        <div className="auth-header">
                            <Link to="/" className="auth-logo">
                                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 5L35 15V25L20 35L5 25V15L20 5Z" fill="#4A9FD4" stroke="#4A9FD4" strokeWidth="2" />
                                    <path d="M12 18L20 12L28 18V26L20 32L12 26V18Z" fill="#1a3a5c" stroke="#4A9FD4" strokeWidth="1" />
                                </svg>
                            </Link>
                            <h1>Sign In</h1>
                            <p>Enter your details to access your account</p>
                        </div>

                        <form className="auth-form" onSubmit={handleSubmit}>
                            {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="name@company.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <div className="label-row">
                                    <label>Password</label>
                                    <a href="#!" className="forgot-link">Forgot password?</a>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-options">
                                <label className="checkbox-container">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                    Remember me
                                </label>
                            </div>

                            <button type="submit" className="auth-submit-btn" disabled={loading}>
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>Don't have an account? <Link to="/signup">Create account</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Login;
