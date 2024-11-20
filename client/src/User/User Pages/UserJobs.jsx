import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #000000; /* Full-page dark background */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  padding: 10px;
`;

const JobCard = styled.div`
  background: linear-gradient(135deg, #333333 50%, #555555 50%);
  border-radius: 15px;
  padding: 25px;
  width: 350px;
  height: 270px;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const JobTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #FFD700;
`;

const CompanyName = styled.p`
  font-size: 1rem;
  color: #CCCCCC;
  margin: 10px 0;
`;

const JobDetails = styled.p`
  font-size: 0.9rem;
  color: #AAAAAA;
  line-height: 1.6;
`;

const SearchBar = styled.input`
  padding: 10px;
  width: 90%;
  border: none;
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 1rem;
`;

const UserJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('Token');
      const userId = localStorage.getItem('UserID');

      try {
        const response = await axios({
          method: "GET",
          url: `http://localhost:8000/user/userViewJobs?userId=${userId}`,
          headers: {
            'Authorization': `${token}`,
            'Content-Type': "application/json"
          },
        });

        if (response.data && response.data.success) {
          setJobs(response.data.data);
          setFilteredJobs(response.data.data); // Initialize filtered jobs
        } else {
          setError('Jobs not found');
        }
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    // Filter jobs based on the search term
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  return (
    <PageWrapper>
      <ToastContainer />
      <h1 className='text-center my-4' style={{ color: 'yellow' }}>Available Jobs</h1>
      <SearchBar
        type="text"
        placeholder="Search by job title or company..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Container>
        {filteredJobs.length > 0 ? (
          filteredJobs.reverse().map(job => (
            <JobCard key={job._id}>
              <JobTitle>{job.title}</JobTitle>
              <CompanyName>{job.company}</CompanyName>
              <JobDetails>
                <strong>Location : </strong> {job.location} <br />
                <strong>Experience : </strong> {job.experience} <br />
                <strong>Salary : </strong> {job.salary} <br />
              </JobDetails>
              <Link to={`/jobdetails/${job._id}`} className="w-100 btn btn-warning">Job Details</Link>
            </JobCard>
          ))
        ) : (
          <p style={{ color: 'white' }}>No jobs available</p>
        )}
      </Container>
    </PageWrapper>
  );
};

export default UserJobs;
  