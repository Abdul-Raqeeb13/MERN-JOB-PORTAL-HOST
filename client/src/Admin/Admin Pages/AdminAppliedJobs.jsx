import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function AdminAppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const nav = useNavigation();

  const fetchAdminAppliedJobs = async () => {
    console.log("run");
    
    const token = localStorage.getItem('Token');
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:8000/admin/adminappliedjobs`,
        headers: {
          'Authorization': `${token}`,
          'Content-Type': "application/json"
        },
      });

      if (response.data && response.data.success) {
        setJobs(response.data.data);
      } else {
        setError('No jobs available');
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred while fetching jobs");
    }
  };

  useEffect(() => {
    fetchAdminAppliedJobs();
    console.log("Initial fetch run");
  }, []);

  const handleAccept = async (jobId, userid, JobDetails) => {
    const token = localStorage.getItem('Token');

    try {
      const JobsIDs = {
        jobId,
        userid,
        JobDetails,
      };

      const response = await axios({
        method: "POST",
        url: `http://localhost:8000/admin/adminacceptJob`,
        headers: {
          'Authorization': `${token}`,
          'Content-Type': "application/json"
        },
        data: JobsIDs
      });

      setJobs(prevJobs => prevJobs.map(job =>
        job._id === jobId ? { ...job, status: 'Accepted' } : job
      ));
      fetchAdminAppliedJobs();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to accept the job");
    }
  };

  const handleReject = async (jobId, userid, JobDetails) => {
    const token = localStorage.getItem('Token');

    try {
      const JobsIDs = {
        jobId,
        userid,
        JobDetails,
      };

      const response = await axios({
        method: "POST",
        url: `http://localhost:8000/admin/adminrejectJob`,
        headers: {
          'Authorization': `${token}`,
          'Content-Type': "application/json"
        },
        data: JobsIDs
      });

      setJobs(prevJobs => prevJobs.map(job =>
        job._id === jobId ? { ...job, status: 'Rejected' } : job
      ));

      fetchAdminAppliedJobs();

    } catch (error) {
      setError(error.response?.data?.message || "Failed to reject the job");
    }
  };

  return (
    <Background>
      <Heading>Users Applied Jobs</Heading>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Container>
        {jobs.length > 0 ? (
          jobs.slice(0).reverse().map((jobGroup) => 
            jobGroup.jobs.map((jobdata) => (
              <JobCard key={jobdata._id}>
                <JobTitle>{jobdata.title}</JobTitle>
                <CompanyName>{jobdata.company}</CompanyName>
                <JobDetails>
                  <DetailItem><strong>User Email: </strong>{jobGroup.useremail}</DetailItem>
                  <DetailItem><strong>Location: </strong>{jobdata.location}</DetailItem>
                  <DetailItem><strong>Experience: </strong>{jobdata.experience}</DetailItem>
                  <DetailItem><strong>Salary: </strong>{jobdata.salary}</DetailItem>
                  <DetailItem><strong>Status: </strong>{jobdata.status}</DetailItem>
                  <small>Applied At: {new Date(jobdata.appliedAt).toLocaleDateString()}</small>
                </JobDetails>

                {jobdata.status !== 'Accepted' && jobdata.status !== 'Rejected' && (
                  <ButtonContainer>
                    <AcceptButton onClick={() => handleAccept(jobGroup._id, jobGroup.userId, jobdata._id)}>Accept</AcceptButton>
                    <RejectButton onClick={() => handleReject(jobGroup._id, jobGroup.userId, jobdata._id)}>Reject</RejectButton>
                  </ButtonContainer>
                )}
                <Link to={`/admin/adminUserProfile/${jobGroup.userId}`} className="btn btn-warning mt-2">View Profile</Link>
              </JobCard>
            ))
          )
        ) : (
          !error && <NoJobsMessage>No jobs available</NoJobsMessage>
        )}
      </Container>
    </Background>
  );
}

// Styled components for styling job cards

const Background = styled.div`
  background-color: #ffffff; /* White background */
  min-height: 100vh;
  padding: 20px;
`;

const Heading = styled.h1`
  text-align: center;
  margin: 20px 0;
  color: #1e3a8a; /* Blue color */
  font-size: 2.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const ErrorMessage = styled.p`
  color: #FF6347;
  text-align: center;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
`;

const JobCard = styled.div`
  background-color: #ffffff; /* White background for the card */
  border: 1px solid #1e3a8a; /* Blue border */
  border-radius: 8px;
  padding: 20px;
  width: 45%;
  max-width: 500px;
  color: #333333; /* Dark text for contrast */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow for card */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
   background: linear-gradient(125deg, #1e3a8a, #60a5fa); /* Blue gradient background */
    box-shadow: 0 6px 12px rgba(96, 165, 250, 0.3); /* Lighter blue shadow */
  transition: transform 0.3s ease-in-out;
  color: white;
  overflow: hidden; /* Hide overflow if you want to cut off excess content */
  border: 1px solid #60a5fa;
`;

const JobTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 5px;
  color:black
`;

const CompanyName = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 15px;
  color:black

`;

const JobDetails = styled.div`
  font-size: 0.9rem;
  line-height: 1.6;
`;

const DetailItem = styled.p`
  margin: 5px 0;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const AcceptButton = styled.button`
  background-color: #1e3a8a; /* Blue color */
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  flex: 1;
  &:hover {
    background-color: #153e75;
  }
`;

const RejectButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  flex: 1;
  &:hover {
    background-color: #c82333;
  }
`;

const NoJobsMessage = styled.p`
  color: #aaaaaa;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 20px;
`;
