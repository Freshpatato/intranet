import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { UserProvider, useUserContext } from './context/UserContext';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Events from './pages/Events';
import Resources from './pages/Resources';
import Assignments from './pages/Assignments';
import Forum from './pages/Forum';
import Login from './pages/Login';
import Schedule from './pages/Schedule';
import AdminSchedule from './pages/AdminSchedule';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const theme = createTheme();

const AppContent = () => {
  const { currentUser } = useUserContext();

  return (
    <div style={{ display: 'flex' }}>
      {currentUser && (
        <Sidebar isAdmin={currentUser.roles && currentUser.roles.includes('Admins')} />
      )}
      <div style={{ flex: 1 }}>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/students" element={<ProtectedRoute requiredRoles={['Eleves']}><Students /></ProtectedRoute>} />
          <Route path="/teachers" element={<ProtectedRoute requiredRoles={['Professeurs']}><Teachers /></ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
          <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
          <Route path="/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
          <Route path="/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
          <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
          <Route path="/admin-schedule" element={<ProtectedRoute requiredRoles={['Admins']}><AdminSchedule /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
