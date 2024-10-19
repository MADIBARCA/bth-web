import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import './VacancyDetailsPage.css';

const VacancyDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const [applied, setApplied] = useState(false); // Track if the user has applied

  // Access the vacancy data passed via state
  const vacancy = location.state?.vacancy;

  // If no vacancy data is found, return an error message
  if (!vacancy) {
    return (
      <div className="vacancy-details-container">
        <h2 className="error-message">Vacancy not found.</h2>
      </div>
    );
  }

  // Handle Apply Now button click
  const handleApplyClick = () => {
    setApplied(true); // Mark the user as having applied
  };

  // Handle back navigation
  const handleBackClick = () => {
    navigate('/browse-vacancies'); // Navigate back to the BrowseVacanciesPage
  };

  return (
    <div className="vacancy-details-container">
      {/* Back Button */}
      <button className="back-button" onClick={handleBackClick}>
      ⬅ Back to Vacancies
      </button>

      <h1 className="vacancy-title">{vacancy.title}</h1>
      <p className="vacancy-company">Company: {vacancy.company}</p>
      <p className="vacancy-description">{vacancy.fullDescription}</p>

      {/* Show Apply Button or Thank You Message */}
      {!applied ? (
        <button className="apply-button" onClick={handleApplyClick}>
          Apply Now
        </button>
      ) : (
        <p className="thank-you-message">
          Thank you! You will receive a notification about your mock-interview soon.
        </p>
      )}
    </div>
  );
};

export default VacancyDetailsPage;