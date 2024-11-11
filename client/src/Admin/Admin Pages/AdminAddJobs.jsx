import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


// Form container centered and responsive
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4; /* Background color for the whole view */
`;

// The form styling itself
const JobForm = styled.form`
  background-image: linear-gradient(-225deg, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%);
  padding: 40px;
  max-width: 600px; /* Optional: max width for form */
  border-radius: 12px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  color: #fff;
`;

// Error message styling
const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

// Form heading styling
const FormTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.8rem;
  color: #fff;
`;

// Input field styling
const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  color: #333;
`;

// Select field styling for job title
const SelectField = styled.select`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  color: #333;
`;

// Textarea styling for job description
const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  color: #333;
  resize: vertical;
`;

// Submit button styling
const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 1.2rem;
  background-color: #00c9ff;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #007acc;
  }
`;

const AdminAddJobForm = () => {

  const nav = useNavigate()

  const token = localStorage.getItem('Token');

  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    experience: '',
    salary: '',
  });

  const [error, setError] = useState('');  // State to handle errors

  const handleChange = (e) => {
    setJobDetails({
      ...jobDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "POST",
        url: 'http://localhost:8000/admin/adminaddjobs',
        headers: {
          'Authorization': `${token}`,  // Include Bearer with the token
          'Content-Type': "application/json"
        },
        data: jobDetails  // Send the object directly, no need to stringify
      });

      console.log(response.data);  // Log the response if successful
      if (response.data) {
        toast.success("Job Posted Success", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });

        setJobDetails({
          title: '',
          description: '',
          company: '',
          location: '',
          experience: '',
          salary: '',
        })

        setTimeout(() => {
          nav('/admin/viewjobs')
        }, 2000);
      }
      setError('');  // Clear any previous errors on successful response
    } catch (e) {
      setError(e.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <>
      <ToastContainer />
      <FormContainer>
        <JobForm onSubmit={handleSubmit}>
          <FormTitle>Post New Job</FormTitle>

          {/* Display error message if any
          {error && <ErrorMessage>{error}</ErrorMessage>} */}

          {/* Job Title Dropdown */}
          <SelectField
            name="title"
            value={jobDetails.title}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Job Title</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
          </SelectField>

          {/* Job Description */}
          <TextArea
            name="description"
            placeholder="Job Description"
            rows="2"
            value={jobDetails.description}
            onChange={handleChange}
            required
          />

          {/* Company Name */}
          <InputField
            type="text"
            name="company"
            placeholder="Company Name"
            value={jobDetails.company}
            onChange={handleChange}
            required
          />

          {/* Location */}
          <InputField
            type="text"
            name="location"
            placeholder="Location"
            value={jobDetails.location}
            onChange={handleChange}
            required
          />

          {/* Experience Required */}
          <InputField
            type="text"
            name="experience"
            placeholder="Experience Required (e.g., 2-4 years)"
            value={jobDetails.experience}
            onChange={handleChange}
            required
          />

          {/* Salary */}
          <InputField
            type="number"
            name="salary"
            placeholder="Salary (e.g., 50000)"
            value={jobDetails.salary}
            onChange={handleChange}
            required
          />

              {/* Display error message if any */}
          {error && <ErrorMessage>{error}</ErrorMessage>}


          {/* Submit Button */}
          <SubmitButton type="submit">Post Job</SubmitButton>
        </JobForm>
      </FormContainer>
    </>

  );
};

export default AdminAddJobForm;
