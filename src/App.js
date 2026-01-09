import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Compliance from './pages/Compliance';
import Support from './pages/Support';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import KycSubmission from './pages/KycSubmission';
import PaymentForm from './pages/PaymentForm';
import AdminPanel from './pages/AdminPanel';
import Dashboard from './pages/Dashboard';
import DepositHistory from './pages/DepositHistory';
import AllStocks from './pages/AllStocks';
import ManageAssets from './pages/ManageAssets';
import TransferBalance from './pages/TransferBalance';
import ManageDeposit from './pages/ManageDeposit';
import ManageWithdraw from './pages/ManageWithdraw';
import TransactionHistory from './pages/TransactionHistory';
import ManageReferrals from './pages/ManageReferrals';

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
    const location = useLocation();
    return location.pathname === '/admin' ? null : <Nav />;
};

const FooterWrapper = () => {
    const location = useLocation();
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
    const shouldHide = hiddenRoutes.some(route => location.pathname.startsWith(route));

    return shouldHide ? null : <Footer />;
};


export default App;

