// InterviewerPage.jsx
import { useState } from 'react';
import './InterviewerPage.css';

const InterviewerPage = () => {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [about, setAbout] = useState('');
  const [skills, setSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');

  const skillOptions = [
    'NodeJS',
    'Java',
    'Spring',
    'Angular',
    'React',
    'Swift',
    // Add more skills as needed
  ];

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setSkills((prevSkills) =>
      checked ? [...prevSkills, value] : prevSkills.filter((skill) => skill !== value)
    );
  };

  const handleCustomSkillAdd = () => {
    if (customSkill && !skills.includes(customSkill)) {
      setSkills([...skills, customSkill]);
      setCustomSkill('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here
    const interviewerData = {
      fullName,
      dateOfBirth,
      about,
      skills,
      experienceLevel,
    };

    console.log('Interviewer Data:', interviewerData);

    // Reset form fields after submission
    setFullName('');
    setDateOfBirth('');
    setAbout('');
    setSkills([]);
    setCustomSkill('');
    setExperienceLevel('');
  };

  return (
    <div className="interviewer-container">
      <h1 className="interviewer-title">Join as an Interviewer</h1>
      <form className="interviewer-form" onSubmit={handleSubmit}>
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

        {/* About Yourself */}
        <div className="form-group">
          <label htmlFor="about">Tell About Yourself</label>
          <textarea
            id="about"
            name="about"
            rows="5"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
            placeholder="Briefly describe yourself"
          ></textarea>
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
                {skill}
              </label>
            ))}
          </div>
          <div className="custom-skill-input">
            <input
              type="text"
              placeholder="Add custom skill"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
            />
            <button type="button" onClick={handleCustomSkillAdd}>
              Add Skill
            </button>
          </div>
        </div>

        {/* Experience Level */}
        <div className="form-group">
          <label>Level of Experience</label>
          <div className="experience-radio">
            <label>
              <input
                type="radio"
                name="experienceLevel"
                value="Junior"
                checked={experienceLevel === 'Junior'}
                onChange={(e) => setExperienceLevel(e.target.value)}
                required
              />
              Junior
            </label>
            <label>
              <input
                type="radio"
                name="experienceLevel"
                value="Middle"
                checked={experienceLevel === 'Middle'}
                onChange={(e) => setExperienceLevel(e.target.value)}
              />
              Middle
            </label>
            <label>
              <input
                type="radio"
                name="experienceLevel"
                value="Senior"
                checked={experienceLevel === 'Senior'}
                onChange={(e) => setExperienceLevel(e.target.value)}
              />
              Senior
            </label>
          </div>
        </div>

        <button type="submit" className="submit-button">
        Complete
        </button>
      </form>
    </div>
  );
};

export default InterviewerPage;
