// CandidatePage.jsx
import { useState } from 'react';
import './CandidatePage.css';

const CandidatePage = () => {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [degree, setDegree] = useState('');
  const [resume, setResume] = useState(null);
  const [workExperience, setWorkExperience] = useState('');

  const degreeOptions = ['Don\'t have any', 'BSc', 'MSc', 'PhD'];

  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here
    const candidateData = {
      fullName,
      dateOfBirth,
      degree,
      resume,
      workExperience,
    };

    console.log('Candidate Data:', candidateData);

    // Reset form fields after submission
    setFullName('');
    setDateOfBirth('');
    setDegree('');
    setResume(null);
    setWorkExperience('');
  };

  return (
    <div className="candidate-container">
      <h1 className="candidate-title">Apply as a Candidate</h1>
      <form className="candidate-form" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="Enter your full name"
          />
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>

        {/* University Degree */}
        <div className="form-group">
          <label htmlFor="degree">University Degree</label>
          <select
            id="degree"
            name="degree"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            required
          >
            <option value="" disabled>Select your degree</option>
            {degreeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Upload Resume */}
        <div className="form-group">
          <label htmlFor="resume">Upload Resume</label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            required
          />
        </div>

        {/* Work Experience */}
        <div className="form-group">
          <label htmlFor="workExperience">Work Experience</label>
          <textarea
            id="workExperience"
            name="workExperience"
            rows="5"
            value={workExperience}
            onChange={(e) => setWorkExperience(e.target.value)}
            required
            placeholder="Describe your work experience"
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
        Complete
        </button>
      </form>
    </div>
  );
};

export default CandidatePage;
