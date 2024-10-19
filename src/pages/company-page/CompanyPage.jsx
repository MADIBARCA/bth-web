// src/CompanyPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './CompanyPage.css';

const CompanyPage = () => {
  const [companyName, setCompanyName] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [description, setDescription] = useState('');
  const [companyImage, setCompanyImage] = useState(null);

  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCompanyImage(ev.target.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Generate a unique ID for the company
    const companyId = '2210';//uuidv4();
  
    // Create a company object
    const newCompany = {
      id: '2210', //companyId,
      name: companyName,
      creationDate,
      description,
      image: companyImage, // Base64 string
    };
  
    console.log('New Company:', newCompany);
  
    // Save to localStorage
    localStorage.setItem(`company-${companyId}`, JSON.stringify(newCompany));
  
    // Navigate to the company profile page with state
    navigate(`/company/${companyId}`, { state: { company: newCompany } });
  
    // Reset form fields after submission (optional)
    setCompanyName('');
    setCreationDate('');
    setDescription('');
    setCompanyImage(null);
  };

  return (
    <div className="company-container">
      <h1 className="company-title">Register Your Company</h1>
      <form className="company-form" onSubmit={handleSubmit}>
        {/* Company Name */}
        <div className="form-group">
          <label htmlFor="companyName">Name of Company</label>
          <div className="form-group-inputWrapper">
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              placeholder="Enter your company's name"
              className="formGroupInput"
            />
          </div>
        </div>

        {/* Creation Date */}
        <div className="form-group">
          <label htmlFor="creationDate">Date of Creation</label>
          <div className="form-group-inputWrapper">
            <input
              type="date"
              id="creationDate"
              name="creationDate"
              value={creationDate}
              onChange={(e) => setCreationDate(e.target.value)}
              required
              className="formGroupInput"
            />
          </div>
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description of Company</label>
          <div className="form-group-inputWrapper">
            <textarea
              id="description"
              name="description"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Describe your company"
              className="formGroupInput"
            ></textarea>
          </div>
        </div>

        {/* Company Image */}
        <div className="form-group">
          <label htmlFor="companyImage">Upload Company Image</label>
          <div className="form-group-inputWrapper">
            <input
              type="file"
              id="companyImage"
              name="companyImage"
              accept="image/*"
              onChange={handleImageUpload}
              required
              className="formGroupInput"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Complete
        </button>
      </form>
    </div>
  );
};

export default CompanyPage;