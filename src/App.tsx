import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { ResumeBuilder } from './pages/ResumeBuilder';
import { ATSAnalyzer } from './pages/ATSAnalyzer';
import { CoverLetter } from './pages/CoverLetter';
import { JobTracker } from './pages/JobTracker';
import { SavedResumes } from './pages/SavedResumes';
import { Profile } from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';
import { ResumeProvider } from './contexts/ResumeContext';

function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <DndProvider backend={HTML5Backend}>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/resume-builder" element={<ResumeBuilder />} />
                <Route path="/ats-analyzer" element={<ATSAnalyzer />} />
                <Route path="/cover-letter" element={<CoverLetter />} />
                <Route path="/job-tracker" element={<JobTracker />} />
                <Route path="/saved-resumes" element={<SavedResumes />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Layout>
          </Router>
        </DndProvider>
      </ResumeProvider>
    </AuthProvider>
  );
}

export default App;