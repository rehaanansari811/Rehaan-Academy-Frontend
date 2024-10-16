// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAllowed, redirectToPath, children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectToPath} />;
  }

  return children; // Render the children if access is allowed
};

export default ProtectedRoute;
