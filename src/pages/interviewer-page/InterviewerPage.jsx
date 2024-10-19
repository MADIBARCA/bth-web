import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './InterviewerPage.css';

const InterviewerPage = () => {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [about, setAbout] = useState('');
  const [skills, setSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState('');
  const [customSkills, setCustomSkills] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const skillOptions = [
    'NodeJS',
    'Java',
    'Spring',
    'Angular',
    'React',
    'Swift',
    'Python',
  ];

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setSkills((prevSkills) =>
      checked ? [...prevSkills, value] : prevSkills.filter((skill) => skill !== value)
    );
  };

  const handleCustomSkillAdd = () => {
    if (customSkill && !customSkills.includes(customSkill)) {
      setCustomSkills([...customSkills, customSkill]);
      setSkills([...skills, customSkill]);
      setCustomSkill('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const interviewerData = {
      fullName,
      dateOfBirth,
      about,
      skills,
      experienceLevel,
    };

    console.log('Interviewer Data:', interviewerData);

    // Navigate to InterviewerProfilePage with interviewer data
    navigate(`/interviewer/profile`, { state: { interviewer: interviewerData } });

    // Reset form fields after submission
    setFullName('');
    setDateOfBirth('');
    setAbout('');
    setSkills([]);
    setCustomSkill('');
    setCustomSkills([]);
    setExperienceLevel('');
  };

  return (
    <div className="interviewer-container">
      <h1 className="interviewer-title">Join as an Interviewer</h1>
      <form className="interviewer-form" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <div className="form-group-inputWrapper">
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Enter your full name"
              className="formGroupInput"
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <div className="form-group-inputWrapper">
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              className="formGroupInput"
            />
          </div>
        </div>

        {/* About Yourself */}
        <div className="form-group">
          <label htmlFor="about">Tell About Yourself</label>
          <div className="form-group-inputWrapper">
            <textarea
              id="about"
              name="about"
              rows="5"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              required
              placeholder="Briefly describe yourself"
              className="formGroupInput"
            ></textarea>
          </div>
        </div>

        {/* Skills */}
        <div className="form-group">
          <label>Skills</label>
          <div className="skills-checkboxes">
            {skillOptions.map((skill) => (
              <label key={skill} className="checkbox-label">
                <input
                  type="checkbox"
                  value={skill}
                  checked={skills.includes(skill)}
                  onChange={handleSkillChange}
                />
                <span className="checkbox-text">{skill}</span>
              </label>
            ))}
            {customSkills.map((skill, index) => (
              <label key={index} className="checkbox-label">
                <input
                  type="checkbox"
                  value={skill}
                  checked={skills.includes(skill)}
                  onChange={handleSkillChange}
                />
                <span className="checkbox-text">{skill}</span>
              </label>
            ))}
          </div>
          <div className="custom-skill-input">
            <input
              type="text"
              placeholder="Add a custom skill"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              className="formGroupInput"
            />
            <button type="button" onClick={handleCustomSkillAdd}>
              Add Skill
            </button>
          </div>
        </div>

        {/* Experience Level Dropdown */}
        <div className="form-group">
          <label htmlFor="experienceLevel">Level of Experience</label>
          <select
            id="experienceLevel"
            name="experienceLevel"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            required
            className="formGroupDropdown"
          >
            <option value="">Select Experience Level</option>
            <option value="Junior">Junior</option>
            <option value="Middle">Middle</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Complete
        </button>
      </form>
    </div>
  );
};

export default InterviewerPage;