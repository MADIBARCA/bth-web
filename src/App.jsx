// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StarterPage from './pages/starter-page/StarterPage'; 
import CompanyPage from './pages/company-page/CompanyPage';
import InterviewerPage from './pages/interviewer-page/InterviewerPage';
import CandidatePage from './pages/candidate-page/CandidatePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StarterPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/interviewer" element={<InterviewerPage />} />
        <Route path="/candidate" element={<CandidatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
