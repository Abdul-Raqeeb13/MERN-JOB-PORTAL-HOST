import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.info("Please login first", {
        position: "top-center",
        autoClose: 900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:'dark'
      }); // Show the alert

      // Set a timeout to redirect after 2 seconds
      const timer = setTimeout(() => {
        setRedirect(true); // Trigger redirect after 2 seconds
      }, 900);

      // Clear the timeout if the component unmounts or isAuthenticated changes
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  if (redirect) {
    return <Navigate to="/" />; // Redirect to home after 2 seconds
  }

  return (
    <>
      <ToastContainer/>
      {element}
    </>
  );
};

export default ProtectedRoute;
