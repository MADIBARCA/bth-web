import { useLocation } from 'react-router-dom';
import './CandidateProfilePage.css';

const CandidateProfilePage = () => {
  const location = useLocation();

  // Access the candidate data passed via state
  let candidate = location.state?.candidate;

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
    </div>
  );
};

export default CandidateProfilePage;