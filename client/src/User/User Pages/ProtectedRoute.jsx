import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
// import { handleShow } from '../User Components/Navbar'
import { handleModal } from '../User Components/Navbar'


const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  // return isAuthenticated ? element : <Navigate to="/" />;
  if (!isAuthenticated) {
    alert("Please login first"); // Show the alert
    return <Navigate to="/" />; // Redirect to home
  }

  return element;

};

export default ProtectedRoute;