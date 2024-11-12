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
  background-color: #000;
  min-height: 100vh;
`;

const JobCard = styled.div`
  background: linear-gradient(135deg, #333, #ffdd57);
  border-radius: 15px;
  padding: 20px;
  width:285px;
  height: 300px; /* Fixed height to prevent full height expansion */
  box-shadow: 0 6px 12px rgba(255, 223, 0, 0.3);
  transition: transform 0.3s ease-in-out;
  color: #fff;
  overflow: hidden; /* Hide overflow if you want to cut off excess content */
  border: 1px solid #ffdd57;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(255, 223, 0, 0.5);
  }
`;


const JobTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #ffdd57;
`;

const CompanyName = styled.p`
  font-size: 1rem;
  color: #cccccc;
  margin: 10px 0;
`;

const JobDetails = styled.p`
  font-size: 0.9rem;
  color: #e6e6e6;
  line-height: 1.6;
`;

const DeleteButton = styled.button`
  background-color: #ff4d4f;
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
    background-color: #ff1a1c;
  }
`;

const Heading = styled.h1`
  color: #ffdd57;
  text-align: center;
  background-color: #000;
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
          <p style={{ color: '#fff' }}></p>
        )}
      </Container>
    </>
  );
};

export default AdminViewJobs;
