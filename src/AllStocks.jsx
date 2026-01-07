import React, { useEffect, useState } from 'react';
import api from './api';
import DashboardLayout from './DashboardLayout';
import './AllStocks.css';

const AllStocks = () => {
    const [stocks, setStocks] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStocks();
    }, []);

    const fetchStocks = async () => {
        try {
            const response = await api.get('/stocks');
            setStocks(response.data);
        } catch (error) {
            console.error("Failed to fetch stocks", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filteredStocks = stocks.filter(stock =>
        stock.name.toLowerCase().includes(search.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <div className="loading-screen">Loading Stocks...</div>;
    }

    return (
        <DashboardLayout activePage="stocks">
            <div className="all-stocks-page-inner"> {/* Removed 'all-stocks-page' to avoid double padding */}
                <div className="stocks-container">
                    <div className="stocks-header-card">
                        <div className="stocks-header-top">
                            <h2 className="stocks-title">Stocks List</h2>
                            <div className="stocks-search-box">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="stocks-search-input"
                                    value={search}
                                    onChange={handleSearch}
                                />
                                <button className="stocks-search-btn">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="stocks-table-wrapper">
                            <table className="stocks-table">
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
                                    {filteredStocks.map(stock => (
                                        <tr key={stock.id}>
                                            <td>
                                                <div className="stock-identity">
                                                    <span className="icon-placeholder">{stock.symbol[0]}</span>
                                                    <span style={{ marginLeft: '10px' }}>{stock.symbol}</span>
                                                </div>
                                            </td>
                                            <td>{parseFloat(stock.value).toFixed(2)}</td>
                                            <td className={parseFloat(stock.change) >= 0 ? 'val-positive' : 'val-negative'}>
                                                {parseFloat(stock.change) > 0 ? '+' : ''}{parseFloat(stock.change).toFixed(2)}
                                            </td>
                                            <td className={parseFloat(stock.chgPct) >= 0 ? 'val-positive' : 'val-negative'}>
                                                {parseFloat(stock.chgPct) > 0 ? '+' : ''}{parseFloat(stock.chgPct).toFixed(2)}%
                                            </td>
                                            <td>{parseFloat(stock.open).toFixed(2)}</td>
                                            <td>{parseFloat(stock.high).toFixed(2)}</td>
                                            <td>{parseFloat(stock.low).toFixed(2)}</td>
                                            <td>{parseFloat(stock.prev).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                    {filteredStocks.length === 0 && (
                                        <tr>
                                            <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>No stocks found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AllStocks;
