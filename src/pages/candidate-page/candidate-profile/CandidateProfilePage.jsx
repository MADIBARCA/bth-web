import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './CandidateProfilePage.css';

const CandidateProfilePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Retrieve the candidate data from localStorage
  const candidate = JSON.parse(localStorage.getItem('candidateData'));

  // If no candidate data is found, return an error message
  if (!candidate) {
    return (
      <div className="candidate-profile-container">
        <h2 className="error-message">Candidate data not found.</h2>
      </div>
    );
  }

  return (
    <div className="candidate-profile-container">
      <h1 className="candidate-name">{candidate.fullName}</h1>
      <p className="candidate-dob">Date of Birth: {candidate.dateOfBirth}</p>
      <p className="candidate-degree">Degree: {candidate.degree}</p>
      <p className="candidate-experience">{candidate.workExperience}</p>

      {/* Resume Section */}
      <div className="resume-section">
        <h2>Resume</h2>
        {candidate.resume ? (
          <p>Uploaded Resume: {candidate.resume}</p>
        ) : (
          <p>No resume uploaded yet.</p>
        )}
      </div>

      {/* Button to browse vacancies */}
      <div className="browse-vacancies-section">
        <button
          className="browse-vacancies-button"
          onClick={() => navigate('/browse-vacancies')}
        >
          Browse Vacancies
        </button>
      </div>
    </div>
  );
};

export default CandidateProfilePage;