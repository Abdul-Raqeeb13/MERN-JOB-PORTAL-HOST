import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default function AdminAppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  // useEffect(() => {
  //   const fetchAdminAppliedJobs = async () => {
  //     const token = localStorage.getItem('Token');
  //     try {
  //       const response = await axios({
  //         method: "GET",
  //         url: `http://localhost:8000/admin/adminappliedjobs`,
  //         headers: {
  //           'Authorization': `${token}`,
  //           'Content-Type': "application/json"
  //         },
  //       });


  //       if (response.data && response.data.success) {
  //         setJobs(response.data.data);
  //       } else {
  //         setError('No jobs available');
  //       }
  //     } catch (error) {
  //       setError(error.response?.data?.message || "An error occurred while fetching jobs");
  //     }
  //   };
  //   fetchAdminAppliedJobs();
  //   console.log("run");
    
  // }, []);


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

  // Call fetchAdminAppliedJobs on component mount
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
      }

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
      fetchAdminAppliedJobs()
    } catch (error) {
      setError(error.response?.data?.message || "Failed to accept the job");
    }
  };

  const handleViewCV = async (userid) => {
    try {
        const token = localStorage.getItem('Token');
        
        if (!token) {
            console.error("Authorization token is missing.");
            return;
        }

        const response = await axios.get(`http://localhost:8000/admin/adminGetUserCV`, {
            headers: {
                'Authorization': token,
                'Content-Type': "application/json"
            },
            params: { userId: userid }
        });

        if (response.status === 200 && response.data.pdfName) {
            window.open(`http://localhost:8000/uploads/${response.data.pdfName}`, "_blank", "noreferrer");
        } else {
            console.warn("CV not found or the response was incomplete.");
        }
    } catch (error) {
        if (error.response) {
            // Server responded with a status code outside the 2xx range
            console.error("Error fetching CV:", error.response.data.message || error.response.statusText);
        } else if (error.request) {
            // Request was made, but no response received
            console.error("No response from server:", error.request);
        } else {
            // Something went wrong in setting up the request
            console.error("Error:", error.message);
        }
    }
};



  const handleReject = async (jobId, userid, JobDetails) => {
    const token = localStorage.getItem('Token');

    try {
      const JobsIDs = {
        jobId,
        userid,
        JobDetails,
      }

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

      fetchAdminAppliedJobs()

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
        jobs.slice(0).reverse().map((jobGroup) => // Reverse the jobs array here
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
                            <ViewCVButton onClick={() => handleViewCV(jobGroup.userId)}>View CV</ViewCVButton>
                        </ButtonContainer>
                    )}
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
  background-color: #000000;
  min-height: 100vh;
  padding: 20px;
`;

const Heading = styled.h1`
  text-align: center;
  margin: 20px 0;
  color: #FFD700;
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
  background-color: #1A1A1A;
  border: 1px solid #FFD700;
  border-radius: 8px;
  padding: 20px;
  width: 45%;
  max-width: 500px;
  color: #FFF;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const JobTitle = styled.h3`
  font-size: 1.5rem;
  color: #FFD700;
  margin-bottom: 5px;
`;

const CompanyName = styled.h4`
  font-size: 1.1rem;
  color: #CCCCCC;
  margin-bottom: 15px;
`;

const JobDetails = styled.div`
  font-size: 0.9rem;
  color: #E0E0E0;
  line-height: 1.6;
`;

const DetailItem = styled.p`
  margin: 5px 0;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #E0E0E0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const AcceptButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  flex: 1;
  &:hover {
    background-color: #218838;
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

const ViewCVButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  flex: 1;
  &:hover {
    background-color: #0056b3;
  }
`;

const NoJobsMessage = styled.p`
  color: #AAAAAA;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 20px;
`;
