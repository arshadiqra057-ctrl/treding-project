import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../pages/Dashboard.css'; // Use existing dashboard styles

const DashboardLayout = ({ children, activePage }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [expandedMenu, setExpandedMenu] = useState(() => {
        if (activePage?.includes('deposit')) return 'deposit';
        if (activePage?.includes('withdraw')) return 'withdraw';
        if (activePage?.includes('support')) return 'support';
        return '';
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/user');
                setUser(response.data);
            } catch (error) {
                if (error.response?.status === 401) {
                    navigate('/login');
                }
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <div className="logo-container">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#3b82f6' }}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                    <span>BuckHolding</span>
                </div>
                <ul className="sidebar-menu">
                    <li className="sidebar-item"><a className={`sidebar-link ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => navigate('/dashboard')}>
                        <span className="sidebar-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg></span>
                        Dashboard
                    </a></li>

                    <li className="sidebar-item"><a className={`sidebar-link ${activePage === 'stocks' ? 'active' : ''}`} onClick={() => navigate('/stocks')}>
                        <span className="sidebar-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg></span>
                        All Stocks
                    </a></li>

                    <li className="sidebar-item"><a className={`sidebar-link ${activePage === 'assets' ? 'active' : ''}`} onClick={() => navigate('/assets')}>
                        <span className="sidebar-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg></span>
                        Manage Assets
                    </a></li>

                    <li className="sidebar-item"><a className={`sidebar-link ${activePage === 'transfer' ? 'active' : ''}`} onClick={() => navigate('/transfer')}>
                        <span className="sidebar-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg></span>
                        Transfer Balance
                    </a></li>

                    <li className="sidebar-item">
                        <a
                            className={`sidebar-link ${activePage?.includes('deposit') ? 'active' : ''}`}
                            onClick={() => setExpandedMenu(expandedMenu === 'deposit' ? '' : 'deposit')}
                            style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span className="sidebar-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line><line x1="12" y1="15" x2="12" y2="15"></line></svg></span>
                                <span>Manage Deposit</span>
                            </div>
                            <span style={{ fontSize: '0.8rem' }}>{expandedMenu === 'deposit' ? '▼' : '▶'}</span>
                        </a>
                        {expandedMenu === 'deposit' && (
                            <ul style={{ listStyle: 'none', paddingLeft: '2.5rem', marginTop: '0rem' }}>
                                <li style={{ marginBottom: '0.25rem' }}><a className={`sidebar-link ${activePage === 'deposit-new' ? 'active' : ''}`} onClick={() => navigate('/deposit/new')} style={{ fontSize: '0.85rem', padding: '0.5rem', borderLeft: activePage === 'deposit-new' ? '2px solid #3b82f6' : '2px solid transparent' }}>New Deposit</a></li>
                                <li style={{ marginBottom: '0.25rem' }}><a className={`sidebar-link ${activePage === 'deposit-history' ? 'active' : ''}`} onClick={() => navigate('/deposit/history')} style={{ fontSize: '0.85rem', padding: '0.5rem', borderLeft: activePage === 'deposit-history' ? '2px solid #3b82f6' : '2px solid transparent' }}>Deposit History</a></li>
                            </ul>
                        )}
                    </li>

                    <li className="sidebar-item">
                        <a
                            className={`sidebar-link ${activePage?.includes('withdraw') ? 'active' : ''}`}
                            onClick={() => setExpandedMenu(expandedMenu === 'withdraw' ? '' : 'withdraw')}
                            style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span className="sidebar-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></span>
                                <span>Manage Withdraw</span>
                            </div>
                            <span style={{ fontSize: '0.8rem' }}>{expandedMenu === 'withdraw' ? '▼' : '▶'}</span>
                        </a>
                        {expandedMenu === 'withdraw' && (
                            <ul style={{ listStyle: 'none', paddingLeft: '2.5rem', marginTop: '0rem' }}>
                                <li style={{ marginBottom: '0.25rem' }}><a className={`sidebar-link ${activePage === 'withdraw-new' ? 'active' : ''}`} onClick={() => navigate('/withdraw/new')} style={{ fontSize: '0.85rem', padding: '0.5rem', borderLeft: activePage === 'withdraw-new' ? '2px solid #3b82f6' : '2px solid transparent' }}>Draw Now</a></li>
                                <li style={{ marginBottom: '0.25rem' }}><a className={`sidebar-link ${activePage === 'withdraw-history' ? 'active' : ''}`} onClick={() => navigate('/withdraw/history')} style={{ fontSize: '0.85rem', padding: '0.5rem', borderLeft: activePage === 'withdraw-history' ? '2px solid #3b82f6' : '2px solid transparent' }}>Withdraw History</a></li>
                            </ul>
                        )}
                    </li>

                    <li className="sidebar-item"><a className={`sidebar-link ${activePage === 'transactions' ? 'active' : ''}`} onClick={() => navigate('/transactions')}>
                        <span className="sidebar-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span>
                        Transaction History
                    </a></li>

                    <li className="sidebar-item">
                        <a
                            className={`sidebar-link ${activePage?.includes('support') ? 'active' : ''}`}
                            onClick={() => setExpandedMenu(expandedMenu === 'support' ? '' : 'support')}
                            style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span className="sidebar-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></span>
                                <span>Support Ticket</span>
                            </div>
                            <span style={{ fontSize: '0.8rem' }}>{expandedMenu === 'support' ? '▼' : '▶'}</span>
                        </a>
                        {expandedMenu === 'support' && (
                            <ul style={{ listStyle: 'none', paddingLeft: '2.5rem', marginTop: '0rem' }}>
                                <li style={{ marginBottom: '0.25rem' }}><a className={`sidebar-link ${activePage === 'support-new' ? 'active' : ''}`} onClick={() => navigate('/support/new')} style={{ fontSize: '0.85rem', padding: '0.5rem', borderLeft: activePage === 'support-new' ? '2px solid #3b82f6' : '2px solid transparent' }}>New Ticket</a></li>
                                <li style={{ marginBottom: '0.25rem' }}><a className={`sidebar-link ${activePage === 'support-history' ? 'active' : ''}`} onClick={() => navigate('/support/history')} style={{ fontSize: '0.85rem', padding: '0.5rem', borderLeft: activePage === 'support-history' ? '2px solid #3b82f6' : '2px solid transparent' }}>My Ticket</a></li>
                            </ul>
                        )}
                    </li>

                    <li className="sidebar-item"><a className={`sidebar-link ${activePage === 'referrals' ? 'active' : ''}`} onClick={() => navigate('/referrals')}>
                        <span className="sidebar-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span>
                        Manage Referrals
                    </a></li>

                    <li className="sidebar-item"><a className="sidebar-link" onClick={handleLogout} style={{ color: '#ef4444' }}>
                        <span className="sidebar-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></span>
                        Log Out
                    </a></li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem' }} title="Log Out">
                            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#ef4444' }}>Log Out</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        </button>
                        <div className="user-profile">
                            <div className="user-info">
                                <span className="user-name">{user?.name}</span>
                                <span className="user-status">Details ▼</span>
                            </div>
                            <div className="user-avatar">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content Area */}
                <div className="dashboard-content">
                    {children}
                </div>
            </main>
            {/* Bottom Navigation (Mobile) */}
            <div className="bottom-nav">
                <div className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => navigate('/dashboard')}>
                    <div className="nav-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg></div>
                    <span>Dashboard</span>
                </div>
                <div className={`nav-item ${activePage === 'stocks' ? 'active' : ''}`} onClick={() => navigate('/stocks')}>
                    <div className="nav-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg></div>
                    <span>Stocks</span>
                </div>
                <div className={`nav-item ${activePage?.includes('deposit') ? 'active' : ''}`} onClick={() => navigate('/deposit/new')}>
                    <div className="nav-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></div>
                    <span>Deposit</span>
                </div>
                <div className={`nav-item ${activePage?.includes('withdraw') ? 'active' : ''}`} onClick={() => navigate('/withdraw/new')}>
                    <div className="nav-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg></div>
                    <span>Withdraw</span>
                </div>
                <div className="nav-item" onClick={() => navigate('/assets')}>
                    <div className="nav-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
                    <span>Profile</span>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
