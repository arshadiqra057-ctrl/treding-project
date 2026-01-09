import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../services/api';
import './TransactionHistory.css';

// Reusable Searchable Dropdown Component
const SearchableDropdown = ({ options, value, onChange, placeholder = "All", searchable = true }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = searchable
        ? options.filter(option => (option || "").toLowerCase().includes(searchTerm.toLowerCase()))
        : options;

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
        setSearchTerm('');
    };

    return (
        <div className="custom-dropdown" ref={dropdownRef}>
            <div className={`dropdown-header ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <span>{value || placeholder}</span>
                <span className="arrow-icon">{isOpen ? '▲' : '▼'}</span>
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    {searchable && (
                        <div className="dropdown-search">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onClick={(e) => e.stopPropagation()} // Prevent closing on input click
                                autoFocus
                            />
                        </div>
                    )}
                    <ul className="dropdown-list">
                        <li
                            className={`dropdown-item ${value === 'All' ? 'selected' : ''}`}
                            onClick={() => handleSelect('All')}
                        >
                            All
                        </li>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <li
                                    key={index}
                                    className={`dropdown-item ${value === option ? 'selected' : ''}`}
                                    onClick={() => handleSelect(option)}
                                >
                                    {option}
                                </li>
                            ))
                        ) : (
                            <li className="dropdown-item no-results">No results found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stocks, setStocks] = useState([]);

    // Filters
    const [trxNumber, setTrxNumber] = useState('');
    const [type, setType] = useState('All');
    const [remark, setRemark] = useState('All');
    const [stock, setStock] = useState('All');

    useEffect(() => {
        fetchTransactions();
        fetchStocks();
    }, []);

    const fetchTransactions = async () => {
        try {
            const res = await api.get('/transactions');
            setTransactions(res.data);
            setFilteredTransactions(res.data);
        } catch (err) {
            console.error("Failed to fetch transactions", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchStocks = async () => {
        try {
            const res = await api.get('/stocks');
            // Assuming response is array of objects { symbol: "AAPL", ... }
            const symbols = res.data.map(s => s.symbol);
            setStocks(symbols);
        } catch (err) {
            console.error("Failed to fetch stocks", err);
        }
    };

    const handleFilter = () => {
        let filtered = transactions;

        if (trxNumber) {
            filtered = filtered.filter(t => t.id.toString().includes(trxNumber) || (t.uuid && t.uuid.includes(trxNumber)));
        }

        if (type !== 'All') {
            if (type === 'Plus') {
                filtered = filtered.filter(t => t.type === 'deposit' || t.to_account === 'funding');
            } else if (type === 'Minus') {
                filtered = filtered.filter(t => t.type === 'withdraw' || t.from_account === 'funding');
            }
        }

        if (remark !== 'All') {
            filtered = filtered.filter(t =>
                (t.remark && t.remark === remark) ||
                (!t.remark && t.type === remark.toLowerCase())
            );
        }

        if (stock !== 'All') {
            filtered = filtered.filter(t =>
                (t.symbol === stock) ||
                (t.details && t.details.includes(stock))
            );
        }

        setFilteredTransactions(filtered);
    };

    const remarksOptions = ['Deposit', 'Withdraw', 'Transfer', 'Investment', 'Profit', 'Loss', 'Bonus', 'Commission'];

    return (
        <DashboardLayout activePage="transactions">
            <div className="transaction-history-container">
                <h2 className="page-title">Transactions</h2>

                {/* Filter Section */}
                <div className="filter-card">
                    <div className="filter-row">
                        <div className="filter-group">
                            <label>Transaction Number</label>
                            <input
                                type="text"
                                className="filter-input"
                                value={trxNumber}
                                onChange={(e) => setTrxNumber(e.target.value)}
                            />
                        </div>
                        <div className="filter-group">
                            <label>Type</label>
                            <SearchableDropdown
                                options={['Plus', 'Minus']}
                                value={type}
                                onChange={setType}
                                searchable={false}
                            />
                        </div>
                        <div className="filter-group">
                            <label>Remark</label>
                            <SearchableDropdown
                                options={remarksOptions}
                                value={remark}
                                onChange={setRemark}
                                searchable={true}
                            />
                        </div>
                        <div className="filter-group">
                            <label>Stock</label>
                            <SearchableDropdown
                                options={stocks}
                                value={stock}
                                onChange={setStock}
                                searchable={true}
                            />
                        </div>
                        <div className="filter-group btn-group">
                            <label>&nbsp;</label> {/* Spacer */}
                            <button className="filter-btn" onClick={handleFilter}>Filter</button>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="results-card">
                    {loading ? (
                        <div className="loading-state">Loading...</div>
                    ) : filteredTransactions.length === 0 ? (
                        <div className="empty-state">
                            <div className="clipboard-icon">
                                {/* SVG or simple icon representation */}
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                    <path d="M9 12h6"></path>
                                    <path d="M9 16h6"></path>
                                    <path d="M9 8h6"></path>
                                </svg>
                            </div>
                            <p>No transaction found</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="trx-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Transaction ID</th>
                                        <th>Type</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTransactions.map(t => (
                                        <tr key={t.id}>
                                            <td>{new Date(t.created_at).toLocaleDateString()}</td>
                                            <td>{t.id}</td>
                                            <td style={{ textTransform: 'capitalize' }}>{t.type}</td>
                                            <td className={t.type === 'deposit' ? 'text-green' : 'text-red'}>
                                                ${parseFloat(t.amount).toFixed(2)}
                                            </td>
                                            <td>
                                                <span className={`status-badge ${t.status}`}>{t.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TransactionHistory;
