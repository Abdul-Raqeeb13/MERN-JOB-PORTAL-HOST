import React from 'react';
import MainSlider from '../User Components/MainSlider';
import HomeContent from '../User Components/HomeContent';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const nav = useNavigate(); // Call useNavigate as a function
  const token = localStorage.getItem("admin");

  if (token) {
    // If token exists, navigate to '/admin'
    nav('/admin');
    return null; // Prevents rendering the rest of the component
  }

  return (
    <>
      <MainSlider />
      <HomeContent />
    </>
  );
}
