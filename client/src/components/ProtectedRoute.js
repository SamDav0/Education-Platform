// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/Auth';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
