// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext'; // Import useAuth

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth(); // Use the useAuth hook

  // if (!auth || auth.status !== 200) {
  //   return <Navigate to="/error-403" />;
  // }

  return children;
};

export default ProtectedRoute;
