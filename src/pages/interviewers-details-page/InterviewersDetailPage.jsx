import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useState } from 'react';
import './InterviewersDetailsPage.css';

const InterviewersDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  // Access the interviewer data passed via state
  const interviewer = location.state?.interviewer;

  // State to handle the transaction status
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [walletAddress] = useState('kQAZO_ZXJZK0pJX0U-zOQvSkRF2RZy35_TC_XomdOAx3c9CR');

  // Fake function to simulate a transaction process
  const handleBuyInterview = () => {
    setIsProcessing(true);
    setTransactionStatus('Transaction initiated. Sending 10 TON...');

    // Simulate the stages of a blockchain transaction with timeouts
    setTimeout(() => {
      setTransactionStatus('Transaction processing...');
    }, 2000);

    setTimeout(() => {
      setTransactionStatus('Transaction confirmed. Interview purchased successfully!');
      setIsProcessing(false); // Stop processing
    }, 5000);
  };

  // If no interviewer data is found, return an error message
  if (!interviewer) {
    return (
      <div className="interviewer-details-container">
        <h2 className="error-message">Interviewer data not found.</h2>
      </div>
    );
  }

  return (
    <div className="interviewer-details-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate('/browse-interviewers')}>
        ⬅ Back to Interviewers
      </button>

      <h1 className="interviewer-name">{interviewer.name}</h1>
      <p className="interviewer-company">Company: {interviewer.company}</p>
      <p className="interviewer-expertise">Expertise: {interviewer.expertise}</p>
      <p className="interviewer-level">
        Level: <span className="interviewer-level-highlight">Middle</span>
      </p>
      <p className="interviewer-bio">{interviewer.bio}</p>
      <p className="interviewer-price">PRICE: <span className="price-value">10 TON</span></p>

      {/* Optionally add more fields if available */}
      {interviewer.email && (
        <div className="contact-section">
          <h2>Contact Information</h2>
          <p>Email: {interviewer.email}</p>
        </div>
      )}

      {/* Wallet Address Section */}
      <div className="wallet-section">
        <p>Your wallet address:</p>
        <p>{walletAddress}</p>
      </div>

      {/* Transaction Status */}
      {transactionStatus && <p className="transaction-status">{transactionStatus}</p>}

      {/* Buy Interview Button */}
      {transactionStatus !== 'Transaction confirmed. Interview purchased successfully!' && (
        <button className="buy-button" onClick={handleBuyInterview} disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Buy Interview'}
        </button>
      )}
    </div>
  );
};

export default InterviewersDetailsPage;