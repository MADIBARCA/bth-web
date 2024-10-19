import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams
import './BrowseVacanciesPage.css';

const BrowseVacanciesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [vacancies] = useState([
    { title: 'Software Engineer', company: 'TechCorp', description: 'Develop and maintain software applications.', fullDescription: 'Full job description for Software Engineer at TechCorp.' },
    { title: 'Frontend Developer', company: 'InnovateX', description: 'Build responsive UI with React and Angular.', fullDescription: 'Full job description for Frontend Developer at InnovateX.' },
    { title: 'Backend Developer', company: 'CloudNet', description: 'Design and implement scalable backend services.', fullDescription: 'Full job description for Backend Developer at CloudNet.' },
  ]);

  const navigate = useNavigate(); // Initialize useNavigate
  const { id } = useParams(); // Get candidate ID from the URL params

  const filteredVacancies = vacancies.filter(
    (vacancy) =>
      vacancy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacancy.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacancy.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVacancyClick = (vacancy) => {
    navigate(`/vacancy-details`, { state: { vacancy } }); // Navigate to the VacancyDetailsPage with vacancy details
  };

  // Navigate back to the Candidate Profile page
  const handleBackToProfileClick = () => {
    navigate(`/candidate/profile`); 
  };

  return (
    <div className="browse-vacancies-container">
      {/* Back to Profile Button */}
      <button className="back-to-profile-button" onClick={handleBackToProfileClick}>
        ← Back to Profile
      </button>

      <h1 className="browse-vacancies-title">Browse Job Vacancies</h1>

      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for job title, company, or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Vacancies List */}
      <div className="vacancies-list">
        {filteredVacancies.length > 0 ? (
          filteredVacancies.map((vacancy, index) => (
            <div
              key={index}
              className="vacancy-item"
              onClick={() => handleVacancyClick(vacancy)} // Call the handler when a vacancy is clicked
            >
              <h3>{vacancy.title}</h3>
              <p>Company: {vacancy.company}</p>
              <p>{vacancy.description}</p>
            </div>
          ))
        ) : (
          <p>No vacancies found.</p>
        )}
      </div>
    </div>
  );
};

export default BrowseVacanciesPage;