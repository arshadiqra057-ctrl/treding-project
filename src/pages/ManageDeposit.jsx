import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import DepositHistory from './DepositHistory';
import PaymentForm from './PaymentForm'; // Reusing existing stripe form logic
import api from '../services/api';
import './ManageDeposit.css';

const ManageDeposit = ({ defaultTab = 'new' }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(defaultTab); // 'new' or 'history'
    const [selectedMethod, setSelectedMethod] = useState('card'); // 'bank', 'crypto', 'card'
    const [showCryptoForm, setShowCryptoForm] = useState(false);

    // Update state if prop changes (e.g. navigation via sidebar)
    React.useEffect(() => {
        setActiveTab(defaultTab);
    }, [defaultTab]);

    // Accordion handler
    const toggleMethod = (method) => {
        if (selectedMethod !== method) {
            setShowCryptoForm(false); // Reset crypto step on change
        }
        setSelectedMethod(selectedMethod === method ? null : method);
    };

    // Determine sidebar active state based on tab
    const activeSidebarPage = activeTab === 'new' ? 'deposit-new' : 'deposit-history';

    return (
        <DashboardLayout activePage={activeSidebarPage}>
            <div className="manage-deposit-container">

                {/* Tabs */}
                <div className="deposit-tabs-header">
                    <button
                        className={`deposit-tab-btn ${activeTab === 'new' ? 'active' : ''}`}
                        onClick={() => setActiveTab('new')}
                    >
                        New Deposit
                    </button>
                    <button
                        className={`deposit-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        Deposit History
                    </button>
                </div>

                {/* Content Area */}
                <div className="deposit-content-area">
                    {activeTab === 'new' ? (
                        <div className="new-deposit-wrapper">
                            <div className="deposit-back-actions">
                                <button className="back-dash-btn" onClick={() => navigate('/dashboard')}>
                                    Back to Dashboard
                                </button>
                            </div>

                            {/* Card Icons Row */}
                            <div className="card-icons-row">
                                <div className="card-icon-box">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" style={{ height: '25px' }} /> :
                                    <span className="card-nums">**** **** **** 0000</span>
                                    <div className="card-meta">
                                        <span>Expiry date: 00/00</span>
                                        <span>Name: Your Name</span>
                                    </div>
                                </div>
                                <div className="card-icon-box">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" style={{ height: '25px' }} /> :
                                    <span className="card-nums">**** **** **** 0000</span>
                                    <div className="card-meta">
                                        <span>Expiry date: 00/00</span>
                                        <span>Name: Your Name</span>
                                    </div>
                                </div>
                                <div className="card-icon-box">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Discover_Card_logo.svg/2560px-Discover_Card_logo.svg.png" alt="Discover" style={{ height: '18px' }} /> :
                                    <span className="card-nums">**** **** **** 0000</span>
                                    <div className="card-meta">
                                        <span>Expiry date: 00/00</span>
                                        <span>Name: Your Name</span>
                                    </div>
                                </div>
                            </div>

                            <div className="payment-methods-accordion">
                                <div className="pm-header-label">Payment method</div>

                                {/* Bank Transfer */}
                                <div className={`pm-item ${selectedMethod === 'bank' ? 'active' : ''}`}>
                                    <div className="pm-title" onClick={() => toggleMethod('bank')}>
                                        <span>Bank Transfer</span>
                                        <span className="pm-icon">🏛️</span>
                                    </div>
                                    {selectedMethod === 'bank' && (
                                        <div className="pm-content">
                                            <p>Please transfer funds to the following account:</p>
                                            <div className="bank-details-box">
                                                <p><strong>Bank Name:</strong> Example Bank</p>
                                                <p><strong>Account Name:</strong> BuckHolding Corp</p>
                                                <p><strong>Account Number:</strong> 1234567890</p>
                                                <p><strong>Swift/BIC:</strong> EXBKAUS33</p>
                                                <p style={{ marginTop: '10px', fontSize: '0.85rem', color: '#666' }}>After transfer, please submit a support ticket with proof of payment.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Cryptocurrency */}
                                <div className={`pm-item ${selectedMethod === 'crypto' ? 'active' : ''}`}>
                                    <div className="pm-title" onClick={() => toggleMethod('crypto')}>
                                        <span>Cryptocurrency</span>
                                        <span className="pm-icon">₿</span>
                                    </div>
                                    {selectedMethod === 'crypto' && (
                                        <div className="pm-content">
                                            {!showCryptoForm ? (
                                                <div className="crypto-step-1">
                                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e293b' }}>Details</h3>
                                                    <p style={{ marginBottom: '0.5rem', color: '#475569' }}><strong>Product:</strong> Fund Account</p>
                                                    <p style={{ marginBottom: '1.5rem', color: '#64748b', lineHeight: '1.6' }}>
                                                        All deposits done using this channel will be processed by your Wallet/Exchange. Your account will automatically be funded as soon as the payment is confirmed on the Blockchain. Thank you for choosing BuckHolding.
                                                    </p>
                                                    <button
                                                        onClick={() => setShowCryptoForm(true)}
                                                        style={{
                                                            backgroundColor: '#10b981',
                                                            color: 'white',
                                                            border: 'none',
                                                            padding: '10px 20px',
                                                            borderRadius: '4px',
                                                            fontWeight: 'bold',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.5rem'
                                                        }}
                                                    >
                                                        <span style={{ fontSize: '1.2rem' }}>₿</span> Proceed via Crypto
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="crypto-design-container" style={{ padding: '0', background: 'transparent' }}>
                                                    {/* Design matching the screenshot: Dark Card with Blue Header */}
                                                    <div style={{ backgroundColor: '#0f172a', borderRadius: '8px', overflow: 'hidden', padding: '1rem' }}>

                                                        {/* Header */}
                                                        <div style={{ backgroundColor: '#3b82f6', color: 'white', padding: '10px', textAlign: 'center', fontWeight: 'bold', borderRadius: '4px 4px 0 0', marginBottom: '1rem' }}>
                                                            Deposit
                                                        </div>

                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>

                                                            {/* Left Column: Method Selection */}
                                                            <div style={{ flex: '1', minWidth: '250px', backgroundColor: 'white', borderRadius: '4px', padding: '1rem' }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                                                                    <input type="radio" checked readOnly style={{ marginRight: '10px', cursor: 'pointer' }} />
                                                                    <span style={{ fontWeight: '500' }}>Bitcoin</span>
                                                                    <span style={{ marginLeft: 'auto', color: '#64748b' }}>BTC</span>
                                                                </div>
                                                                {/* Add more coins here later if needed */}
                                                                <div style={{ marginTop: 'auto', height: '100px' }}></div> {/* Spacer to match height */}
                                                            </div>

                                                            {/* Right Column: Amount & Details */}
                                                            <div style={{ flex: '1', minWidth: '250px', backgroundColor: 'white', borderRadius: '4px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                                                                {/* Amount Input */}
                                                                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                                                    <span style={{ padding: '0 1rem', color: '#64748b' }}>Amount</span>
                                                                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                                                                        <span style={{ padding: '0 0.5rem', color: '#64748b' }}>$</span>
                                                                        <input type="number" placeholder="00.00" style={{ border: 'none', padding: '0.5rem', outline: 'none', width: '80px', textAlign: 'right' }} />
                                                                    </div>
                                                                </div>

                                                                {/* Details List */}
                                                                <div style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                        <span>Limit</span>
                                                                        <span>$10.00 USD - $100,000,000.00 USD</span>
                                                                    </div>
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                        <span>Processing Charge ⓘ</span>
                                                                        <span>0.00 USD</span>
                                                                    </div>
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '0.5rem', marginTop: '0.2rem' }}>
                                                                        <span>Total</span>
                                                                        <span style={{ fontWeight: 'bold', color: '#0f172a' }}>0.00 USD</span>
                                                                    </div>
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                        <span>Conversion</span>
                                                                        <span>1 USD = 0.00001 BTC</span>
                                                                    </div>
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                                                        <span>In ₿</span>
                                                                        <span>0.00</span>
                                                                    </div>
                                                                </div>

                                                                {/* Confirm Button */}
                                                                <button style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}>
                                                                    Deposit Confirm
                                                                </button>

                                                            </div>
                                                        </div>

                                                        <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '1rem', textAlign: 'center' }}>
                                                            Ensuring your funds grow safely through our secure deposit process with world-class payment options.
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Credit Card */}
                                <div className={`pm-item ${selectedMethod === 'card' ? 'active' : ''}`}>
                                    <div className="pm-title" onClick={() => toggleMethod('card')}>
                                        <span>Credit Card</span>
                                        <div className="card-logos-small">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png" height="12" alt="" />
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" height="12" alt="" />
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Discover_Card_logo.svg/2560px-Discover_Card_logo.svg.png" height="12" alt="" />
                                        </div>
                                    </div>
                                    {selectedMethod === 'card' && (
                                        <div className="pm-content card-form-content">
                                            <h3 className="pay-det-title">Payment Details</h3>
                                            <p className="pay-det-prod">Product: Fund Account</p>
                                            <p className="ssl-note">
                                                All Card information and payment processing are secured with <strong>SSL Secure Payment</strong>.
                                                Your encryption is protected by 256-bit SSL encryption.
                                            </p>

                                            {/* Embedding Stripe Payment Form here but styling it to match layout */}
                                            <div className="embedded-stripe-form">
                                                <PaymentForm isEmbedded={true} />
                                                {/* Note: PaymentForm normally has its own wrapper, we might need to adjust Styles slightly or verify appearance.
                                                    Alternatively, we rebuild PaymentForm fields here properly.
                                                    For now, using PaymentForm to ensure FUNCTIONALITY works.
                                                */}
                                            </div>

                                            <div className="terms-note">
                                                By proceeding with this payment option, you agree with our <a href="#">Terms of Service</a> and confirm that you have read our <a href="#">Privacy Policy</a>. You can cancel payment at any time.
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    ) : (
                        <div className="history-tab-wrapper">
                            {/* Reusing DepositHistory Component without Full Page Wrapper */}
                            <DepositHistory isEmbedded={true} />
                            {/* Use className hack or prop? DepositHistory has "auth-page" wrapper which adds padding. 
                                 We might want to strip that if isEmbedded.
                                 Since I cannot easily pass props to the standard export without modifying it heavily,
                                 I'll just let it render or modify DepositHistory slightly if needed.
                                 Looking at DepositHistory.jsx: it has <div className="auth-page" style={{ minHeight: '80vh', paddingTop: '80px' }}>
                                 I should probably make DepositHistory cleaner or just copy the table logic.
                                 Let's just update DepositHistory to accept a prop to remove styles.
                             */}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ManageDeposit;
