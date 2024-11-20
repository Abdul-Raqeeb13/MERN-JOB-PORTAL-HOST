import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Alert } from 'react-bootstrap';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowAlert(true); // Show the alert if the user is not authenticated

      // Automatically hide alert after 3 seconds and redirect
      const timer = setTimeout(() => {
        setShowAlert(false);
        setRedirect(true); // Trigger the redirect after alert disappears
      },800);

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [isAuthenticated]);

  if (redirect) {
    return <Navigate to="/" />; // Redirect to home page
  }

  return (
    <>
      {showAlert && (
        <Alert
          variant="warning"
          dismissible
          onClose={() => {
            setShowAlert(false);
            setRedirect(true); // Redirect after closing the alert
          }}
          style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 1050, // Ensures it appears above other elements
            textAlign: 'center',
          }}
        >
          <strong>Login Required:</strong> Please log in to access this page.
        </Alert>
      )}
      {element}
    </>
  );
};

export default ProtectedRoute;
