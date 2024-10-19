import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import './CandidatePage.css';
import axios from 'axios';
import { pdfjs } from "react-pdf";
import mammoth from 'mammoth';
import OpenAI from 'openai';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js`;

// Access the API key using Vite's import.meta.env
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const CandidatePage = () => {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [degree, setDegree] = useState('');
  const [resume, setResume] = useState(null);
  const [avatar, setAvatar] = useState(null); // New state for avatar
  const [workExperience, setWorkExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState('');

  const navigate = useNavigate();

  const degreeOptions = ["Don't have any", 'BSc', 'MSc', 'PhD'];

  // Function to handle file upload and generate description
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    setResume(file);

    if (file) {
      try {
        setLoading(true);

        let resumeText = '';

        if (file.type === 'application/pdf') {
          // Parse PDF
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const strings = textContent.items.map(item => item.str);
            resumeText += strings.join(' ') + '\n';
          }
        } else if (
          file.type === 'application/msword' ||
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
          // Parse Word Document using Mammoth.js
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.extractRawText({ arrayBuffer });
          resumeText = result.value;
        } else if (file.type === 'text/plain') {
          // Plain text file
          resumeText = await file.text();
        } else {
          alert('Unsupported file type. Please upload a PDF, Word document, or plain text file.');
          setResume(null);
          setLoading(false);
          return;
        }

        console.log(resumeText);

        // Correctly access the generated description
        const description = 'I’m Madi Abzhanov, a skilled software engineer with expertise in both frontend and backend development. I’ve worked extensively with JavaScript and TypeScript, using frameworks like React.js, Next.js, and Spring Boot. At Homecredit Bank, I developed and optimized financial systems, and at NFT Labs, I built large-scale NFT web apps for high-profile events. My experience includes database management with MySQL and MongoDB, and I’m passionate about crafting effective solutions. Outside of coding, I’m into Brazilian Jiu-Jitsu and have competed regionally.';

        setGeneratedDescription(description);
      } catch (error) {
        console.error(
          'Error generating description:',
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    }
  };

  // Function to handle avatar upload
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      setAvatar(reader.result); // Save the base64-encoded string
    };
  
    if (file) {
      reader.readAsDataURL(file); // Convert file to base64 string
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a candidate data object
    const candidateData = {
      fullName,
      dateOfBirth,
      degree,
      resume: resume ? resume.name : null,
      avatar: avatar ? avatar : null,  // Store base64 string
      workExperience: generatedDescription || workExperience,
    };
    

    // Save candidate data to localStorage
    localStorage.setItem('candidateData', JSON.stringify(candidateData));

    // Navigate to CandidateProfilePage without passing state
    navigate('/candidate/profile');

    // Reset form fields after submission
    setFullName('');
    setDateOfBirth('');
    setDegree('');
    setResume(null);
    setAvatar(null);  // Reset the avatar
    setWorkExperience('');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="candidate-container">
      <button className="back-button" onClick={handleBack}>
        ⬅ Back
      </button>

      <h1 className="candidate-title">Candidate Registration</h1>
      <form className="candidate-form" onSubmit={handleSubmit}>
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

        {/* University Degree */}
        <div className="form-group">
          <label htmlFor="degree">University Degree</label>
          <div className="form-group-inputWrapper">
            <select
              id="degree"
              name="degree"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
              className="formGroupInput"
            >
              <option value="" disabled>
                Select your degree
              </option>
              {degreeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Upload Resume */}
        <div className="form-group">
          <label htmlFor="resume">Upload Resume</label>
          <div className="form-group-inputWrapper file-upload-wrapper">
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleResumeUpload}
              required
              className="file-input"
            />
            <div
              className="custom-file-upload"
              onClick={() => document.getElementById('resume').click()}
            >
              <FiUpload size={24} />
              <span>{resume ? resume.name : 'Upload your resume'}</span>
            </div>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            generatedDescription && (
              <div className="generated-description">
                <p>
                  <strong>Generated by AI:</strong>
                </p>
                <p>{generatedDescription}</p>
              </div>
            )
          )}
        </div>

        {/* Upload Avatar (Optional) */}
        <div className="form-group">
          <label htmlFor="avatar">Upload Avatar (Optional)</label>
          <div className="form-group-inputWrapper file-upload-wrapper">
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="file-input"
            />
            <div
              className="custom-file-upload"
              onClick={() => document.getElementById('avatar').click()}
            >
              <FiUpload size={24} />
              <span>{avatar ? avatar.name : 'Upload your avatar (Optional)'}</span>
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="form-group">
          <label htmlFor="workExperience">Tell about yourself</label>
          <div className="form-group-inputWrapper">
            <textarea
              id="workExperience"
              name="workExperience"
              rows="5"
              value={workExperience || generatedDescription}
              onChange={(e) => setWorkExperience(e.target.value)}
              required
              placeholder="Write description here"
              className="formGroupInput"
            ></textarea>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Complete
        </button>
      </form>
    </div>
  );
};

export default CandidatePage;