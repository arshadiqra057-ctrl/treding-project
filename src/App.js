import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import Home from './Home';
import About from './About';
import Compliance from './Compliance';
import Support from './Support';
import Login from './Login';
import Signup from './Signup';
import Footer from './Footer';
import Contact from './Contact';
import ScrollToTop from './ScrollToTop';
import KycSubmission from './KycSubmission';
import PaymentForm from './PaymentForm';
import AdminPanel from './AdminPanel';
import Dashboard from './Dashboard';
import DepositHistory from './DepositHistory';
import AllStocks from './AllStocks';
import ManageAssets from './ManageAssets';
import TransferBalance from './TransferBalance';
import ManageDeposit from './ManageDeposit';
import ManageWithdraw from './ManageWithdraw';
import TransactionHistory from './TransactionHistory';
import ManageReferrals from './ManageReferrals';

function App() {
    return (
        <Router>
            <div className="App">
                <ScrollToTop />
                <Routes>
                    <Route
                        path="*"
                        element={
                            <>
                                <NavWrapper />
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/compliance" element={<Compliance />} />
                                    <Route path="/support" element={<Support />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/signup" element={<Signup />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/kyc" element={<KycSubmission />} />
                                    <Route path="/fund" element={<PaymentForm />} />
                                    <Route path="/deposit-history" element={<DepositHistory />} />
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/stocks" element={<AllStocks />} />
                                    <Route path="/assets" element={<ManageAssets />} />
                                    <Route path="/transfer" element={<TransferBalance />} />
                                    <Route path="/deposit" element={<Navigate to="/deposit/new" replace />} />
                                    <Route path="/deposit/new" element={<ManageDeposit defaultTab="new" />} />
                                    <Route path="/deposit/history" element={<ManageDeposit defaultTab="history" />} />
                                    <Route path="/withdraw" element={<Navigate to="/withdraw/new" replace />} />
                                    <Route path="/withdraw/new" element={<ManageWithdraw defaultTab="new" />} />
                                    <Route path="/withdraw/history" element={<ManageWithdraw defaultTab="history" />} />
                                    <Route path="/transactions" element={<TransactionHistory />} />
                                    <Route path="/support" element={<Navigate to="/support/new" replace />} />
                                    <Route path="/support/new" element={<Support defaultTab="new" />} />
                                    <Route path="/support/history" element={<Support defaultTab="history" />} />
                                    <Route path="/referrals" element={<ManageReferrals />} />
                                </Routes>
                                <FooterWrapper />
                            </>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            localStorage.getItem('token') && localStorage.getItem('isAdmin') === 'true'
                                ? <AdminPanel />
                                : <Navigate to="/login" replace />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

// Simple wrappers to hide on admin route
const NavWrapper = () => {
    return window.location.pathname === '/admin' ? null : <Nav />;
};

const FooterWrapper = () => {
    const hiddenRoutes = [
        '/admin',
        '/dashboard',
        '/stocks',
        '/assets',
        '/transfer',
        '/deposit',
        '/withdraw',
        '/transactions',
        '/support',
        '/referrals',
        '/fund'
    ];

    // Check if current path starts with any of the hidden routes
    const shouldHide = hiddenRoutes.some(route => window.location.pathname.startsWith(route));

    return shouldHide ? null : <Footer />;
};


export default App;

