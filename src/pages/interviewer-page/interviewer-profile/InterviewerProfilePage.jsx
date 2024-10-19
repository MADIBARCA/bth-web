import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import './InterviewerProfilePage.css';

const InterviewerProfilePage = () => {
  const location = useLocation();

  // Access the interviewer data passed via state
  let interviewer = location.state?.interviewer;

  // If no interviewer data is found, return an error message
  if (!interviewer) {
    return (
      <div className="interviewer-profile-container">
        <h2 className="error-message">Interviewer data not found.</h2>
      </div>
    );
  }

  // State to toggle editing skills
  const [editingSkills, setEditingSkills] = useState(false);
  const [skills, setSkills] = useState(interviewer.skills);

  // Handle saving new skills
  const handleSaveSkills = () => {
    setEditingSkills(false);
    interviewer.skills = skills; // Update the skills in interviewer object
  };

  return (
    <div className="interviewer-profile-container">
      <h1 className="interviewer-name">{interviewer.fullName}</h1>
      <p className="interviewer-dob">Date of Birth: {interviewer.dateOfBirth}</p>
      <p className="interviewer-about">{interviewer.about}</p>
      <p className="interviewer-experience">Experience Level: {interviewer.experienceLevel}</p>

      {/* Skills Section */}
      <div className="skills-section">
        <h2>Skills</h2>
        {editingSkills ? (
          <div className="edit-skills">
            <textarea
              value={skills.join(', ')}
              onChange={(e) => setSkills(e.target.value.split(',').map(skill => skill.trim()))}
            />
            <button onClick={handleSaveSkills}>Save Skills</button>
          </div>
        ) : (
          <div className="skills-list">
            {skills.length > 0 ? (
              <ul>
                {skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p>No skills added yet.</p>
            )}
            <button onClick={() => setEditingSkills(true)}>Edit Skills</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewerProfilePage;