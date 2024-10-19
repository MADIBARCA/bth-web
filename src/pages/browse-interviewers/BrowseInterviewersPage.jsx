import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './BrowseInterviewersPage.css';

const BrowseInterviewersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [interviewers] = useState([
    { name: 'Mukhtar Amirkhanov', company: 'TechCorp', expertise: 'Software Engineering', bio: 'Experienced software engineer with 10 years in the field.' },
    { name: 'Sam Altman', company: 'InnovateX', expertise: 'Frontend Development', bio: 'Frontend developer specializing in React and Angular.' },
    { name: 'Takeshi Nakamuro', company: 'CloudNet', expertise: 'Backend Development', bio: 'Backend developer with expertise in Node.js and scalable services.' },
  ]);

  const navigate = useNavigate(); // Initialize useNavigate

  const filteredInterviewers = interviewers.filter(
    (interviewer) =>
      interviewer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interviewer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interviewer.expertise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInterviewerClick = (interviewer) => {
  navigate(`/interviewer-details`, { state: { interviewer } });
  };

  // Navigate back to the Candidate Profile page
  const handleBackToProfileClick = () => {
    navigate(`/candidate/profile`); 
  };

  return (
    <div className="browse-interviewers-container">
      {/* Back to Profile Button */}
      <div className='browseInterviewTopRow'>
        <button className="back-to-profile-button" onClick={handleBackToProfileClick}>
          ⬅ Back
        </button>
      </div>

      <h1 className="browse-interviewers-title">Browse Interviewers</h1>

      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for interviewer, company, or expertise"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Interviewers List */}
      <div className="interviewers-list">
        {filteredInterviewers.length > 0 ? (
          filteredInterviewers.map((interviewer, index) => (
            <div
              key={index}
              className="interviewer-item"
              onClick={() => handleInterviewerClick(interviewer)} // Call the handler when an interviewer is clicked
            >
              <h3>{interviewer.name}</h3>
              <p>Company: {interviewer.company}</p>
              <p>Expertise: {interviewer.expertise}</p>
              <p>{interviewer.bio}</p>
            </div>
          ))
        ) : (
          <p>No interviewers found.</p>
        )}
      </div>
    </div>
  );
};

export default BrowseInterviewersPage;