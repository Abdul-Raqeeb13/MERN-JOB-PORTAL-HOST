import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Chart, registerables } from 'chart.js'; // Import registerables from chart.js
import { Line } from 'react-chartjs-2';

// Register all components
Chart.register(...registerables);

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f4;
  min-height: 100vh;
  padding: 20px;
`;

const Heading = styled.h1`
  color: #333;
  margin: 20px 0;
`;

const DashboardCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
`;

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
`;

const CardCount = styled.p`
  font-size: 2rem;
  color: #007bff;
`;

const NoDataMessage = styled.p`
  color: #555;
  font-size: 1.1rem;
`;

// Sample data for the chart
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Jobs Posted',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: '#007bff',
      tension: 0.1,
    },
  ],
};

const AdminDashboard = () => {

  // const [user, totalUser] = useState()
  // const [jobs, totaljobs] = useState()
  // const [, totaljobs] = useState()

  useEffect(()=>{

  },[])

    const nav = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/admin') {
            window.history.pushState(null, null, window.location.href);

            const preventBack = () => {
                window.history.pushState(null, null, window.location.href);
            };

            window.addEventListener('popstate', preventBack);

            return () => {
                window.removeEventListener('popstate', preventBack);
            };
        }
    }, [location.pathname, nav]);

    // Sample data for dashboard cards
    const dashboardData = [
        { title: 'Total Jobs', count: 120 },
        { title: 'Applications Today', count: 45 },
        { title: 'Active Users', count: 200 },
        { title: 'New Jobs', count: 15 },
    ];

    return (
        <Container>
            <Heading>Admin Dashboard</Heading>
            <DashboardCards>
                {dashboardData.length > 0 ? (
                    dashboardData.map((data, index) => (
                        <Card key={index}>
                            <CardTitle>{data.title}</CardTitle>
                            <CardCount>{data.count}</CardCount>
                        </Card>
                    ))
                ) : (
                    <NoDataMessage>No data available</NoDataMessage>
                )}
            </DashboardCards>
            <div style={{ width: '600px', margin: '20px auto' }}>
                <Line data={data} />
            </div>
        </Container>
    );
};

export default AdminDashboard;
