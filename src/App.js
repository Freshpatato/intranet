import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider, useUserContext } from './context/UserContext';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Events from './pages/Events';
import Resources from './pages/Resources';
import Assignments from './pages/Assignments';
import Forum from './pages/Forum';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const AppContent = () => {
  const { currentUser } = useUserContext();

  return (
    <div style={{ display: 'flex' }}>
      {currentUser && (
        <Sidebar isAdmin={currentUser.roles && currentUser.roles.includes('admin')} />
      )}
      <div style={{ flex: 1 }}>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute component={Dashboard} />} />
          <Route path="/students" element={<ProtectedRoute component={Students} />} />
          <Route path="/teachers" element={<ProtectedRoute component={Teachers} />} />
          <Route path="/events" element={<ProtectedRoute component={Events} />} />
          <Route path="/resources" element={<ProtectedRoute component={Resources} />} />
          <Route path="/assignments" element={<ProtectedRoute component={Assignments} />} />
          <Route path="/forum" element={<ProtectedRoute component={Forum} />} />
          <Route path="/admin" element={<ProtectedRoute component={AdminDashboard} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
};

export default App;
