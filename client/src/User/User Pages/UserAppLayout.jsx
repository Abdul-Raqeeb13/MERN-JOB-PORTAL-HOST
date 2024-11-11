import React, { useEffect } from 'react';
import UserNavbar from '../User Components/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';

export default function UserAppLayout() {
  const nav = useNavigate(); // Call useNavigate as a function
  const token = localStorage.getItem("admin");

  // Use useEffect to handle redirection based on token
  useEffect(() => {
    if (token) {
      nav('/admin'); // Redirect to admin page if token exists
    }
  }, [token, nav]); // Dependencies: token and navigate function

  return (
    <>
      <UserNavbar />
      <Outlet />
    </>
  );
}
