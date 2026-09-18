import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CitizenPortal from './components/CitizenPortal';
import AIAnalysisScreen from './components/AIAnalysisScreen';
import IntelligenceDashboard from './components/IntelligenceDashboard';
import DemandHotspots from './components/DemandHotspots';
import Recommendations from './components/Recommendations';
import AboutPage from './components/AboutPage';
import Footer from './components/Footer';

export default function App() {
  const [lastSubmission, setLastSubmission] = useState(null);
  const [extraFeedbackCount, setExtraFeedbackCount] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const navigate = useNavigate();

  // Handle citizen submission from portal → navigate to analysis
  const handleFeedbackSubmitted = (data) => {
    setLastSubmission(data);
    setExtraFeedbackCount(prev => prev + 1);
    navigate('/analysis');
  };

  return (
    <div className="dpi-ambient-bg bg-dpi-grid relative min-h-screen text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">

      {/* Floating Animated Ambient Glow Orbs */}
      <div className="orb-glow-cyan top-[-100px] left-[-100px]"></div>
      <div className="orb-glow-indigo top-[30%] right-[-150px]"></div>
      <div className="orb-glow-rose bottom-[10%] left-[20%]"></div>

      {/* Shared Global Navbar */}
      <Navbar
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        notificationCount={3}
      />

      {/* Route-Based Page Content */}
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/citizen"
            element={
              <CitizenPortal
                currentLanguage={currentLanguage}
                onSubmitFeedback={handleFeedbackSubmitted}
              />
            }
          />
          <Route
            path="/analysis"
            element={
              <AIAnalysisScreen
                submissionData={lastSubmission}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <IntelligenceDashboard
                currentLanguage={currentLanguage}
                extraFeedbackCount={extraFeedbackCount}
              />
            }
          />
          <Route
            path="/hotspots"
            element={
              <DemandHotspots
                currentLanguage={currentLanguage}
              />
            }
          />
          <Route
            path="/recommendations"
            element={
              <Recommendations
                currentLanguage={currentLanguage}
              />
            }
          />
          <Route
            path="/about"
            element={
              <AboutPage
                currentLanguage={currentLanguage}
              />
            }
          />
        </Routes>
      </main>

      {/* Shared Global Footer */}
      <Footer />

    </div>
  );
}
