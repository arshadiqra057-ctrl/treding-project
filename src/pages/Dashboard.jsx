import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import DashboardLayout from '../layouts/DashboardLayout';
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

    // Widget 1: Economic Calendar
    useEffect(() => {
        const container = document.getElementById('dashboard-economic-calendar');
        if (container) {
            container.innerHTML = '';
            const widgetDiv = document.createElement('div');
            widgetDiv.className = 'tradingview-widget-container__widget';
            container.appendChild(widgetDiv);

            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
            script.async = true;
            script.innerHTML = JSON.stringify({
                "colorTheme": "light",
                "isTransparent": false,
                "locale": "en",
                "countryFilter": "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu",
                "importanceFilter": "-1,0,1",
                "width": "100%",
                "height": 550
            });
            container.appendChild(script);
        }
    }, []);

    // Widget 2: Stock Market (Hotlists)
    useEffect(() => {
        const container = document.getElementById('dashboard-stock-market');
        if (container) {
            container.innerHTML = '';
            const widgetDiv = document.createElement('div');
            widgetDiv.className = 'tradingview-widget-container__widget';
            container.appendChild(widgetDiv);

            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js';
            script.async = true;
            script.innerHTML = JSON.stringify({
                "exchange": "US",
                "colorTheme": "light",
                "dateRange": "12M",
                "showChart": true,
                "locale": "en",
                "largeChartUrl": "",
                "isTransparent": false,
                "showSymbolLogo": false,
                "showFloatingTooltip": false,
                "width": "100%",
                "height": 550
            });
            container.appendChild(script);
        }
    }, []);

    // Widget 3: Market Overview
    useEffect(() => {
        const container = document.getElementById('dashboard-market-overview');
        if (container) {
            container.innerHTML = '';
            const widgetDiv = document.createElement('div');
            widgetDiv.className = 'tradingview-widget-container__widget';
            container.appendChild(widgetDiv);

            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
            script.async = true;
            script.innerHTML = JSON.stringify({
                "colorTheme": "light",
                "dateRange": "12M",
                "locale": "en",
                "largeChartUrl": "",
                "isTransparent": false,
                "showFloatingTooltip": false,
                "width": "100%",
                "height": 550,
                "tabs": [
                    { "title": "Indices", "symbols": [{ "s": "FOREXCOM:SPXUSD" }, { "s": "FOREXCOM:NSXUSD" }, { "s": "FOREXCOM:DJI" }, { "s": "INDEX:NKY" }, { "s": "INDEX:DEU40" }, { "s": "FOREXCOM:UKXGBP" }] },
                    { "title": "Futures", "symbols": [{ "s": "BMFBOVESPA:ISP1!" }, { "s": "BMFBOVESPA:EUR1!" }, { "s": "CMCMARKETS:GOLD" }, { "s": "PYTH:WTI3!" }] },
                    { "title": "Bonds", "symbols": [{ "s": "EUREX:FGBL1!" }, { "s": "EUREX:FBTP1!" }, { "s": "EUREX:FGBM1!" }] },
                    { "title": "Forex", "symbols": [{ "s": "FX:EURUSD" }, { "s": "FX:GBPUSD" }, { "s": "FX:USDJPY" }, { "s": "FX:USDCHF" }, { "s": "FX:AUDUSD" }, { "s": "FX:USDCAD" }] }
                ]
            });
            container.appendChild(script);
        }
    }, []);

    // Widget 4: Forex Cross Rates
    useEffect(() => {
        const container = document.getElementById('dashboard-forex-cross-rates');
        if (container) {
            container.innerHTML = '';
            const widgetDiv = document.createElement('div');
            widgetDiv.className = 'tradingview-widget-container__widget';
            container.appendChild(widgetDiv);

            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js';
            script.async = true;
            script.innerHTML = JSON.stringify({
                "colorTheme": "light",
                "isTransparent": false,
                "locale": "en",
                "currencies": ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD", "CNY"],
                "width": "100%",
                "height": 400
            });
            container.appendChild(script);
        }
    }, []);

    // Widget 5: Crypto Heatmap
    useEffect(() => {
        const container = document.getElementById('dashboard-crypto-heatmap');
        if (container) {
            container.innerHTML = '';
            const widgetDiv = document.createElement('div');
            widgetDiv.className = 'tradingview-widget-container__widget';
            container.appendChild(widgetDiv);

            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js';
            script.async = true;
            script.innerHTML = JSON.stringify({
                "dataSource": "Crypto",
                "blockSize": "market_cap_calc",
                "blockColor": "24h_close_change|5",
                "locale": "en",
                "symbolUrl": "",
                "colorTheme": "light",
                "hasTopBar": false,
                "isDataSetEnabled": false,
                "isZoomEnabled": true,
                "hasSymbolTooltip": true,
                "isMonoSize": false,
                "width": "100%",
                "height": 550
            });
            container.appendChild(script);
        }
    }, []);

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f7f9fc', color: '#334155' }}>Loading...</div>;
    }

    const showKycNotice = kycStatus !== 'approved';
    const totalAssets = (parseFloat(user?.funding_balance || 0) + parseFloat(user?.holding_balance || 0)).toFixed(2);



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

            {/* Widget Sections */}

            {/* 1. Economic Calendar */}
            <div className="etf-section" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div className="etf-header" style={{ flex: '0 0 30%' }}>
                    <h2>Economic Calendar</h2>
                    <p>Keep an eye on key upcoming economic events, announcements, and news. <span className="invest-link" onClick={() => navigate('/stocks')}>Invest</span></p>
                </div>
                <div className="etf-list" style={{ flex: '1', display: 'block' }}>
                    <div className="tradingview-widget-container" id="dashboard-economic-calendar"></div>
                </div>
            </div>

            {/* 2. Stock Market (Hotlists) */}
            <div className="etf-section" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div className="etf-header" style={{ flex: '0 0 30%' }}>
                    <h2>Stock Market (Hotlists)</h2>
                    <p>See the top gaining, losing, and most active stocks for the day. <span className="invest-link" onClick={() => navigate('/stocks')}>Invest</span></p>
                </div>
                <div className="etf-list" style={{ flex: '1', display: 'block' }}>
                    <div className="tradingview-widget-container" id="dashboard-stock-market"></div>
                </div>
            </div>

            {/* 3. Market Overview */}
            <div className="etf-section" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div className="etf-header" style={{ flex: '0 0 30%' }}>
                    <h2>Market Overview</h2>
                    <p>Take a macro look at the markets with this overview widget. <span className="invest-link" onClick={() => navigate('/stocks')}>Invest</span></p>
                </div>
                <div className="etf-list" style={{ flex: '1', display: 'block' }}>
                    <div className="tradingview-widget-container" id="dashboard-market-overview"></div>
                </div>
            </div>

            {/* 4. Forex Screener (Cross Rates) */}
            <div className="etf-section" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div className="etf-header" style={{ flex: '0 0 30%' }}>
                    <h2>Forex Screener</h2>
                    <p>Real-time quotes of selected currencies in comparison to other major currencies. <span className="invest-link" onClick={() => navigate('/stocks')}>Invest</span></p>
                </div>
                <div className="etf-list" style={{ flex: '1', display: 'block' }}>
                    <div className="tradingview-widget-container" id="dashboard-forex-cross-rates"></div>
                </div>
            </div>

            {/* 5. Crypto Market (Heatmap) */}
            <div className="etf-section" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div className="etf-header" style={{ flex: '0 0 30%' }}>
                    <h2>Crypto Market</h2>
                    <p>A birds-eye view of crypto assets sorted by market capitalization. <span className="invest-link" onClick={() => navigate('/stocks')}>Invest</span></p>
                </div>
                <div className="etf-list" style={{ flex: '1', display: 'block' }}>
                    <div className="tradingview-widget-container" id="dashboard-crypto-heatmap"></div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
