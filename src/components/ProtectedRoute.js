import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const ProtectedRoute = ({ component: Component }) => {
  const { currentUser } = useUserContext();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};

export default ProtectedRoute;
