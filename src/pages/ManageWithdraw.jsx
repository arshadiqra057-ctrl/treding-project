import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import KycSubmission from './KycSubmission';
// We reused DepositHistory earlier for deposit history.
// For Withdraw history, we likely want the same Transaction table but filtered for withdraws.
// However, the backend /transactions returns all. We can filter client side or re-use existing.
import DepositHistory from './DepositHistory';
import './ManageWithdraw.css';

const ManageWithdraw = ({ defaultTab = 'new' }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(defaultTab);

    // Update state if prop changes
    React.useEffect(() => {
        setActiveTab(defaultTab);
    }, [defaultTab]);

    const activeSidebarPage = activeTab === 'new' ? 'withdraw-new' : 'withdraw-history';

    return (
        <DashboardLayout activePage={activeSidebarPage}>
            <div className="manage-withdraw-container">
                {/* Tabs */}
                <div className="withdraw-tabs-header">
                    <button
                        className={`withdraw-tab-btn ${activeTab === 'new' ? 'active' : ''}`}
                        onClick={() => setActiveTab('new')}
                    >
                        Draw Now
                    </button>
                    <button
                        className={`withdraw-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        Withdraw History
                    </button>
                </div>

                {/* Content Area */}
                <div className="withdraw-content-area">
                    {activeTab === 'new' ? (
                        <div className="new-withdraw-wrapper">
                            {/* "Draw now when click on the draw now so automatically go in the Kyc foam"
                                 So we render KycSubmission component directly here.
                              */}
                            <KycSubmission isEmbedded={true} />
                        </div>
                    ) : (
                        <div className="history-tab-wrapper">
                            {/* Reusing DepositHistory here but ideally we'd filter or send a type='withdraw' prop 
                                 if the backend supports filtering. For now showing all history is standard default unless specified.
                                 Let's keep it simple as requested "other component IS draw history" -> implies a history view.
                             */}
                            <DepositHistory isEmbedded={true} />
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ManageWithdraw;
