import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row; /* Stack items vertically */
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background-color: #ffffff;
  min-height: 100vh;
`;

const JobCard = styled.div`
  background: linear-gradient(135deg, #1e3a8a, #60a5fa); /* Blue gradient background */
  border-radius: 15px;
  padding: 20px;
  width: 285px;
  height: 300px; /* Fixed height to prevent full height expansion */
  box-shadow: 0 6px 12px rgba(96, 165, 250, 0.3); /* Lighter blue shadow */
  transition: transform 0.3s ease-in-out;
  color: #ffffff;
  overflow: hidden; /* Hide overflow if you want to cut off excess content */
  border: 1px solid #60a5fa;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(96, 165, 250, 0.5);
  }
`;

const JobTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #ffffff;
`;

const CompanyName = styled.p`
  font-size: 1rem;
  color: #e2e8f0;
  margin: 10px 0;
`;

const JobDetails = styled.p`
  font-size: 0.9rem;
  color: #cbd5e1;
  line-height: 1.6;
`;

const DeleteButton = styled.button`
  background-color: #f87171; /* Light red button */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f44336; /* Darker red on hover */
  }
`;

const Heading = styled.h1`
  color: #1e3a8a; /* Dark blue */
  text-align: center;
  background-color: #ffffff;
  padding: 20px;
  margin: 0;
`;

const AdminViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('Token');
      
      try {
        const response = await axios({
          method: "GET",
          url: 'http://localhost:8000/admin/adminviewjobs',
          headers: {
            'Authorization': `${token}`,
            'Content-Type': "application/json"
          },
        });

        if (response.data && response.data.success) {
          setJobs(response.data.data);
        } else {
          setError('Jobs not found');
        }
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    const token = localStorage.getItem('Token');
    
    try {
      const response = await axios({
        method: "DELETE",
        url: `http://localhost:8000/admin/admindeletejobs/?id=${jobId}`,
        headers: {
          'Authorization': `${token}`,
          'Content-Type': "application/json"
        },
      });
  
      if (response.data.success) {
        setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
      } else {
        setError('Failed to delete job');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while deleting');
    }
  };

  return (
    <>
      <Heading>Admin View Jobs</Heading>
      <Container>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        {jobs.length > 0 ? (
          jobs.slice(0).reverse().map(job => (
            <JobCard key={job._id}>
              <JobTitle>{job.title}</JobTitle>
              <CompanyName>{job.company}</CompanyName>
              <JobDetails>
                <strong>Location:</strong> {job.location} <br />
                <strong>Experience:</strong> {job.experience} <br />
                <strong>Salary:</strong> {job.salary} <br />
              </JobDetails>
              <DeleteButton onClick={() => handleDelete(job._id)}>Delete Job</DeleteButton>
            </JobCard>
          ))
        ) : (
          <p style={{ color: '#1e3a8a', textAlign: 'center' }}>No Jobs Available</p>
        )}
      </Container>
    </>
  );
};

export default AdminViewJobs;
