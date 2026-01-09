import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Auth.css';

const DepositHistory = ({ isEmbedded }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/transactions');
                setTransactions(res.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load deposit history');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const wrapperStyle = isEmbedded ? {} : { minHeight: '80vh', paddingTop: '80px' };
    const containerStyle = isEmbedded ? { maxWidth: '100%', padding: 0 } : { maxWidth: '900px' };

    return (
        <div className={!isEmbedded ? "auth-page" : ""} style={wrapperStyle}>
            <div className="auth-container" style={containerStyle}>
                <div className="auth-card">
                    <div className="auth-header">
                        <h1>Deposit History</h1>
                        <p>All deposits and balance movements for your account.</p>
                    </div>

                    {loading && <p>Loading...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    {!loading && !error && (
                        <div className="data-table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Type</th>
                                        <th>Method / Accounts</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.length === 0 && (
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                                                No transactions found.
                                            </td>
                                        </tr>
                                    )}
                                    {transactions.map((t) => (
                                        <tr key={t.id}>
                                            <td>{new Date(t.created_at).toLocaleString()}</td>
                                            <td style={{ textTransform: 'capitalize' }}>{t.type}</td>
                                            <td style={{ textTransform: 'capitalize' }}>
                                                {t.type === 'transfer'
                                                    ? `${t.from_account} → ${t.to_account}`
                                                    : t.from_account === 'external'
                                                        ? 'Credit Card'
                                                        : t.from_account}
                                            </td>
                                            <td style={{ fontWeight: 600 }}>
                                                ${parseFloat(t.amount).toFixed(2)}
                                            </td>
                                            <td>
                                                <span className={`status-badge ${t.status}`}>
                                                    {t.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DepositHistory;

