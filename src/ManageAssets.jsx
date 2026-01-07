import React, { useEffect, useState } from 'react';
import api from './api';
import DashboardLayout from './DashboardLayout';
import './ManageAssets.css';

const ManageAssets = () => {
    const [user, setUser] = useState(null);
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userRes, stocksRes] = await Promise.all([
                    api.get('/user'),
                    api.get('/stocks')
                ]);
                setUser(userRes.data);
                setStocks(stocksRes.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Helper to group stocks. 
    // In screenshot we see "STOCKS" and "INDICES".
    // We can assume we might have categories in DB or just grouping by logic.
    // For now, let's put everything under STOCKS if no category is distinct, or simulate indices.
    // Based on previous history, there is a 'category' column.

    const stocksList = stocks.filter(s => s.category !== 'index');
    // If we have indices in DB, we'd filter them here. 
    // Assuming 'general', 'energy', 'construction' are all stocks.
    const indicesList = stocks.filter(s => s.category === 'index');

    // If no distinct indices category exists yet in data, we might just show stocks.
    // But the design shows two sections. 

    if (loading) {
        return <div className="loading-screen">Loading Assets...</div>;
    }

    return (
        <DashboardLayout activePage="assets">
            <div className="manage-assets-container">
                <h1 className="assets-page-title">All Assets</h1>

                {/* Stats Header */}
                <div className="assets-stats-row">
                    <div className="asset-stat-left">
                        <span className="stat-label">Profit: </span>
                        <span className="stat-value profit-value">$0.00 USD</span>
                        <span className="stat-sub"> profits on all trades</span>
                    </div>
                    <div className="asset-stat-right">
                        <span className="stat-label">Holding Balance: </span>
                        <span className="stat-value change-value">${parseFloat(user?.holding_balance || 0).toFixed(2)} USD</span>
                        <span className="stat-sub"> tradable available balance</span>
                    </div>
                </div>

                {/* Assets Table Card */}
                <div className="assets-table-card">
                    <table className="assets-table">
                        <thead>
                            <tr>
                                <th className="col-name">Name</th>
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
                            {/* STOCKS Header Row */}
                            <tr className="section-header-row">
                                <td colSpan="8">STOCKS</td>
                            </tr>
                            {stocksList.map(stock => (
                                <tr key={stock.id}>
                                    <td className="col-name-cell">
                                        <div className="coin-info">
                                            <span className="coin-icon-placeholder">{stock.symbol[0]}</span>
                                            <span className="coin-symbol">{stock.symbol}</span>
                                        </div>
                                    </td>
                                    <td>{parseFloat(stock.value).toFixed(2)}</td>
                                    <td className={parseFloat(stock.change) >= 0 ? 'text-green' : 'text-red'}>
                                        {parseFloat(stock.change) > 0 ? '+' : ''}{parseFloat(stock.change).toFixed(2)}
                                    </td>
                                    <td className={parseFloat(stock.chgPct) >= 0 ? 'text-green' : 'text-red'}>
                                        {parseFloat(stock.chgPct) > 0 ? '+' : ''}{parseFloat(stock.chgPct).toFixed(2)}%
                                    </td>
                                    <td>{parseFloat(stock.open).toFixed(2)}</td>
                                    <td>{parseFloat(stock.high).toFixed(2)}</td>
                                    <td>{parseFloat(stock.low).toFixed(2)}</td>
                                    <td>{parseFloat(stock.prev).toFixed(2)}</td>
                                </tr>
                            ))}

                            {/* Indices logic - only if we had them or want to mock them to match screenshot 
                                The screenshot showed S&P 500 etc. 
                                Since user wants "as you create in dashboard with real db", 
                                if real DB has only stocks, we show only stocks. 
                            */}
                            {indicesList.length > 0 && (
                                <>
                                    <tr className="section-header-row">
                                        <td colSpan="8">INDICES</td>
                                    </tr>
                                    {indicesList.map(stock => (
                                        <tr key={stock.id}>
                                            <td className="col-name-cell">
                                                <div className="coin-info">
                                                    <span className="coin-icon-placeholder">{stock.symbol[0]}</span>
                                                    <span className="coin-symbol">{stock.symbol}</span>
                                                </div>
                                            </td>
                                            <td>{parseFloat(stock.value).toFixed(2)}</td>
                                            <td className={parseFloat(stock.change) >= 0 ? 'text-green' : 'text-red'}>
                                                {parseFloat(stock.change) > 0 ? '+' : ''}{parseFloat(stock.change).toFixed(2)}
                                            </td>
                                            <td className={parseFloat(stock.chgPct) >= 0 ? 'text-green' : 'text-red'}>
                                                {parseFloat(stock.chgPct) > 0 ? '+' : ''}{parseFloat(stock.chgPct).toFixed(2)}%
                                            </td>
                                            <td>{parseFloat(stock.open).toFixed(2)}</td>
                                            <td>{parseFloat(stock.high).toFixed(2)}</td>
                                            <td>{parseFloat(stock.low).toFixed(2)}</td>
                                            <td>{parseFloat(stock.prev).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Empty State / My Assets Section */}
                <div className="no-asset-found-container">
                    <div className="no-asset-content">
                        <svg className="clipboard-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                        </svg>
                        <div className="no-asset-text">No Asset Found</div>
                        {/* 
                           In screenshot it just says "No Asset Found".
                           Usually implies "You haven't bought anything".
                        */}
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
};

export default ManageAssets;
