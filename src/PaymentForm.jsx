import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from './api';
import './Auth.css'; // Reusing styles
import { useNavigate } from 'react-router-dom';

// Use environment-based publishable key, fallback to test key for local dev
const stripePublishableKey =
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ||
    'pk_test_TYooMQauvdEDq54NiTphI7jx';

const stripePromise = loadStripe(stripePublishableKey);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState(10); // Default $10
    const [currency, setCurrency] = useState('usd');
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            return;
        }

        try {
            // 1. Create PaymentIntent on backend
            const { data } = await api.post('/payment/create-intent', {
                amount: amount,
                currency: currency
            });

            const clientSecret = data.clientSecret;

            // 2. Confirm Card Payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: 'Verified User', // Ideally fetch from user context
                    },
                }
            });

            if (result.error) {
                setError(`Payment failed: ${result.error.message}`);
                setProcessing(false);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    try {
                        // Inform backend so it can credit funding balance & log transaction
                        await api.post('/payment/confirm', {
                            payment_intent_id: result.paymentIntent.id,
                        });
                        setSucceeded(true);
                        setError(null);
                    } catch (confirmErr) {
                        setError('Payment succeeded but balance update failed. Please contact support.');
                    } finally {
                        setProcessing(false);
                    }
                } else {
                    setError('Payment was not completed.');
                    setProcessing(false);
                }
            }
        } catch (err) {
            setError('Payment initialization failed.');
            setProcessing(false);
        }
    };

    if (succeeded) {
        return (
            <div className="auth-card" style={{ textAlign: 'center', padding: '40px' }}>
                <h2 style={{ color: 'green' }}>Payment Successful!</h2>
                <p>Thank you for your deposit.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
                <label>Amount (USD)</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    required
                />
            </div>

            <div className="form-group">
                <label>Card Details</label>
                <div style={{
                    padding: '12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                }}>
                    <CardElement options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }} />
                </div>
            </div>

            {error && <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

            <button
                type="submit"
                disabled={!stripe || processing}
                className="auth-submit-btn"
                style={{ marginTop: '20px' }}
            >
                {processing ? 'Processing...' : `Pay $${amount}`}
            </button>
        </form>
    );
};

const PaymentForm = () => {
    const navigate = useNavigate();

    return (
        <div className="auth-page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="auth-container" style={{ maxWidth: '500px' }}>
                <div className="auth-card">
                    <div className="auth-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1>Fund Account</h1>
                            <p>Secure payment via Stripe</p>
                        </div>
                        <button
                            type="button"
                            className="auth-submit-btn"
                            style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                            onClick={() => navigate('/deposit-history')}
                        >
                            View History
                        </button>
                    </div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;
