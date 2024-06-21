import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const ProtectedRoute = ({ component: Component }) => {
  const { currentUser } = useUserContext();

  return currentUser ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
