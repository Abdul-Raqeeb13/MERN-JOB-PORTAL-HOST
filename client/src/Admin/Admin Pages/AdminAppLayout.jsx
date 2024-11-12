import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../Admin Components/AdminSidebar';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const ContentArea = styled.div`
  margin-left: 250px;
  background-color: #f4f4f4;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 100px;
  }
`;

export default function AdminAppLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the admin login status from localStorage
    const isAdminLoggedIn = localStorage.getItem('admin');

    if (!isAdminLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <AdminSidebar />
      <ContentArea>
        <Outlet />
      </ContentArea>
    </>
  );
}
