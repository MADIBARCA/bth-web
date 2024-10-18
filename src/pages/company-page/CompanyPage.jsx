// CompanyPage.jsx
import { useState } from 'react';
import './CompanyPage.css';

const CompanyPage = () => {
  const [companyName, setCompanyName] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const companyData = {
      companyName,
      creationDate,
      description,
    };

    console.log('Company Data:', companyData);

    setCompanyName('');
    setCreationDate('');
    setDescription('');
  };

  return (
    <div className="company-container">
      <h1 className="company-title">Register Your Company</h1>
      <form className="company-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Name of Company</label>
          <div className='form-group-inputWrapper'>
            <input
                type="text"
                id="companyName"
                name="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                placeholder="Enter your company's name"
            />
          </div>

        </div>

        <div className="form-group">
          <label htmlFor="creationDate">Date of Creation</label>
          <div className='form-group-inputWrapper'>
            <input
                type="date"
                id="creationDate"
                name="creationDate"
                value={creationDate}
                onChange={(e) => setCreationDate(e.target.value)}
                required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description of Company</label>
          <div className='form-group-inputWrapper'>
            <textarea
                id="description"
                name="description"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Describe your company"
            />
          </div>
        </div>

        <button type="submit" className="submit-button">
          Complete
        </button>
      </form>
    </div>
  );
};

export default CompanyPage;
