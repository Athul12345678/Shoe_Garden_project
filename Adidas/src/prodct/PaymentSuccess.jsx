import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get('session_id');

    if (sessionId) {
      verifyPayment(sessionId);
    } else {
      setError('No session ID found');
      setLoading(false);
    }
  }, [location]);

  const verifyPayment = async (sessionId) => {
    try {
      const response = await axios.get(`http://localhost:9000/cart/verify-payment/${sessionId}`);
      if (response.data.success) {
        setLoading(false);
      } else {
        setError(`Payment not successful. Status: ${response.data.status}`);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      setError('Unable to verify payment');
      setLoading(false);
    }
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (loading) {
    return <div>Verifying payment...</div>;
  }

  if (error) {
    return (
      <div className="payment-failed-container">
        <h1>Payment Verification Failed</h1>
        <p>{error}</p>
        <button onClick={handleContinueShopping} className="continue-shopping-btn">
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="payment-success-container">
      <div className="success-animation">
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
          <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <button onClick={handleContinueShopping} className="continue-shopping-btn">
        Continue Shopping
      </button>
    </div>
  );
};

export default PaymentSuccess;