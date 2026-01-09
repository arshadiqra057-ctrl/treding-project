import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../services/api';
import './Support.css';

// Reusable Dropdown for this component
const SupportDropdown = ({ options, value, onChange, placeholder = "Select" }) => {
    const [isOpen, setIsOpen] = useState(false);
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

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="support-dropdown" ref={dropdownRef}>
            <div className={`support-dropdown-header ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <span>{value || placeholder}</span>
                <span className="arrow-icon">{isOpen ? '▲' : '▼'}</span>
            </div>
            {isOpen && (
                <ul className="support-dropdown-list">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className={`support-dropdown-item ${value === option ? 'selected' : ''}`}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const Support = ({ defaultTab = 'new' }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(defaultTab);

    // Form States
    const [subject, setSubject] = useState('');
    const [priority, setPriority] = useState('High');
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [submitMsg, setSubmitMsg] = useState({ type: '', text: '' });

    // My Tickets State
    const [tickets, setTickets] = useState([]);
    const [loadingTickets, setLoadingTickets] = useState(false);

    useEffect(() => {
        setActiveTab(defaultTab);
    }, [defaultTab]);

    useEffect(() => {
        if (activeTab === 'history') { // 'history' is the value passed in defaultTab prop
            fetchTickets();
        }
    }, [activeTab]);

    const fetchTickets = async () => {
        setLoadingTickets(true);
        try {
            const res = await api.get('/support/tickets');
            setTickets(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingTickets(false);
        }
    };

    const handleFileChange = (e) => {
        // Basic file handling - typically you'd upload these or append to FormData
        // For this demo, just storing file names to show UI state
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles([...files, ...newFiles]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitMsg({ type: '', text: '' });

        try {
            // Check backend requirements. SupportController expects subject, priority, message.
            // Doesn't seem to handle file attachments in the store method shown previously, 
            // so we will send text data. If file upload needed, logic needs to be added to controller.
            await api.post('/support/tickets', {
                subject,
                priority,
                message
            });

            setSubmitMsg({ type: 'success', text: 'Ticket created successfully!' });
            setSubject('');
            setMessage('');
            setPriority('High');
            setFiles([]);

            // Refresh tickets so "My Tickets" has latest data immediately
            fetchTickets();

            // Optionally redirect to history
            setTimeout(() => {
                navigate('/support/history');
            }, 1000);

        } catch (err) {
            setSubmitMsg({ type: 'error', text: err.response?.data?.message || 'Failed to create ticket.' });
        } finally {
            setSubmitting(false);
        }
    };

    const activeSidebarPage = activeTab === 'new' ? 'support-new' : 'support-history';

    return (
        <DashboardLayout activePage={activeSidebarPage}>
            <div className="support-container">
                {/* Tabs */}
                <div className="support-tabs-header">
                    <button
                        className={`support-tab-btn ${activeTab === 'new' ? 'active' : ''}`}
                        onClick={() => navigate('/support/new')}
                    >
                        Open Ticket
                    </button>
                    <button
                        className={`support-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => navigate('/support/history')}
                    >
                        My Ticket
                    </button>
                </div>

                <div className="support-content-area">
                    {activeTab === 'new' ? (
                        <div className="new-ticket-card">
                            <h2 className="card-title">Open Ticket</h2>

                            {submitMsg.text && (
                                <div className={`alert-msg ${submitMsg.type}`}>
                                    {submitMsg.text}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="ticket-form">
                                <div className="form-row">
                                    <div className="form-group flex-2">
                                        <label>Subject <span className="req">*</span></label>
                                        <input
                                            type="text"
                                            className="dark-input"
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group flex-1">
                                        <label>Priority <span className="req">*</span></label>
                                        <SupportDropdown
                                            options={['High', 'Medium', 'Low']}
                                            value={priority}
                                            onChange={setPriority}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Message <span className="req">*</span></label>
                                    <textarea
                                        className="dark-textarea"
                                        rows="6"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    ></textarea>
                                </div>

                                <div className="attachment-section">
                                    <label htmlFor="file-upload" className="add-file-btn">
                                        + Add Attachment
                                    </label>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        multiple
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    <div className="file-list">
                                        {files.map((f, i) => (
                                            <span key={i} className="file-chip">{f.name}</span>
                                        ))}
                                    </div>
                                </div>

                                <p className="file-hint">
                                    Max 5 files can be uploaded | Maximum upload size is 256MB | Allowed File Extensions: .jpg, .jpeg, .png, .pdf, .doc, .docx
                                </p>

                                <div className="form-actions">
                                    <button type="submit" className="submit-ticket-btn" disabled={submitting}>
                                        {submitting ? 'Submitting...' : '> Submit'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="my-tickets-card">
                            <h2 className="card-title">My Tickets</h2>
                            {loadingTickets ? (
                                <p style={{ color: '#94a3b8' }}>Loading...</p>
                            ) : tickets.length === 0 ? (
                                <p style={{ color: '#94a3b8', padding: '20px' }}>No support tickets found.</p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="support-table">
                                        <thead>
                                            <tr>
                                                <th>Subject</th>
                                                <th>Priority</th>
                                                <th>Status</th>
                                                <th>Last Update</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tickets.map(t => (
                                                <tr key={t.id}>
                                                    <td>{t.subject}</td>
                                                    <td>
                                                        <span className={`priority-badge ${t.priority.toLowerCase()}`}>
                                                            {t.priority}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className={`status-badge ${t.status.toLowerCase()}`}>
                                                            {t.status}
                                                        </span>
                                                    </td>
                                                    <td>{new Date(t.updated_at).toLocaleDateString()}</td>
                                                    <td>
                                                        <button className="view-btn">View</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Support;
