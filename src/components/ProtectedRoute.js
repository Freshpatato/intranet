import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const ProtectedRoute = ({ children, requiredRoles }) => {
  const { currentUser } = useUserContext();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (requiredRoles && !requiredRoles.some(role => currentUser.roles.includes(role))) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
