import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StarterPage.css'; // Import the updated CSS file

const StarterPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [userInfo, setUserInfo] = useState(null); // State to store Telegram user info
  const navigate = useNavigate();
  const options = ['Company', 'I am a candidate', 'I am an interviewer'];

  // Initialize Telegram Web App SDK and fetch user info
  useEffect(() => {
    if (window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;

      // Expand the web app to fill the screen
      tg.expand();

      // Get the user information
      const user = tg.initDataUnsafe?.user;
      if (user) {
        setUserInfo({
          firstName: user.first_name,
          lastName: user.last_name,
          username: user.username,
          photoUrl: user.photo_url,
        });
      }
    }
  }, []);

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

      {/* Display Telegram User Info */}
      {userInfo && (
        <div className="user-info">
          <img src={userInfo.photoUrl} alt="User" className="user-photo" />
          <p className="user-name">
            {userInfo.firstName} {userInfo.lastName} (@{userInfo.username})
          </p>
        </div>
      )}

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