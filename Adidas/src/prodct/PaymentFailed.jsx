import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentFailed.css';

const PaymentFailed = () => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate('/cart');
  };

  return (
    <div className="payment-failed-container">
      <div className="failed-animation">
        <svg className="crossmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="crossmark__circle" cx="26" cy="26" r="25" fill="none"/>
          <path className="crossmark__path" fill="none" d="M16 16 36 36 M36 16 16 36"/>
        </svg>
      </div>
      <h1>Payment Failed</h1>
      <p>We're sorry, but your payment could not be processed.</p>
      <button onClick={handleTryAgain} className="try-again-btn">
        Try Again
      </button>
    </div>
  );
};

export default PaymentFailed;