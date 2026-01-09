import React, { useEffect, useState } from 'react';
import api from '../services/api';
import DashboardLayout from '../layouts/DashboardLayout';
import './TransferBalance.css';

const TransferBalance = () => {
    const [user, setUser] = useState(null);
    const [amount, setAmount] = useState('');
    const [fromAccount, setFromAccount] = useState('funding');
    const [toAccount, setToAccount] = useState('holding');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const fetchUser = async () => {
        try {
            const response = await api.get('/user');
            setUser(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleTransfer = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        if (fromAccount === toAccount) {
            setError("Source and destination accounts must be different.");
            setLoading(false);
            return;
        }

        try {
            const response = await api.post('/transfer', {
                amount: amount,
                from: fromAccount,
                to: toAccount
            });
            setMessage(response.data.message);
            setAmount('');
            fetchUser(); // Refresh balances
        } catch (err) {
            setError(err.response?.data?.message || 'Transfer failed. Check balance.');
        } finally {
            setLoading(false);
        }
    };

    const handleFromChange = (e) => {
        const val = e.target.value;
        setFromAccount(val);
        // Auto swap logic if wanted, or just let user pick
        if (val === 'funding') setToAccount('holding');
        if (val === 'holding') setToAccount('funding');
    };

    const handleToChange = (e) => {
        const val = e.target.value;
        setToAccount(val);
        if (val === 'funding') setFromAccount('holding');
        if (val === 'holding') setFromAccount('funding');
    };

    return (
        <DashboardLayout activePage="transfer">
            <div className="transfer-page-container">
                <div className="transfer-header">
                    <h2>Transfer</h2>
                    <button className="invest-now-btn" onClick={() => window.location.href = '/stocks'}>
                        <span className="invest-icon">⚡</span> Invest Now
                    </button>
                    {/* Icon is approximate representation */}
                </div>

                <div className="transfer-card">
                    <h3 className="transfer-card-title">Transfer Your Balance</h3>

                    <div className="balance-displays">
                        <div className="balance-box">
                            <span className="balance-box-label">Funding Balance</span>
                            <span className="balance-box-value">${parseFloat(user?.funding_balance || 0).toFixed(2)} USD</span>
                        </div>
                        <div className="balance-box">
                            <span className="balance-box-label">Holding Balance</span>
                            <span className="balance-box-value">${parseFloat(user?.holding_balance || 0).toFixed(2)} USD</span>
                        </div>
                    </div>

                    <form className="transfer-form" onSubmit={handleTransfer}>
                        {message && <div className="transfer-alert success">{message}</div>}
                        {error && <div className="transfer-alert error">{error}</div>}

                        <div className="form-group">
                            <label>Enter Amount: <span className="req">*</span></label>
                            <div className="amount-input-wrapper">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder=""
                                    min="0.01"
                                    step="0.01"
                                    required
                                />
                                <span className="currency-tag">USD</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Transfer From: <span className="req">*</span></label>
                            <select value={fromAccount} onChange={handleFromChange}>
                                <option value="funding">Funding Balance</option>
                                <option value="holding">Holding Balance</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Transfer To: <span className="req">*</span></label>
                            <select value={toAccount} onChange={handleToChange}>
                                <option value="funding">Funding Balance</option>
                                <option value="holding">Holding Balance</option>
                            </select>
                        </div>

                        <button type="submit" className="transfer-submit-btn" disabled={loading}>
                            {loading ? 'Processing...' : 'Transfer'}
                        </button>

                        <p className="transfer-note">Ensure you have enough balance before transferring!</p>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TransferBalance;
