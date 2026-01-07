import React, { useState, useEffect } from 'react';
import api from './api';
import './AdminPanel.css';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { SiVisa, SiMastercard, SiDiscover, SiAmericanexpress } from 'react-icons/si';
import { FaUniversity, FaBitcoin, FaCreditCard, FaWallet, FaMoneyBillWave, FaExchangeAlt, FaChartLine, FaChevronRight } from 'react-icons/fa';

const stripePublishableKey =
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ||
    'pk_test_TYooMQauvdEDq54NiTphI7jx'; // fallback for local/dev

const stripePromise = loadStripe(stripePublishableKey).catch(err => {
    console.warn("Stripe.js failed to load. Card payments will be disabled.", err);
    return null;
});

// No mock data here anymore

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [users, setUsers] = useState([]);
    const [kycs, setKycs] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [userProfile, setUserProfile] = useState(null);

    // Transfer specific state
    const [transferData, setTransferData] = useState({
        amount: '',
        from: 'funding',
        to: 'holding'
    });
    const [historyFilters, setHistoryFilters] = useState({
        number: '',
        type: 'all',
        remark: 'any',
        stock: 'all'
    });

    const [supportTab, setSupportTab] = useState('my-tickets'); // 'new-ticket' or 'my-tickets'
    const [supportTickets, setSupportTickets] = useState([]);
    const [supportSubmenuOpen, setSupportSubmenuOpen] = useState(false);
    const [referralTab, setReferralTab] = useState('link'); // 'link' or 'referred-users'
    const [referralSubmenuOpen, setReferralSubmenuOpen] = useState(false);
    const [balances, setBalances] = useState({
        funding: 0.00,
        holding: 0.00
    });
    const [toasts, setToasts] = useState([]);
    const [kycForm, setKycForm] = useState({
        firstName: '', lastName: '', address: '', country: '', city: '',
        frontId: null, backId: null
    });
    const [kycLoading, setKycLoading] = useState(false);

    const showToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 5000);
    };

    // Sub-tab state for Transfer/Deposit section
    const [dashboardTab, setDashboardTab] = useState('account'); // 'account' or 'assets'
    const [financeTab, setFinanceTab] = useState('transfer');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [paymentSettings, setPaymentSettings] = useState(null);
    const [selectedSavedCard, setSelectedSavedCard] = useState(null);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000); // Polling every 10s for "real-time"
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const usersRes = await api.get('/admin/users');
            setUsers(usersRes.data);

            const kycRes = await api.get('/admin/kyc-pending');
            setKycs(kycRes.data);

            const transRes = await api.get('/admin/transactions');
            setTransactions(transRes.data);

            const settingsRes = await api.get('/admin/payment-settings');
            setPaymentSettings(settingsRes.data);

            const stocksRes = await api.get('/admin/stocks');
            const parsedStocks = stocksRes.data.map(s => ({
                ...s,
                value: parseFloat(s.value),
                change: parseFloat(s.change),
                chgPct: parseFloat(s.chgPct),
                open: parseFloat(s.open),
                high: parseFloat(s.high),
                low: parseFloat(s.low),
                prev: parseFloat(s.prev)
            }));
            setStocks(parsedStocks);

            const supportRes = await api.get('/support/tickets');
            setSupportTickets(supportRes.data);

            const meRes = await api.get('/admin/me');
            setUserProfile(meRes.data);
            setBalances({
                funding: parseFloat(meRes.data.funding_balance),
                holding: parseFloat(meRes.data.holding_balance)
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleKycAction = async (id, status, reason = '') => {
        try {
            await api.post(`/admin/kyc-update/${id}`, { status, rejection_reason: reason });
            fetchData();
        } catch (err) {
            showToast('Action failed', 'error');
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await api.delete(`/admin/users/${id}`);
            fetchData();
        } catch (err) {
            showToast(err.response?.data?.message || 'Delete failed', 'error');
        }
    };

    const handleTransfer = async (e) => {
        e.preventDefault();
        const amt = parseFloat(transferData.amount);
        if (isNaN(amt) || amt <= 0) {
            showToast('Please enter a valid amount', 'info');
            return;
        }

        try {
            const res = await api.post('/admin/transfer', transferData);
            setBalances({
                funding: parseFloat(res.data.user.funding_balance),
                holding: parseFloat(res.data.user.holding_balance)
            });
            showToast(res.data.message);
            setTransferData({ ...transferData, amount: '' });
        } catch (err) {
            showToast(err.response?.data?.message || 'Transfer failed', 'error');
        }
    };

    const handleTransactionUpdate = async (id, status) => {
        try {
            await api.post(`/admin/transaction-update/${id}`, { status });
            showToast(`Transaction ${status} successfully!`);
            fetchData();
        } catch (err) {
            showToast(err.response?.data?.message || 'Update failed', 'error');
        }
    };

    const filteredStocks = stocks.filter(s =>
        s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderContent = () => {
        if (loading && activeTab !== 'stocks' && activeTab !== 'transfer' && activeTab !== 'deposits') return <div className="loading-spinner">Loading dashboard data...</div>;

        switch (activeTab) {
            case 'dashboard':
                const totalAssets = balances.funding + balances.holding;
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="dashboard-content">
                        {/* KYC Banner */}
                        {userProfile?.kyc_record?.status !== 'approved' && (
                            <div className="kyc-warning-banner">
                                <div className="kyc-banner-header">KYC Verification required</div>
                                <div className="kyc-banner-body">
                                    Complete KYC to unlock the full potential of our platform! KYC helps us verify your identity and keep things secure. It is quick and easy just follow the on-screen instructions. Get started with KYC verification now!
                                    <br />
                                    <span
                                        className="kyc-link"
                                        onClick={() => setActiveTab('kyc')}
                                        style={{ cursor: 'pointer', color: '#4A9FD4', textDecoration: 'underline', marginTop: '5px', display: 'inline-block' }}
                                    >
                                        Click Here to Submit Documents
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className="assets-section">
                            <span className="assets-label">Total Assets</span>
                            <div className="total-assets-value">${totalAssets.toFixed(2)} USD</div>
                        </div>

                        <div className="quick-actions-grid">
                            <div className="action-item" onClick={() => { setActiveTab('deposits'); setFinanceTab('new-deposit'); setPaymentMethod('bank'); }}>
                                <div className="action-icon-box"><FaWallet /></div>
                                <span>Deposit</span>
                            </div>
                            <div className="action-item" onClick={() => setActiveTab('kyc')}>
                                <div className="action-icon-box"><FaMoneyBillWave /></div>
                                <span>Withdraw</span>
                            </div>
                            <div className="action-item" onClick={() => { setActiveTab('transfer'); setFinanceTab('transfer'); }}>
                                <div className="action-icon-box"><FaExchangeAlt /></div>
                                <span>Transfer</span>
                            </div>
                            <div className="action-item" onClick={() => setActiveTab('stocks')}>
                                <div className="action-icon-box"><FaChartLine /></div>
                                <span>Invest</span>
                            </div>
                        </div>

                        <div className="dashboard-tabs-container">
                            <div className="dashboard-tabs">
                                <button
                                    className={`dash-tab ${dashboardTab === 'account' ? 'active' : ''}`}
                                    onClick={() => setDashboardTab('account')}
                                >
                                    Account
                                </button>
                                <button
                                    className={`dash-tab ${dashboardTab === 'assets' ? 'active' : ''}`}
                                    onClick={() => setDashboardTab('assets')}
                                >
                                    Assets
                                </button>
                            </div>
                            <div className="tab-underline"></div>
                        </div>

                        <div className="dashboard-tab-content">
                            {dashboardTab === 'account' ? (
                                <div className="account-list">
                                    <div className="balance-row">
                                        <div className="balance-info">
                                            <span className="balance-name">Funding</span>
                                            <span className="balance-amount">${balances.funding.toFixed(2)} USD</span>
                                        </div>
                                        <FaChevronRight className="row-arrow" />
                                    </div>
                                    <div className="balance-row">
                                        <div className="balance-info">
                                            <span className="balance-name">Holdings</span>
                                            <span className="balance-amount">${balances.holding.toFixed(2)} USD</span>
                                        </div>
                                        <FaChevronRight className="row-arrow" />
                                    </div>
                                    <div className="balance-row">
                                        <div className="balance-info">
                                            <span className="balance-name">Total Withdraw</span>
                                            <span className="balance-amount">$0.00 USD</span>
                                        </div>
                                        <FaChevronRight className="row-arrow" />
                                    </div>
                                    <div className="balance-row">
                                        <div className="balance-info">
                                            <span className="balance-name">Bonus</span>
                                            <span className="balance-amount">$0.00 USD</span>
                                        </div>
                                        <FaChevronRight className="row-arrow" />
                                    </div>
                                </div>
                            ) : (
                                <div className="assets-list-placeholder">
                                    <p style={{ color: '#64748b', padding: '20px' }}>No assets currently held.</p>
                                </div>
                            )}
                        </div>

                        {/* Energy ETF Section */}
                        <div className="etf-section">
                            <div className="etf-header">
                                <h3 className="etf-title">Energy (oil, gas, drilling and petroleum distribution companies):</h3>
                                <p className="etf-description">It uses AI to trade different energy ETF's to generate profit.</p>
                                <span className="etf-invest-link" onClick={() => setActiveTab('stocks')}>Invest</span>
                            </div>
                            <div className="etf-stocks-list">
                                {stocks.filter(s => s.category === 'energy').map((s, idx) => (
                                    <div className="etf-stock-row" key={idx}>
                                        <div className="etf-stock-info">
                                            <div className="etf-stock-icon" style={{ background: s.color }}>{s.symbol[0]}</div>
                                            <div className="etf-stock-details">
                                                <span className="etf-symbol">{s.symbol}<sup>©</sup></span>
                                                <span className="etf-name">{s.name}</span>
                                            </div>
                                        </div>
                                        <div className="etf-stock-price">
                                            <span className="etf-value">{s.value.toFixed(2)}</span>
                                            <span className={`etf-change ${s.chgPct >= 0 ? 'positive' : 'negative'}`}>
                                                {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)} {s.chgPct >= 0 ? '+' : ''}{s.chgPct.toFixed(2)}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Construction ETF Section */}
                        <div className="etf-section">
                            <div className="etf-header">
                                <h3 className="etf-title">Construction ETF's:</h3>
                                <p className="etf-description">It uses AI to trade different construction ETF's to generate profit.</p>
                                <span className="etf-invest-link" onClick={() => setActiveTab('stocks')}>Invest</span>
                            </div>
                            <div className="etf-stocks-list">
                                {stocks.filter(s => s.category === 'construction').map((s, idx) => (
                                    <div className="etf-stock-row" key={idx}>
                                        <div className="etf-stock-info">
                                            <div className="etf-stock-icon" style={{ background: s.color }}>{s.symbol[0]}</div>
                                            <div className="etf-stock-details">
                                                <span className="etf-symbol">{s.symbol}<sup>©</sup></span>
                                                <span className="etf-name">{s.name}</span>
                                            </div>
                                        </div>
                                        <div className="etf-stock-price">
                                            <span className="etf-value">{s.value.toFixed(2)}</span>
                                            <span className={`etf-change ${s.chgPct >= 0 ? 'positive' : 'negative'}`}>
                                                {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)} {s.chgPct >= 0 ? '+' : ''}{s.chgPct.toFixed(2)}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Crypto Data Mining Section */}
                        <div className="etf-section">
                            <div className="etf-header">
                                <h3 className="etf-title">Crypto Data Mining:</h3>
                                <p className="etf-description">It uses AI to trade cryptocurrency mining companies to generate profit.</p>
                                <span className="etf-invest-link" onClick={() => setActiveTab('stocks')}>Invest</span>
                            </div>
                            <div className="etf-stocks-list">
                                {stocks.filter(s => s.category === 'crypto_mining').map((s, idx) => (
                                    <div className="etf-stock-row" key={idx}>
                                        <div className="etf-stock-info">
                                            <div className="etf-stock-icon" style={{ background: s.color }}>{s.symbol[0]}</div>
                                            <div className="etf-stock-details">
                                                <span className="etf-symbol">{s.symbol}<sup>©</sup></span>
                                                <span className="etf-name">{s.name}</span>
                                            </div>
                                        </div>
                                        <div className="etf-stock-price">
                                            <span className="etf-value">{s.value.toFixed(2)}</span>
                                            <span className={`etf-change ${s.chgPct >= 0 ? 'positive' : 'negative'}`}>
                                                {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)} {s.chgPct >= 0 ? '+' : ''}{s.chgPct.toFixed(2)}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Binance/Crypto Trading Section */}
                        <div className="etf-section">
                            <div className="etf-header">
                                <h3 className="etf-title">Binance & Crypto Trading:</h3>
                                <p className="etf-description">It uses AI to trade crypto exchanges and blockchain platforms to generate profit.</p>
                                <span className="etf-invest-link" onClick={() => setActiveTab('stocks')}>Invest</span>
                            </div>
                            <div className="etf-stocks-list">
                                {stocks.filter(s => s.category === 'crypto_trading').map((s, idx) => (
                                    <div className="etf-stock-row" key={idx}>
                                        <div className="etf-stock-info">
                                            <div className="etf-stock-icon" style={{ background: s.color }}>{s.symbol[0]}</div>
                                            <div className="etf-stock-details">
                                                <span className="etf-symbol">{s.symbol}<sup>©</sup></span>
                                                <span className="etf-name">{s.name}</span>
                                            </div>
                                        </div>
                                        <div className="etf-stock-price">
                                            <span className="etf-value">{s.value.toFixed(2)}</span>
                                            <span className={`etf-change ${s.chgPct >= 0 ? 'positive' : 'negative'}`}>
                                                {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)} {s.chgPct >= 0 ? '+' : ''}{s.chgPct.toFixed(2)}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                );
            case 'users':
                return (
                    <div className="data-card">
                        <div className="data-table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>KYC Status</th>
                                        <th>Joined</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(u => (
                                        <tr key={u.id}>
                                            <td>{u.name}</td>
                                            <td>{u.email}</td>
                                            <td>
                                                <span className={`status-badge ${u.kyc_record?.status || 'none'}`}>
                                                    {u.kyc_record?.status || 'Not Submitted'}
                                                </span>
                                            </td>
                                            <td>{new Date(u.created_at).toLocaleDateString()}</td>
                                            <td>
                                                <button className="view-link" style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Edit</button>
                                                <button className="delete-btn" onClick={() => handleDeleteUser(u.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'kyc':
                return (
                    <div className="kyc-form-container">
                        <div className="kyc-form-card">
                            <h2 className="kyc-form-title">KYC Form</h2>
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                setKycLoading(true);
                                const formData = new FormData();
                                formData.append('first_name', kycForm.firstName);
                                formData.append('last_name', kycForm.lastName);
                                formData.append('address', kycForm.address);
                                formData.append('country', kycForm.country);
                                formData.append('city', kycForm.city);
                                formData.append('document_type', 'id_card');
                                formData.append('document_number', `${kycForm.firstName}-${Date.now()}`);
                                // These keys MUST match Laravel's KycController expectations:
                                // 'document_front' and 'document_back'
                                if (kycForm.frontId) formData.append('document_front', kycForm.frontId);
                                if (kycForm.backId) formData.append('document_back', kycForm.backId);
                                try {
                                    await api.post('/kyc/submit', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                                    showToast('KYC submitted successfully!', 'success');
                                    setActiveTab('dashboard');
                                    fetchData();
                                } catch (err) {
                                    showToast(err.response?.data?.message || 'KYC submission failed', 'error');
                                } finally {
                                    setKycLoading(false);
                                }
                            }}>
                                <div className="kyc-form-row">
                                    <div className="kyc-input-group">
                                        <label>First Name <span className="required">*</span></label>
                                        <input type="text" value={kycForm.firstName} onChange={(e) => setKycForm({ ...kycForm, firstName: e.target.value })} required />
                                    </div>
                                    <div className="kyc-input-group">
                                        <label>Last Name <span className="required">*</span></label>
                                        <input type="text" value={kycForm.lastName} onChange={(e) => setKycForm({ ...kycForm, lastName: e.target.value })} required />
                                    </div>
                                </div>
                                <div className="kyc-form-row">
                                    <div className="kyc-input-group">
                                        <label>Address <span className="required">*</span></label>
                                        <input type="text" value={kycForm.address} onChange={(e) => setKycForm({ ...kycForm, address: e.target.value })} required />
                                    </div>
                                    <div className="kyc-input-group">
                                        <label>Country <span className="required">*</span></label>
                                        <input type="text" value={kycForm.country} onChange={(e) => setKycForm({ ...kycForm, country: e.target.value })} required />
                                    </div>
                                </div>
                                <div className="kyc-form-row single">
                                    <div className="kyc-input-group">
                                        <label>City <span className="required">*</span></label>
                                        <input type="text" value={kycForm.city} onChange={(e) => setKycForm({ ...kycForm, city: e.target.value })} required />
                                    </div>
                                </div>
                                <div className="kyc-file-group">
                                    <label>Front ID <span className="info-icon">ℹ️</span> <span className="required">*</span></label>
                                    <div className="file-input-wrapper">
                                        <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => setKycForm({ ...kycForm, frontId: e.target.files[0] })} required />
                                    </div>
                                    <span className="file-hint">Supported mimes: jpg, jpeg, png, pdf</span>
                                </div>
                                <div className="kyc-file-group">
                                    <label>Back ID <span className="info-icon">ℹ️</span> <span className="required">*</span></label>
                                    <div className="file-input-wrapper">
                                        <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => setKycForm({ ...kycForm, backId: e.target.files[0] })} required />
                                    </div>
                                    <span className="file-hint">Supported mimes: jpg, jpeg, png, pdf</span>
                                </div>
                                <button type="submit" className="kyc-submit-btn" disabled={kycLoading}>
                                    {kycLoading ? 'Submitting...' : 'Submit'}
                                </button>
                            </form>
                        </div>
                    </div>
                );
            case 'stocks':
                return (
                    <div className="data-card">
                        <div className="data-table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Value</th>
                                        <th>Change</th>
                                        <th>Chg%</th>
                                        <th>Open</th>
                                        <th>High</th>
                                        <th>Low</th>
                                        <th>Prev</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStocks.map((s, idx) => (
                                        <tr key={idx}>
                                            <td className="stock-name-cell">
                                                <div className="stock-icon" style={{ background: s.color }}>{s.symbol[0]}</div>
                                                <div>
                                                    <strong>{s.symbol}</strong><br />
                                                    <small style={{ color: '#64748b' }}>{s.name}</small>
                                                </div>
                                            </td>
                                            <td>{s.value.toFixed(2)}</td>
                                            <td className={s.change >= 0 ? 'pos-change' : 'neg-change'}>
                                                {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)}
                                            </td>
                                            <td className={s.chgPct >= 0 ? 'pos-change' : 'neg-change'}>
                                                {s.chgPct >= 0 ? '+' : ''}{s.chgPct.toFixed(2)}%
                                            </td>
                                            <td>{s.open.toFixed(2)}</td>
                                            <td>{s.high.toFixed(2)}</td>
                                            <td>{s.low.toFixed(2)}</td>
                                            <td>{s.prev.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'transfer':
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="finance-section">
                        <div className="transfer-hub">
                            <div className="balance-grid" style={{ marginBottom: '30px' }}>
                                <div className="balance-box" style={{ background: '#0f172a', padding: '30px', borderRadius: '12px', color: 'white' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Funding Balance</span>
                                    <h2 style={{ fontSize: '2rem', margin: '10px 0' }}>${balances.funding.toFixed(2)} USD</h2>
                                    <span style={{ fontSize: '0.75rem', color: '#10b981' }}>● Available</span>
                                </div>
                                <div className="balance-box" style={{ background: '#0f172a', padding: '30px', borderRadius: '12px', color: 'white' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Holding Balance</span>
                                    <h2 style={{ fontSize: '2rem', margin: '10px 0' }}>${balances.holding.toFixed(2)} USD</h2>
                                    <span style={{ fontSize: '0.75rem', color: '#3b82f6' }}>● In-Work</span>
                                </div>
                            </div>

                            <form onSubmit={handleTransfer} className="transfer-form-card" style={{ background: '#0f172a', padding: '40px', borderRadius: '12px', maxWidth: '600px' }}>
                                <h3 style={{ color: 'white', marginBottom: '25px' }}>Transfer Your Balance</h3>
                                <div className="form-group" style={{ marginBottom: '20px' }}>
                                    <label style={{ color: '#94a3b8', textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '8px', display: 'block' }}>Enter Amount</label>
                                    <input
                                        type="number"
                                        style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: 'white', padding: '12px', borderRadius: '6px' }}
                                        placeholder="0.00"
                                        value={transferData.amount}
                                        onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
                                    <div className="form-group">
                                        <label style={{ color: '#94a3b8', textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '8px', display: 'block' }}>Transfer From</label>
                                        <select
                                            style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: 'white', padding: '12px', borderRadius: '6px' }}
                                            value={transferData.from}
                                            onChange={(e) => setTransferData({ ...transferData, from: e.target.value })}
                                        >
                                            <option value="funding">Funding Balance</option>
                                            <option value="holding">Holding Balance</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label style={{ color: '#94a3b8', textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '8px', display: 'block' }}>Transfer To</label>
                                        <select
                                            style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: 'white', padding: '12px', borderRadius: '6px' }}
                                            value={transferData.to}
                                            onChange={(e) => setTransferData({ ...transferData, to: e.target.value })}
                                        >
                                            <option value="holding">Holding Balance</option>
                                            <option value="funding">Funding Balance</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="make-payment-btn" style={{ background: '#0077b6', color: 'white', width: '100%', padding: '15px', fontWeight: '700' }}>Transfer Now</button>
                            </form>
                        </div>
                    </motion.div>
                );
            case 'deposits':
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="finance-section">
                        <div className="finance-tabs" style={{ display: 'flex', gap: '30px', marginBottom: '30px', borderBottom: '1px solid #e2e8f0' }}>
                            <button
                                className={`finance-tab-link ${financeTab === 'new-deposit' ? 'active' : ''}`}
                                onClick={() => setFinanceTab('new-deposit')}
                                style={{ padding: '15px 5px', borderBottom: financeTab === 'new-deposit' ? '3px solid #0077b6' : '3px solid transparent', color: financeTab === 'new-deposit' ? '#0077b6' : '#64748b', fontWeight: financeTab === 'new-deposit' ? '700' : '500', transition: 'all 0.3s' }}
                            >
                                New Deposit
                            </button>
                            <button
                                className={`finance-tab-link ${financeTab === 'deposit-history' ? 'active' : ''}`}
                                onClick={() => setFinanceTab('deposit-history')}
                                style={{ padding: '15px 5px', borderBottom: financeTab === 'deposit-history' ? '3px solid #0077b6' : '3px solid transparent', color: financeTab === 'deposit-history' ? '#0077b6' : '#64748b', fontWeight: financeTab === 'deposit-history' ? '700' : '500', transition: 'all 0.3s' }}
                            >
                                Deposit History
                            </button>
                        </div>

                        {(financeTab === 'new-deposit' || financeTab === 'transfer') && (
                            <div className="deposit-container">
                                <button
                                    onClick={() => setActiveTab('dashboard')}
                                    className="make-payment-btn"
                                    style={{ marginBottom: '20px', padding: '10px 20px', fontSize: '0.8rem' }}
                                >
                                    Back to Dashboard
                                </button>
                                <div className="saved-cards-grid">
                                    <div className={`payment-card ${selectedSavedCard === 'visa' ? 'active-selection' : ''}`} onClick={() => setSelectedSavedCard('visa')} style={{ position: 'relative', border: selectedSavedCard === 'visa' ? '2px solid #0077b6' : '1px solid #edf2f7', cursor: 'pointer' }}>
                                        <div className="card-brand visa"><SiVisa size={40} /></div>
                                        <div className="card-number-display">**** **** **** 4242</div>
                                        <div className="card-info-row">
                                            <span>Expiry date: 00/00</span>
                                            <span>Name: Your Name</span>
                                        </div>
                                        {selectedSavedCard === 'visa' && <div style={{ position: 'absolute', top: '15px', right: '15px', color: '#0077b6', fontWeight: 'bold', fontSize: '0.7rem' }}>SELECTED</div>}
                                    </div>
                                    <div className={`payment-card ${selectedSavedCard === 'mastercard' ? 'active-selection' : ''}`} onClick={() => setSelectedSavedCard('mastercard')} style={{ position: 'relative', border: selectedSavedCard === 'mastercard' ? '2px solid #0077b6' : '1px solid #edf2f7', cursor: 'pointer' }}>
                                        <div className="card-brand mastercard"><SiMastercard size={40} /></div>
                                        <div className="card-number-display">**** **** **** 5555</div>
                                        <div className="card-info-row">
                                            <span>Expiry date: 00/00</span>
                                            <span>Name: Your Name</span>
                                        </div>
                                        {selectedSavedCard === 'mastercard' && <div style={{ position: 'absolute', top: '15px', right: '15px', color: '#0077b6', fontWeight: 'bold', fontSize: '0.7rem' }}>SELECTED</div>}
                                    </div>
                                    <div className={`payment-card ${selectedSavedCard === 'discover' ? 'active-selection' : ''}`} onClick={() => setSelectedSavedCard('discover')} style={{ position: 'relative', border: selectedSavedCard === 'discover' ? '2px solid #0077b6' : '1px solid #edf2f7', cursor: 'pointer' }}>
                                        <div className="card-brand discover"><SiDiscover size={40} /></div>
                                        <div className="card-number-display">**** **** **** 0000</div>
                                        <div className="card-info-row">
                                            <span>Expiry date: 00/00</span>
                                            <span>Name: Your Name</span>
                                        </div>
                                        {selectedSavedCard === 'discover' && <div style={{ position: 'absolute', top: '15px', right: '15px', color: '#0077b6', fontWeight: 'bold', fontSize: '0.7rem' }}>SELECTED</div>}
                                    </div>
                                </div>

                                <div className="payment-method-section">
                                    <div className="section-header">Payment method</div>
                                    <div
                                        className={`method-item ${paymentMethod === 'bank' ? 'active-method' : ''}`}
                                        onClick={() => setPaymentMethod('bank')}
                                    >
                                        <span className="method-name" style={{ color: paymentMethod === 'bank' ? '#0077b6' : 'inherit', textDecoration: paymentMethod === 'bank' ? 'underline' : 'none' }}>Bank Transfer</span>
                                        <span className="method-icons"><FaUniversity color="#64748b" size={20} /></span>
                                    </div>
                                    <div
                                        className={`method-item ${paymentMethod === 'crypto' ? 'active-method' : ''}`}
                                        onClick={() => setPaymentMethod('crypto')}
                                    >
                                        <span className="method-name" style={{ color: paymentMethod === 'crypto' ? '#0077b6' : 'inherit', textDecoration: paymentMethod === 'crypto' ? 'underline' : 'none' }}>Cryptocurrency</span>
                                        <span className="method-icons"><FaBitcoin color="#f7931a" size={20} /></span>
                                    </div>
                                    <div
                                        className={`method-item ${paymentMethod === 'card' ? 'active-method' : ''}`}
                                        style={{ borderBottom: 'none' }}
                                        onClick={() => setPaymentMethod('card')}
                                    >
                                        <span className="method-name" style={{ color: paymentMethod === 'card' ? '#0077b6' : 'inherit', textDecoration: paymentMethod === 'card' ? 'underline' : 'none' }}>Credit Card</span>
                                        <span className="method-icons" style={{ display: 'flex', gap: '5px' }}>
                                            <SiAmericanexpress color="#007bc1" size={18} />
                                            <SiMastercard color="#eb001b" size={18} />
                                            <SiDiscover color="#ff6000" size={18} />
                                        </span>
                                    </div>

                                    <div className="payment-details-container">
                                        <div className="details-info">
                                            <h3>{paymentMethod === 'card' ? 'Payment Details' : 'Details'}</h3>
                                            <p><strong>Product::</strong> Fund Account</p>
                                            {paymentMethod === 'card' && (
                                                <>
                                                    <p>All Card information and payment processing are secured with <strong>SSL Secure Payment</strong>. Your encryption is protected by 256-bit SSL encryption.</p>
                                                    <p>By proceeding with this payment option, you agree with our <a href="#">Terms of Service</a> and confirm that you have read our <a href="#">Privacy Policy</a>. You can cancel payment at any time.</p>
                                                </>
                                            )}
                                            {paymentMethod === 'bank' && (
                                                <>
                                                    <p>All deposits done using this channel will be processed by your Bank. Your account will automatically be funded as soon as the payment is confirmed. Thank you for choosing BuckHolding.</p>
                                                </>
                                            )}
                                            {paymentMethod === 'crypto' && (
                                                <>
                                                    <p>All deposits done using this channel will be processed by your Wallet/Exchange. Your account will automatically be funded as soon as the payment is confirmed on the Blockchain. Thank you for choosing BuckHolding.</p>
                                                </>
                                            )}
                                        </div>

                                        <div className="payment-form">
                                            {paymentMethod === 'card' ? (
                                                <Elements stripe={stripePromise}>
                                                    <DepositForm
                                                        showToast={showToast}
                                                        onSuccess={() => {
                                                            fetchData();
                                                            setFinanceTab('deposit-history');
                                                        }}
                                                    />
                                                </Elements>
                                            ) : paymentMethod === 'bank' ? (
                                                <BankDepositForm
                                                    settings={paymentSettings?.bank}
                                                    showToast={showToast}
                                                    onSuccess={() => {
                                                        fetchData();
                                                        setFinanceTab('deposit-history');
                                                    }}
                                                />
                                            ) : (
                                                <CryptoDepositForm
                                                    settings={paymentSettings?.crypto}
                                                    showToast={showToast}
                                                    onSuccess={() => {
                                                        fetchData();
                                                        setFinanceTab('deposit-history');
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {financeTab === 'deposit-history' && (
                            <div className="deposit-history-view">
                                <div className="data-card">
                                    <div className="data-table-container">
                                        <table className="admin-table">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Method</th>
                                                    <th>Amount</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {transactions.filter(t => t.type === 'deposit').map(t => (
                                                    <tr key={t.id}>
                                                        <td>{new Date(t.created_at).toLocaleString()}</td>
                                                        <td style={{ textTransform: 'capitalize' }}>
                                                            {t.from_account === 'external' ? 'Credit Card' : t.from_account}
                                                        </td>
                                                        <td style={{ fontWeight: '700' }}>${parseFloat(t.amount).toFixed(2)}</td>
                                                        <td>
                                                            <span className={`status-badge ${t.status}`}>
                                                                {t.status}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {t.status === 'pending' && (
                                                                <div style={{ display: 'flex', gap: '5px' }}>
                                                                    <button
                                                                        onClick={() => handleTransactionUpdate(t.id, 'completed')}
                                                                        className="kyc-action-btn approve"
                                                                        style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                                                                    >
                                                                        Approve
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleTransactionUpdate(t.id, 'rejected')}
                                                                        className="kyc-action-btn reject"
                                                                        style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                                                                    >
                                                                        Reject
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                                {transactions.filter(t => t.type === 'deposit').length === 0 && (
                                                    <tr>
                                                        <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No deposit history found.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                );
            case 'history':
                const filteredTransactions = transactions.filter(t => {
                    const matchNumber = historyFilters.number ? t.id.toString().includes(historyFilters.number) : true;
                    let matchType = true;
                    if (historyFilters.type === 'plus') matchType = t.amount > 0 && (t.type === 'deposit' || (t.type === 'transfer' && t.to_account === 'funding'));
                    if (historyFilters.type === 'minus') matchType = t.amount > 0 && (t.type === 'withdraw' || (t.type === 'transfer' && t.from_account === 'funding'));

                    let matchRemark = true;
                    if (historyFilters.remark === 'Balance add') matchRemark = t.type === 'deposit';
                    if (historyFilters.remark === 'Withdraw') matchRemark = t.type === 'withdraw';

                    return matchNumber && matchType && matchRemark;
                });

                return (
                    <div className="transaction-history-view">
                        <div className="filter-bar-card">
                            <div className="filter-grid">
                                <div className="filter-item">
                                    <label>Transaction Number</label>
                                    <input
                                        type="text"
                                        placeholder="Search by ID..."
                                        value={historyFilters.number}
                                        onChange={(e) => setHistoryFilters({ ...historyFilters, number: e.target.value })}
                                    />
                                </div>
                                <div className="filter-item">
                                    <label>Type</label>
                                    <select
                                        value={historyFilters.type}
                                        onChange={(e) => setHistoryFilters({ ...historyFilters, type: e.target.value })}
                                    >
                                        <option value="all">All</option>
                                        <option value="plus">Plus</option>
                                        <option value="minus">Minus</option>
                                    </select>
                                </div>
                                <div className="filter-item">
                                    <label>Remark</label>
                                    <select
                                        value={historyFilters.remark}
                                        onChange={(e) => setHistoryFilters({ ...historyFilters, remark: e.target.value })}
                                    >
                                        <option value="any">Any</option>
                                        <option value="Balance add">Balance add</option>
                                        <option value="Withdraw">Withdraw</option>
                                    </select>
                                </div>
                                <div className="filter-item">
                                    <label>Stock</label>
                                    <select
                                        value={historyFilters.stock}
                                        onChange={(e) => setHistoryFilters({ ...historyFilters, stock: e.target.value })}
                                    >
                                        <option value="all">All</option>
                                    </select>
                                </div>
                                <div className="filter-item btn-align">
                                    <button className="filter-btn-themed">Filter</button>
                                </div>
                            </div>
                        </div>

                        <div className="transaction-results-card">
                            {filteredTransactions.length > 0 ? (
                                <div className="data-table-container">
                                    <table className="admin-table dark-themed-table">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>User</th>
                                                <th>Type</th>
                                                <th>Method/Accounts</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredTransactions.map(t => (
                                                <tr key={t.id}>
                                                    <td>{new Date(t.created_at).toLocaleString()}</td>
                                                    <td>{t.user?.name}</td>
                                                    <td style={{ textTransform: 'capitalize' }}>{t.type}</td>
                                                    <td style={{ textTransform: 'capitalize' }}>
                                                        {t.type === 'transfer'
                                                            ? `${t.from_account} → ${t.to_account}`
                                                            : (t.from_account === 'external' ? 'Credit Card' : t.from_account)}
                                                    </td>
                                                    <td style={{ fontWeight: '700', color: t.type === 'deposit' ? '#10b981' : '#ef4444' }}>
                                                        {t.type === 'deposit' ? '+' : '-'}${parseFloat(t.amount).toFixed(2)}
                                                    </td>
                                                    <td>
                                                        <span className={`status-badge ${t.status}`}>
                                                            {t.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {t.status === 'pending' && (
                                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                                <button onClick={() => handleTransactionUpdate(t.id, 'completed')} className="kyc-action-btn approve" style={{ padding: '4px 8px', fontSize: '0.7rem' }}>Approve</button>
                                                                <button onClick={() => handleTransactionUpdate(t.id, 'rejected')} className="kyc-action-btn reject" style={{ padding: '4px 8px', fontSize: '0.7rem' }}>Reject</button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="empty-transaction-state">
                                    <div className="empty-icon">
                                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                            <path d="M9 14h6"></path>
                                            <path d="M9 10h6"></path>
                                            <path d="M9 18h6"></path>
                                        </svg>
                                    </div>
                                    <p>No transaction found</p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'support':
                return (
                    <div className="support-ticket-view">
                        <div className="section-header-card">
                            <h2 style={{ color: '#94a3b8', fontSize: '1.25rem', fontWeight: '600' }}>{supportTab === 'new-ticket' ? 'Open Ticket' : 'Support Tickets'}</h2>
                        </div>

                        {supportTab === 'new-ticket' ? (
                            <div className="open-ticket-card" style={{ background: '#0b1120', padding: '30px', borderRadius: '4px' }}>
                                <form className="ticket-form" onSubmit={async (e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.target);
                                    try {
                                        await api.post('/support/tickets', {
                                            subject: formData.get('subject'),
                                            priority: formData.get('priority'),
                                            message: formData.get('message')
                                        });
                                        showToast('Ticket created successfully!');
                                        setSupportTab('my-tickets');
                                        fetchData();
                                    } catch (err) {
                                        showToast(err.response?.data?.message || 'Failed to create ticket', 'error');
                                    }
                                }}>
                                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                                        <div style={{ flex: 2 }}>
                                            <label style={{ display: 'block', color: '#fff', fontSize: '0.9rem', marginBottom: '8px', fontWeight: 'bold' }}>Subject<span style={{ color: '#ef4444' }}>*</span></label>
                                            <input name="subject" type="text" className="ticket-input" placeholder="Enter Subject" required
                                                style={{ width: '100%', background: 'transparent', border: '1px solid #1e293b', color: '#fff', padding: '12px', borderRadius: '4px' }}
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <label style={{ display: 'block', color: '#fff', fontSize: '0.9rem', marginBottom: '8px', fontWeight: 'bold' }}>Priority<span style={{ color: '#ef4444' }}>*</span></label>
                                            <select name="priority" className="ticket-select" required
                                                style={{ width: '100%', background: '#0b1120', border: '1px solid #1e293b', color: '#fff', padding: '12px', borderRadius: '4px' }}
                                            >
                                                <option value="High">High</option>
                                                <option value="Medium">Medium</option>
                                                <option value="Low">Low</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', color: '#fff', fontSize: '0.9rem', marginBottom: '8px', fontWeight: 'bold' }}>Message<span style={{ color: '#ef4444' }}>*</span></label>
                                        <textarea name="message" className="ticket-textarea" placeholder="Enter Message" required
                                            style={{ width: '100%', background: 'transparent', border: '1px solid #1e293b', color: '#fff', padding: '12px', borderRadius: '4px', minHeight: '150px' }}
                                        ></textarea>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={{ flex: 1 }}>
                                            <button type="button" className="add-attachment-btn" style={{ background: '#4A9FD4', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', fontWeight: 'bold' }}>+ Add Attachment</button>
                                            <p style={{ color: '#4A9FD4', fontSize: '0.75rem', marginTop: '10px', maxWidth: '500px' }}>Max 5 files can be uploaded | Maximum upload size is 256MB | Allowed File Extensions: .jpg, .jpeg, .png, .pdf, .doc, .docx</p>
                                        </div>
                                        <button type="submit" className="ticket-submit-btn blue-gradient-btn" style={{ background: 'linear-gradient(90deg, #4A9FD4 0%, #0077b6 100%)', color: '#fff', border: 'none', padding: '12px 40px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                                            <span style={{ marginRight: '8px' }}>➤</span> Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="my-tickets-card">
                                {supportTickets.length > 0 ? (
                                    <div className="data-table-container">
                                        <table className="dark-themed-table">
                                            <thead>
                                                <tr>
                                                    <th>Subject</th>
                                                    <th>Status</th>
                                                    <th>Priority</th>
                                                    <th>Last Reply</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {supportTickets.map(ticket => (
                                                    <tr key={ticket.id}>
                                                        <td>
                                                            <div className="ticket-subject-cell">
                                                                <span style={{ color: '#4A9FD4', fontWeight: 'bold', marginRight: '5px' }}>[{ticket.ticket_number}]</span>
                                                                <span className="ticket-subject">{ticket.subject}</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className={`status-badge ${ticket.status.toLowerCase()}`}>
                                                                {ticket.status}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className={`priority-badge ${ticket.priority.toLowerCase()}`}>
                                                                {ticket.priority}
                                                            </span>
                                                        </td>
                                                        <td>{ticket.last_reply ? new Date(ticket.last_reply).toLocaleString() : 'No reply yet'}</td>
                                                        <td>
                                                            <button className="view-ticket-btn" style={{ background: 'transparent', border: '1px solid #1e293b', color: '#fff', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>👁</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="empty-transaction-state">
                                        <div className="empty-icon" style={{ opacity: 0.5 }}>🎫</div>
                                        <p>No tickets found</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            case 'referrals':
                const referralLink = `https://buckholding.com?reference=${userProfile?.name?.replace(/\s+/g, '') || 'username'}`;
                return (
                    <div className="referral-view">
                        <div className="section-header-card">
                            <h2 style={{ color: '#94a3b8', fontSize: '1.25rem', fontWeight: '600' }}>{referralTab === 'link' ? 'Manage Referral' : 'My Referrals'}</h2>
                        </div>

                        {referralTab === 'link' ? (
                            <div className="referral-link-card">
                                <label className="referral-label">Referral Link</label>
                                <div className="referral-input-container">
                                    <input
                                        type="text"
                                        className="referral-input"
                                        value={referralLink}
                                        readOnly
                                    />
                                    <button
                                        className="referral-copy-btn"
                                        onClick={() => {
                                            navigator.clipboard.writeText(referralLink);
                                            showToast('Referral link copied to clipboard!');
                                        }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="my-referrals-list">
                                <div className="data-table-container">
                                    <table className="dark-themed-table">
                                        <thead>
                                            <tr>
                                                <th>Username</th>
                                                <th>Email</th>
                                                <th>Joined Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.filter(u => u.referred_by === userProfile?.id).length > 0 ? (
                                                users.filter(u => u.referred_by === userProfile?.id).map(u => (
                                                    <tr key={u.id}>
                                                        <td>{u.name}</td>
                                                        <td>{u.email}</td>
                                                        <td>{new Date(u.created_at).toLocaleDateString()}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No referred users found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-logo">
                    <div className="logo-icon">
                        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 5L35 15V25L20 35L5 25V15L20 5Z" fill="#4A9FD4" stroke="#4A9FD4" strokeWidth="2" />
                        </svg>
                    </div>
                    <span className="logo-text">BuckHolding</span>
                </div>

                <ul className="sidebar-menu">
                    <li className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
                        <span className="menu-icon">📊</span>
                        <span className="menu-text">Dashboard</span>
                    </li>
                    <li className={`menu-item ${activeTab === 'stocks' ? 'active' : ''}`} onClick={() => setActiveTab('stocks')}>
                        <span className="menu-icon">📈</span>
                        <span className="menu-text">All Stocks</span>
                    </li>
                    <li className={`menu-item ${activeTab === 'transfer' ? 'active' : ''}`} onClick={() => setActiveTab('transfer')}>
                        <span className="menu-icon">⇄</span>
                        <span className="menu-text">Transfer Balance</span>
                    </li>
                    <li className={`menu-item ${activeTab === 'deposits' ? 'active' : ''}`} onClick={() => {
                        setActiveTab('deposits');
                        setFinanceTab('new-deposit');
                    }}>
                        <span className="menu-icon">🏦</span>
                        <span className="menu-text">Manage Transfer</span>
                    </li>
                    <li className={`menu-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
                        <span className="menu-icon">👥</span>
                        <span className="menu-text">All Users</span>
                    </li>
                    <li className={`menu-item ${activeTab === 'kyc' ? 'active' : ''}`} onClick={() => setActiveTab('kyc')}>
                        <span className="menu-icon">🛡️</span>
                        <span className="menu-text">Manage KYC</span>
                    </li>
                    <li className={`menu-item ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
                        <span className="menu-icon">💸</span>
                        <span className="menu-text">Transactions</span>
                    </li>
                    <li className={`menu-item has-submenu ${activeTab === 'support' ? 'active' : ''}`}>
                        <div className="menu-item-main" onClick={() => setSupportSubmenuOpen(!supportSubmenuOpen)}>
                            <span className="menu-icon">🎫</span>
                            <span className="menu-text">Support Ticket</span>
                            <span className="submenu-arrow">{supportSubmenuOpen ? '▼' : '▶'}</span>
                        </div>
                        {supportSubmenuOpen && (
                            <ul className="submenu">
                                <li className={`submenu-item ${activeTab === 'support' && supportTab === 'new-ticket' ? 'active shadow-active' : ''}`}
                                    onClick={() => { setActiveTab('support'); setSupportTab('new-ticket'); }}>
                                    <span className="submenu-dot">○</span> New Ticket
                                </li>
                                <li className={`submenu-item ${activeTab === 'support' && supportTab === 'my-tickets' ? 'active shadow-active' : ''}`}
                                    onClick={() => { setActiveTab('support'); setSupportTab('my-tickets'); }}>
                                    <span className="submenu-dot">○</span> My Ticket
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className={`menu-item has-submenu ${activeTab === 'referrals' ? 'active' : ''}`}>
                        <div className="menu-item-main" onClick={() => setReferralSubmenuOpen(!referralSubmenuOpen)}>
                            <span className="menu-icon">🔄</span>
                            <span className="menu-text">Manage Referrals</span>
                            <span className="submenu-arrow">{referralSubmenuOpen ? '▼' : '▶'}</span>
                        </div>
                        {referralSubmenuOpen && (
                            <ul className="submenu">
                                <li className={`submenu-item ${activeTab === 'referrals' && referralTab === 'link' ? 'active shadow-active' : ''}`}
                                    onClick={() => { setActiveTab('referrals'); setReferralTab('link'); }}>
                                    <span className="submenu-dot">○</span> Referral Link
                                </li>
                                <li className={`submenu-item ${activeTab === 'referrals' && referralTab === 'referred-users' ? 'active shadow-active' : ''}`}
                                    onClick={() => { setActiveTab('referrals'); setReferralTab('referred-users'); }}>
                                    <span className="submenu-dot">○</span> My Referral
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>

                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={() => {
                        localStorage.clear();
                        window.location.href = '/login';
                    }}>Log Out</button>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-top-bar">
                    <div className="top-bar-left">
                        <h1 style={{ color: '#64748b' }}>
                            {activeTab === 'stocks' ? 'Stocks List' :
                                activeTab === 'transfer' ? 'Transfer Balance' :
                                    activeTab === 'deposits' ? 'Manage Transfer' :
                                        activeTab === 'users' ? 'All Users' :
                                            activeTab === 'kyc' ? 'Manage KYC' :
                                                activeTab === 'history' ? 'Transaction History' :
                                                    activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                        </h1>
                    </div>

                    {activeTab === 'stocks' && (
                        <div className="search-container">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="search-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </button>
                        </div>
                    )}

                    {activeTab === 'transfer' && (
                        <button className="invest-now-btn">
                            <div className="flag"></div>
                            Invest Now
                        </button>
                    )}
                </header>

                <div>
                    {renderContent()}
                </div>
            </main>

            {/* Premium Toasts */}
            <div className="toast-container">
                {toasts.map(toast => (
                    <motion.div
                        key={toast.id}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        className={`toast-item ${toast.type}`}
                    >
                        <div className="toast-icon">
                            {toast.type === 'success' && '✅'}
                            {toast.type === 'error' && '❌'}
                            {toast.type === 'info' && 'ℹ️'}
                        </div>
                        <div className="toast-message">{toast.message}</div>
                        <button className="toast-close" onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}>×</button>
                        <div className="toast-progress">
                            <motion.div
                                className="toast-progress-bar"
                                initial={{ width: "100%" }}
                                animate={{ width: "0%" }}
                                transition={{ duration: 5, ease: "linear" }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const BankDepositForm = ({ settings, onSuccess, showToast }) => {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/admin/deposit-request', { amount, method: 'bank' });
            showToast('Bank deposit request submitted! Please wait for approval.', 'info');
            onSuccess();
        } catch (err) {
            showToast(err.response?.data?.message || 'Request failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="payment-form-grid">
            <div className="bank-details-box">
                {settings ? settings.map(s => (
                    <div key={s.id} className="detail-item">
                        <label>{s.key}</label>
                        <span>{s.value}</span>
                    </div>
                )) : <p>Loading bank details...</p>}
            </div>
            <div className="input-group">
                <label>Amount to Deposit (USD)</label>
                <input
                    type="number"
                    className="form-input"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="make-payment-btn" disabled={loading}>
                {loading ? 'Submitting...' : 'Proceed via Bank'}
            </button>
        </form>
    );
};

const CryptoDepositForm = ({ settings, onSuccess, showToast }) => {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/admin/deposit-request', { amount, method: 'crypto' });
            showToast('Crypto deposit request submitted! Please wait for approval.', 'info');
            onSuccess();
        } catch (err) {
            showToast(err.response?.data?.message || 'Request failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="payment-form-grid">
            <div className="bank-details-box">
                {settings ? settings.map(s => (
                    <div key={s.id} className="detail-item">
                        <label>{s.key}</label>
                        <span style={{ wordBreak: 'break-all' }}>{s.value}</span>
                    </div>
                )) : <p>Loading crypto details...</p>}
            </div>
            <div className="input-group">
                <label>Amount to Deposit (USD)</label>
                <input
                    type="number"
                    className="form-input"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="proceed-crypto-btn" disabled={loading}>
                <FaBitcoin /> {loading ? 'Submitting...' : 'Proceed via Crypto'}
            </button>
        </form>
    );
};

const DepositForm = ({ onSuccess, showToast }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setError(null);

        try {
            // 1. Create intent
            const { data } = await api.post('/payment/create-intent', {
                amount: parseFloat(amount),
                currency: 'usd'
            });

            // 2. Confirm payment
            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: { name: 'Admin User' }
                }
            });

            if (result.error) {
                setError(result.error.message);
                setLoading(false);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    // 3. Confirm on backend
                    await api.post('/payment/confirm', {
                        payment_intent_id: result.paymentIntent.id
                    });
                    showToast('Deposit Successful!');
                    onSuccess();
                }
            }
        } catch (err) {
            setError('Payment process failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="payment-form-grid">
            <div className="input-group">
                <label>CARD NUMBER</label>
                <div style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '4px', position: 'relative' }}>
                    <CardElement options={{
                        style: {
                            base: { fontSize: '16px', color: '#1e293b', '::placeholder': { color: '#94a3b8' } }
                        }
                    }} />
                    <FaCreditCard size={18} color="#cbd5e1" style={{ position: 'absolute', right: '12px', top: '12px' }} />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="input-group">
                    <label>EXPIRATION DATE</label>
                    <input type="text" className="form-input" placeholder="MM / YY" />
                </div>
                <div className="input-group">
                    <label>CV CODE</label>
                    <input type="text" className="form-input" placeholder="CVC" />
                </div>
            </div>

            <div className="input-group">
                <label>NAME OF CARD</label>
                <input type="text" className="form-input" placeholder="NAME AND SURNAME" />
            </div>

            <div className="input-group">
                <label>DEPOSIT AMOUNT (USD)</label>
                <input
                    type="number"
                    className="form-input"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>

            {error && <div style={{ color: '#ef4444', fontSize: '0.8rem' }}>{error}</div>}

            <button type="submit" className="make-payment-btn" disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Make a payment!'}
            </button>
        </form>
    );
};

export default AdminPanel;
