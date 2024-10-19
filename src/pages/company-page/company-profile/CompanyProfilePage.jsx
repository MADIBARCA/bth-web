import { useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './CompanyProfilePage.css';

const CompanyProfilePage = () => {
  const { id } = useParams();
  const location = useLocation();

  // Access the company data passed via state
  let company = location.state?.company;

  // If no company data is found in state, try to retrieve it from localStorage
  if (!company) {
    const storedCompany = localStorage.getItem(`company-2210`);
    if (storedCompany) {
      company = JSON.parse(storedCompany);
    }
  }

  // If still no company data, show an error message or redirect
  if (!company) {
    return (
      <div className="company-profile-container">
        <h2 className="error-message">Company not found.</h2>
      </div>
    );
  }

  // State for vacancies and whether the form to add a new vacancy is visible
  const [vacancies, setVacancies] = useState([]);
  const [isAddingVacancy, setIsAddingVacancy] = useState(false);
  const [newVacancy, setNewVacancy] = useState({
    title: '',
    salary: '',
    description: '',
  });

  // Handle adding a new vacancy
  const handleAddVacancy = (e) => {
    e.preventDefault();
    setVacancies([...vacancies, newVacancy]);
    setIsAddingVacancy(false);
    setNewVacancy({ title: '', salary: '', description: '' });
  };

  // Handle input change for the new vacancy form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVacancy((prevVacancy) => ({
      ...prevVacancy,
      [name]: value,
    }));
  };

  // Handle editing a vacancy
  const handleEditVacancy = (index) => {
    const vacancyToEdit = vacancies[index];
    setNewVacancy(vacancyToEdit);
    setVacancies(vacancies.filter((_, i) => i !== index));
    setIsAddingVacancy(true);
  };

  return (
    <div className="company-profile-container">
      <img
        src={company.image}
        alt={`${company.name} Logo`}
        className="company-image"
      />
      <h1 className="company-name">{company.name}</h1>
      <p className="company-description">{company.description}</p>
      <p className="company-creation-date">
        We have been operating since {new Date(company.creationDate).getFullYear()}
      </p>

      {/* Vacancies Section */}
      <div className="vacancies-section">
        <h2 className="vacancies-title">Vacancies</h2>
        {vacancies.length === 0 ? (
          <div className="no-vacancies">
            <p>You don&apos;t have any active vacancies published yet :(</p>
            <button
              className="add-vacancy-button"
              onClick={() => setIsAddingVacancy(true)}
            >
              Add Vacancy
            </button>
          </div>
        ) : (
          <div className="vacancies-list">
            {vacancies.map((vacancy, index) => (
              <div key={index} className="vacancy-item">
                <h3>{vacancy.title}</h3>
                <p>Salary: {vacancy.salary}</p>
                <p>{vacancy.description}</p>
                <button
                  className="edit-vacancy-button"
                  onClick={() => handleEditVacancy(index)}
                >
                  Edit
                </button>
              </div>
            ))}
            <button
              className="add-vacancy-button"
              onClick={() => setIsAddingVacancy(true)}
            >
              Add Vacancy
            </button>
          </div>
        )}

        {/* Vacancy Form (Shown when adding or editing a vacancy) */}
        {isAddingVacancy && (
          <form className="vacancy-form" onSubmit={handleAddVacancy}>
            <div className="form-group">
              <label htmlFor="title">Job Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newVacancy.title}
                onChange={handleInputChange}
                required
                placeholder="Enter job title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="salary">Salary</label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={newVacancy.salary}
                onChange={handleInputChange}
                required
                placeholder="Enter salary"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={newVacancy.description}
                onChange={handleInputChange}
                required
                placeholder="Enter job description"
              />
            </div>

            <button type="submit" className="submit-vacancy-button">
              {vacancies.some((vac) => vac.title === newVacancy.title)
                ? 'Update Vacancy'
                : 'Add'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CompanyProfilePage;