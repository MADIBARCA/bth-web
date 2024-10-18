// StarterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StarterPage.css'; // Import the updated CSS file

const StarterPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  const options = ['Company', 'I am a candidate', 'I am an interviewer'];

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

      <h1 className="starter-title">
        Transform Your Future with Our Web3 Recruiting Network
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
