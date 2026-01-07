import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import './Dashboard.css'; // Use existing dashboard styles

const DashboardLayout = ({ children, activePage }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

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
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <div className="logo-container">
                    <span>🔷 BuckHolding</span>
                </div>
                <ul className="sidebar-menu">
                    <li className="sidebar-item"><a className={`sidebar-link ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => navigate('/dashboard')}>📊 Dashboard</a></li>
                    <li className="sidebar-item"><a className={`sidebar-link ${activePage === 'stocks' ? 'active' : ''}`} onClick={() => navigate('/stocks')}>📈 All Stocks</a></li>
                    <li className="sidebar-item"><a className={`sidebar-link ${activePage === 'assets' ? 'active' : ''}`} onClick={() => navigate('/assets')}>💼 Manage Assets</a></li>
                    <li className="sidebar-item"><a className={`sidebar-link ${activePage === 'transfer' ? 'active' : ''}`} onClick={() => navigate('/transfer')}>⇄ Transfer Balance</a></li>
                    <li className="sidebar-item">
                        <span className="sidebar-link" style={{ cursor: 'default', color: '#64748b' }}>💵 Manage Deposit</span>
                        <ul style={{ listStyle: 'none', paddingLeft: '1rem', marginTop: '0.4rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><a className={`sidebar-link ${activePage === 'deposit-new' ? 'active' : ''}`} onClick={() => navigate('/deposit/new')} style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>New Deposit</a></li>
                            <li style={{ marginBottom: '0.5rem' }}><a className={`sidebar-link ${activePage === 'deposit-history' ? 'active' : ''}`} onClick={() => navigate('/deposit/history')} style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>Deposit History</a></li>
                        </ul>
                    </li>
                    <li className="sidebar-item">
                        <span className="sidebar-link" style={{ cursor: 'default', color: '#64748b' }}>🏦 Manage Withdraw</span>
                        <ul style={{ listStyle: 'none', paddingLeft: '1rem', marginTop: '0.4rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><a className={`sidebar-link ${activePage === 'withdraw-new' ? 'active' : ''}`} onClick={() => navigate('/withdraw/new')} style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>Draw Now</a></li>
                            <li style={{ marginBottom: '0.5rem' }}><a className={`sidebar-link ${activePage === 'withdraw-history' ? 'active' : ''}`} onClick={() => navigate('/withdraw/history')} style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>Withdraw History</a></li>
                        </ul>
                    </li>
                    <li className="sidebar-item"><a className={`sidebar-link ${activePage === 'transactions' ? 'active' : ''}`} onClick={() => navigate('/transactions')}>⏳ Transaction History</a></li>
                    <li className="sidebar-item">
                        <span className="sidebar-link" style={{ cursor: 'default', color: '#64748b' }}>🎫 Support Ticket</span>
                        <ul style={{ listStyle: 'none', paddingLeft: '1rem', marginTop: '0.4rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><a className={`sidebar-link ${activePage === 'support-new' ? 'active' : ''}`} onClick={() => navigate('/support/new')} style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>New Ticket</a></li>
                            <li style={{ marginBottom: '0.5rem' }}><a className={`sidebar-link ${activePage === 'support-history' ? 'active' : ''}`} onClick={() => navigate('/support/history')} style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>My Ticket</a></li>
                        </ul>
                    </li>
                    <li className="sidebar-item"><a className={`sidebar-link ${activePage === 'referrals' ? 'active' : ''}`} onClick={() => navigate('/referrals')}>👥 Manage Referrals</a></li>
                    <li className="sidebar-item"><a className="sidebar-link" onClick={handleLogout} style={{ color: '#ef4444' }}>🚪 Log Out</a></li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="user-profile">
                        <div className="user-info">
                            <span className="user-name">{user?.name}</span>
                            <span className="user-status">Details ▼</span>
                        </div>
                        <div className="user-avatar">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                {/* Scrollable Content Area */}
                <div className="dashboard-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
