import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../User Pages/AuthContext';


const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #121212; /* Dark background for contrast */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
`;

const JobDetailCard = styled.div`
  background: linear-gradient(135deg, #1A1A1A, #333333); /* Dark gray with subtle gradient */
  border-radius: 15px;
  padding: 30px;
  width: 90%;
  max-width: 900px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  color: white;
  position: relative;
  margin-top: 20px;
`;

const JobTitle = styled.h2`
  font-size: 2rem;
  color: #FFD700; /* Bright yellow for the title */
  margin-bottom: 15px;
`;

const CompanyInfo = styled.div`
  font-size: 1.1rem;
  color: #BDC3C7; /* Lighter gray color for company and location */
  margin-bottom: 15px;
`;

const JobDetails = styled.div`
  font-size: 1rem;
  color: #BDC3C7;
  line-height: 1.6;
  margin-bottom: 20px;

  & > p {
    margin-bottom: 8px;
  }

  strong {
    color: #FFD700;
  }
`;

const ApplyButton = styled.button`
  background: #FFD730;
  color: black;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  width: 100%;
  display: block;
  margin: 20px auto 0;
  transition: background 0.3s ease;
  text-transform: uppercase;

  &:hover {
    background: #FFC107;
  }
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #1ABC9C;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  font-size: 1rem;
  width: 200px;
  text-transform: uppercase;

  &:hover {
    background-color: #16A085;
  }
`;

const JobDetail = () => {

  const { profileComplete } = useAuth();

  const nav = useNavigate();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const { jobid } = useParams();

  useEffect(() => {
    const fetchJobDetails = async () => {
      const token = localStorage.getItem('Token');

      try {
        const response = await axios({
          method: "GET",
          url: `http://localhost:8000/user/jobdetails/${jobid}`,
          headers: {
            'Authorization': `${token}`,
            'Content-Type': "application/json"
          }
        });

        if (response.data && response.data.success) {
          setJob(response.data.data);
        } else {
          setError('Job not found');
        }
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred');
      }
    };

    fetchJobDetails();
  }, [jobid]);

  const handleApply = async (jobId) => {
    const userId = localStorage.getItem("UserID");
    const token = localStorage.getItem('Token');

    console.log(profileComplete);
    
    
    if (!profileComplete) {
      alert("please make you profil first")
      nav('/userprofile')
      return null
    }
    else{
      const jobAndUserID = {
        jobId,
        userId
      };
  
      try {
        const response = await axios({
          method: "POST",
          url: 'http://localhost:8000/user/applyjob',
          headers: {
            'Authorization': `${token}`,
            'Content-Type': "application/json"
          },
          data: JSON.stringify(jobAndUserID)
        });
  
        if (response.status === 200 || response.status === 201) {
          toast.success(response.data.message || "Job applied successfully!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
  
          setTimeout(() => {
            nav('/userappliedjobs');
          }, 1100);
        } else {
          toast.warn("Unexpected response from server. Please try again.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to apply for the job.";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    }

  
  };

  return (
    <PageWrapper>
      <ToastContainer />
      <h1 className="text-center my-4" style={{ color: '#FFD700' }}>Job Details</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {job ? (
        <JobDetailCard>
          <JobTitle>{job.title}</JobTitle>
          <CompanyInfo>
            <strong>Company:</strong> {job.company} <br />
            <strong>Location:</strong> {job.location} <br />
            <strong>Experience:</strong> {job.experience} <br />
            <strong>Salary:</strong> {job.salary}
          </CompanyInfo>

          <JobDetails>
            <strong>Job Description:</strong>
            <p>{job.description}</p>

            <strong>Education:</strong>
            <p>{job.education}</p>

            <strong>Skills:</strong>
            <p>{job.skills}</p>
          </JobDetails>

          <ApplyButton onClick={() => handleApply(job._id)}>Apply Now</ApplyButton>
          <BackButton to="/userjobs">Back to Job Listings</BackButton>
        </JobDetailCard>
      ) : (
        <p style={{ color: 'white' }}>Loading job details...</p>
      )}
    </PageWrapper>
  );
};

export default JobDetail;
