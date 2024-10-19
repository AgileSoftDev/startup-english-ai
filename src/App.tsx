import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage';
import ChatHistoryPage from './components/ChatHistoryPage';
import Onboarding from './components/Onboarding';
import InterviewChat from './components/InterviewChat';
import Summary from './components/Summary';
import ErrorBoundary from './components/ErrorBoundary';
import { useStore } from './store/useStore';

function App() {
  const [user] = useAuthState(auth);
  const { darkMode } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/chat-history" element={<ChatHistoryPage />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/interview" element={<InterviewChat />} />
            <Route path="/interview/:chatId" element={<InterviewChat />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;