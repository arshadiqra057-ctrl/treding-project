import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import DashboardLayout from './DashboardLayout';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [kycStatus, setKycStatus] = useState(null);
    const [totalWithdraw, setTotalWithdraw] = useState(0);
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch User, KYC Status, Transactions, and Stocks in parallel
                const [userRes, kycRes, txRes, stocksRes] = await Promise.all([
                    api.get('/user'),
                    api.get('/kyc/status').catch(() => ({ data: { status: 'not_submitted' } })),
                    api.get('/transactions').catch(() => ({ data: [] })),
                    api.get('/stocks').catch(() => ({ data: [] }))
                ]);

                setUser(userRes.data);
                setKycStatus(kycRes.data.data?.status || 'not_submitted');

                // Calculate Total Withdrawals
                if (Array.isArray(txRes.data)) {
                    const withdrawals = txRes.data.filter(tx => tx.type === 'withdraw' && tx.status === 'completed');
                    const total = withdrawals.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
                    setTotalWithdraw(total);
                }

                setStocks(stocksRes.data || []);

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f7f9fc', color: '#334155' }}>Loading...</div>;
    }

    const showKycNotice = kycStatus !== 'approved';
    const totalAssets = (parseFloat(user?.funding_balance || 0) + parseFloat(user?.holding_balance || 0)).toFixed(2);

    const energyStocks = stocks.filter(stock => stock.category === 'energy').slice(0, 5);
    const constructionStocks = stocks.filter(stock => stock.category === 'construction').slice(0, 5);
    const techStocks = stocks.filter(stock => stock.category === 'tech').slice(0, 5);
    const automotiveStocks = stocks.filter(stock => stock.category === 'automotive').slice(0, 5);
    const agricultureStocks = stocks.filter(stock => stock.category === 'agriculture').slice(0, 5);

    return (
        <DashboardLayout activePage="dashboard">
            {showKycNotice && (
                <div className="kyc-alert">
                    <h3>KYC Verification required</h3>
                    <p>
                        Complete KYC to unlock the full potential of our platform! KYC helps us verify your identity and keep things secure.
                        It is quick and easy just follow the on-screen instructions. Get started with KYC verification now!
                        {' '}<span className="kyc-link" style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/kyc')}>Click Here to Submit Documents</span>
                    </p>
                </div>
            )}

            <div className="assets-section">
                <div className="total-assets-label">Total Assets</div>
                <h1 className="total-assets-value">${totalAssets} USD</h1>
            </div>

            {/* Quick Actions */}
            <div className="action-buttons">
                <div className="action-btn" onClick={() => navigate('/deposit/new')}>
                    <div className="action-icon">💰</div>
                    <span className="action-label">Deposit</span>
                </div>
                <div className="action-btn" onClick={() => navigate('/withdraw/new')}>
                    <div className="action-icon">💸</div>
                    <span className="action-label">Withdraw</span>
                </div>
                <div className="action-btn" onClick={() => navigate('/transfer')}>
                    <div className="action-icon">⇄</div>
                    <span className="action-label">Transfer</span>
                </div>
                <div className="action-btn" onClick={() => navigate('/stocks')}>
                    <div className="action-icon">📈</div>
                    <span className="action-label">Invest</span>
                </div>
            </div>

            <div className="dashboard-tabs">
                <button className="tab-btn active">Account</button>
                <button className="tab-btn">Assets</button>
            </div>

            <div className="balance-list">
                <div className="balance-item">
                    <div>
                        <span className="balance-label">Funding</span>
                        <span className="balance-amount">${parseFloat(user?.funding_balance || 0).toFixed(2)} USD</span>
                    </div>
                    <div className="arrow-icon">›</div>
                </div>

                <div className="balance-item">
                    <div>
                        <span className="balance-label">Holdings</span>
                        <span className="balance-amount">${parseFloat(user?.holding_balance || 0).toFixed(2)} USD</span>
                    </div>
                    <div className="arrow-icon">›</div>
                </div>

                <div className="balance-item">
                    <div>
                        <span className="balance-label">Total Withdraw</span>
                        <span className="balance-amount">${totalWithdraw.toFixed(2)} USD</span>
                    </div>
                    <div className="arrow-icon">›</div>
                </div>

                <div className="balance-item">
                    <div>
                        <span className="balance-label">Bonus</span>
                        <span className="balance-amount">$0.00 USD</span>
                    </div>
                    <div className="arrow-icon">›</div>
                </div>
            </div>

            {/* ETF Sections */}
            <div className="etf-section">
                <div className="etf-header">
                    <h2>Energy ( oil, gas, drilling and petroleum distribution companies):</h2>
                    <p>It uses AI to trade different energy ETFs to generate profit. <span className="invest-link" onClick={() => navigate('/stocks')}>Invest</span></p>
                </div>
                <div className="etf-list">
                    {energyStocks.length > 0 ? energyStocks.map(stock => (
                        <div key={stock.id} className="etf-item">
                            <div className="etf-info">
                                <div className="etf-symbol-icon">{stock.symbol.substring(0, 2)}</div>
                                <div>
                                    <div className="etf-symbol">{stock.symbol}</div>
                                    <div className="etf-name">{stock.name}</div>
                                </div>
                            </div>
                            <div className="etf-values">
                                <div className="etf-price">{stock.value}</div>
                                <div className={`etf-change ${String(stock.change).startsWith('-') ? 'negative' : 'positive'}`}>
                                    {stock.change}%
                                </div>
                            </div>
                        </div>
                    )) : <p>No Energy ETFs available.</p>}
                </div>
            </div>

            <div className="etf-section">
                <div className="etf-header">
                    <h2>Construction ETFs:</h2>
                    <p>It uses AI to trade different construction ETFs to generate profit. <span className="invest-link" onClick={() => navigate('/stocks')}>Invest</span></p>
                </div>
                <div className="etf-list">
                    {constructionStocks.length > 0 ? constructionStocks.map(stock => (
                        <div key={stock.id} className="etf-item">
                            <div className="etf-info">
                                <div className="etf-symbol-icon construction">{stock.symbol.substring(0, 2)}</div>
                                <div>
                                    <div className="etf-symbol">{stock.symbol}</div>
                                    <div className="etf-name">{stock.name}</div>
                                </div>
                            </div>
                            <div className="etf-values">
                                <div className="etf-price">{stock.value}</div>
                                <div className={`etf-change ${String(stock.change).startsWith('-') ? 'negative' : 'positive'}`}>
                                    {stock.change}%
                                </div>
                            </div>
                        </div>
                    )) : <p>No Construction ETFs available.</p>}
                </div>
            </div>

            <div className="etf-section">
                <div className="etf-header">
                    <h2>Tech ETF's:</h2>
                    <p>It uses AI to trade different tech ETF's to generate profit. <span className="invest-link" onClick={() => navigate('/stocks')}>Invest</span></p>
                </div>
                <div className="etf-list">
                    {techStocks.length > 0 ? techStocks.map(stock => (
                        <div key={stock.id} className="etf-item">
                            <div className="etf-info">
                                <div className="etf-symbol-icon tech">{stock.symbol.substring(0, 2)}</div>
                                <div>
                                    <div className="etf-symbol">{stock.symbol}</div>
                                    <div className="etf-name">{stock.name}</div>
                                </div>
                            </div>
                            <div className="etf-values">
                                <div className="etf-price">{stock.value}</div>
                                <div className={`etf-change ${String(stock.change).startsWith('-') ? 'negative' : 'positive'}`}>
                                    {stock.change}%
                                </div>
                            </div>
                        </div>
                    )) : <p>No Tech ETFs available.</p>}
                </div>
            </div>

            <div className="etf-section">
                <div className="etf-header">
                    <h2>Automotive ETF's:</h2>
                    <p>It uses AI to trade different automobile ETF's to generate profit. <span className="invest-link" onClick={() => navigate('/stocks')}>Invest</span></p>
                </div>
                <div className="etf-list">
                    {automotiveStocks.length > 0 ? automotiveStocks.map(stock => (
                        <div key={stock.id} className="etf-item">
                            <div className="etf-info">
                                <div className="etf-symbol-icon automotive">{stock.symbol.substring(0, 2)}</div>
                                <div>
                                    <div className="etf-symbol">{stock.symbol}</div>
                                    <div className="etf-name">{stock.name}</div>
                                </div>
                            </div>
                            <div className="etf-values">
                                <div className="etf-price">{stock.value}</div>
                                <div className={`etf-change ${String(stock.change).startsWith('-') ? 'negative' : 'positive'}`}>
                                    {stock.change}%
                                </div>
                            </div>
                        </div>
                    )) : <p>No Automotive ETFs available.</p>}
                </div>
            </div>

            <div className="etf-section">
                <div className="etf-header">
                    <h2>Agriculture ETF's:</h2>
                    <p>It uses AI to trade different agricultural ETF's to generate profit. <span className="invest-link" onClick={() => navigate('/stocks')}>Invest</span></p>
                </div>
                <div className="etf-list">
                    {agricultureStocks.length > 0 ? agricultureStocks.map(stock => (
                        <div key={stock.id} className="etf-item">
                            <div className="etf-info">
                                <div className="etf-symbol-icon agriculture">{stock.symbol.substring(0, 2)}</div>
                                <div>
                                    <div className="etf-symbol">{stock.symbol}</div>
                                    <div className="etf-name">{stock.name}</div>
                                </div>
                            </div>
                            <div className="etf-values">
                                <div className="etf-price">{stock.value}</div>
                                <div className={`etf-change ${String(stock.change).startsWith('-') ? 'negative' : 'positive'}`}>
                                    {stock.change}%
                                </div>
                            </div>
                        </div>
                    )) : <p>No Agriculture ETFs available.</p>}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
