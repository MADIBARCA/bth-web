import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FiDownload } from 'react-icons/fi'; // Import the download icon
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

  // Function to calculate age from the date of birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference); 
    return Math.abs(ageDate.getUTCFullYear() - 1970); // Calculate the difference in years
  };

  // Function to handle resume download
  const handleResumeDownload = () => {
    const fileUrl = URL.createObjectURL(candidate.resume); // Assuming you have the resume file object stored
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = candidate.resume; // Use the candidate resume file name for download
    link.click();
  };

  return (
    <div className="candidate-profile-container">
      {/* Conditionally render the avatar if uploaded */}
      {candidate.avatar && (
        <div className="avatar-section">
          <img
            src={URL.createObjectURL(candidate.avatar)} // Display the avatar image
            alt="Candidate Avatar"
            className="candidate-avatar"
          />
        </div>
      )}

      <h1 className="candidate-name">{candidate.fullName}</h1>
      <p className="candidate-age">{calculateAge(candidate.dateOfBirth)} years</p>

      
      <p className="candidate-degree">Degree: {candidate.degree}</p>

            {/* Resume Section */}
            <div className="resume-section">
        {candidate.resume ? (
          <button className="download-resume-button" onClick={handleResumeDownload}>
            <FiDownload /> Download Resume
          </button>
        ) : (
          <p>No resume uploaded yet.</p>
        )}
      </div>
      <p className="candidate-experience">{candidate.workExperience}</p>



      {/* Button to browse vacancies */}
      <div className="browse-vacancies-section">
        <button
          className="browse-vacancies-button"
          onClick={() => navigate('/browse-vacancies')}
        >
          Browse Vacancies
        </button>

        <button
              className="browse-vacancies-button"
              onClick={() => navigate('/browse-interviewers')}    
        >
            Browse Interviewers
        </button>
      </div>
    </div>
  );
};

export default CandidateProfilePage;