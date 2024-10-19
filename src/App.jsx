// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StarterPage from './pages/starter-page/StarterPage'; 
import CompanyPage from './pages/company-page/CompanyPage';
import InterviewerPage from './pages/interviewer-page/InterviewerPage';
import CandidatePage from './pages/candidate-page/CandidatePage';
import CompanyProfilePage from './pages/company-page/company-profile/CompanyProfilePage';
import InterviewerProfilePage from './pages/interviewer-page/interviewer-profile/InterviewerProfilePage';
import CandidateProfilePage from './pages/candidate-page/candidate-profile/CandidateProfilePage';
import BrowseVacanciesPage from './pages/browse-vaccancies/BrowseVacanciesPage';
import VacancyDetailsPage from './pages/vacancy-details-page/VacancyDetailsPage';
import BrowseInterviewersPage from './pages/browse-interviewers/BrowseInterviewersPage';
import InterviewersDetailsPage from './pages/interviewers-details-page/InterviewersDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StarterPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/interviewer" element={<InterviewerPage />} />
        <Route path="/candidate" element={<CandidatePage />} />
        <Route path="/company/:id" element={<CompanyProfilePage />} /> {/* New Route */}
        <Route path="/interviewer/profile" element={<InterviewerProfilePage />} /> {/* New route */}
        <Route path="/candidate/profile" element={<CandidateProfilePage />} /> {/* New route */}
        <Route path="/browse-vacancies" element={<BrowseVacanciesPage />} /> {/* New route */}
        <Route path="/vacancy-details" element={<VacancyDetailsPage />} /> {/* New route */}
        <Route path="/browse-interviewers" element={<BrowseInterviewersPage />} /> {/* New route */}
        <Route path="/interviewer-details" element={<InterviewersDetailsPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
