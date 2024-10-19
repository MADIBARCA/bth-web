import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TonConnectButton } from '@tonconnect/ui-react';
import './StarterPage.css'; // Import the updated CSS file

const StarterPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [telegramUser, setTelegramUser] = useState(null); // Store the user data
  const navigate = useNavigate();
  const options = ['Company', 'I am a candidate', 'I am an interviewer'];

  useEffect(() => {
    // Initialize the WebApp after the component mounts
    window.Telegram.WebApp.ready();

    // Check if user info is available
    const user = window.Telegram.WebApp.initDataUnsafe?.user;
    if (user) {
      setTelegramUser(user); // Save the user info to state
    } else {
      console.error("Telegram user data not available");
    }
  }, []); // The empty dependency array ensures this runs only once

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    // Navigate to the appropriate route based on the selected option
    switch (option) {
      case 'Company':
        navigate('/company');
        break;
      case 'I am a candidate':
        navigate('/candidate');
        break;
      case 'I am an interviewer':
        navigate('/interviewer');
        break;
      default:
        break;
    }
  };

  return (
    <div className="starter-container">
      <div className="starterPageBackgroundGradient" />

      <TonConnectButton />

      {/* Display user info conditionally */}
      <h1 className="starter-title">
        {telegramUser
          ? `${telegramUser.first_name} Transform Your Future with Our Web3 Recruiting Network`
          : 'Transform Your Future with Our Web3 Recruiting Network'}
      </h1>
      
      <p className="starter-subtitle">Who are you? Pick your role to begin:</p>
      
      <div className="options-container">
        {options.map((option) => (
          <div
            key={option}
            className={`option-card ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            <span className="option-text">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarterPage;