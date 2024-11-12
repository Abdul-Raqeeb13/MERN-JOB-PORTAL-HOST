import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
`;

const JobForm = styled.form`
  background-image: linear-gradient(-225deg, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%);
  padding: 40px;
  max-width: 600px;
  border-radius: 12px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  color: #fff;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.8rem;
  color: #fff;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  color: #333;
`;

const SelectField = styled.select`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  color: #333;
`;

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
  const nav = useNavigate();
  const token = localStorage.getItem('Token');

  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    experience: '',
    salary: '',
    education: '',
    skills: ''
  });

  const [error, setError] = useState('');

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
          'Authorization': `${token}`,
          'Content-Type': "application/json"
        },
        data: jobDetails
      });

      console.log(response);
      

      toast.success("Job Posted Successfully", {
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
        education: '',
        skills: ''
      });

      setTimeout(() => {
        nav('/admin/viewjobs');
      }, 2000);

      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <>
      <ToastContainer />
      <FormContainer>
        <JobForm onSubmit={handleSubmit}>
          <FormTitle>Post New Job</FormTitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SelectField name="title" value={jobDetails.title} onChange={handleChange} required>
            <option value="" disabled>Select Job Title</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
          </SelectField>

          <TextArea name="description" placeholder="Job Description" rows="2" value={jobDetails.description} onChange={handleChange} required />
          <InputField type="text" name="company" placeholder="Company Name" value={jobDetails.company} onChange={handleChange} required />
          <InputField type="text" name="location" placeholder="Location" value={jobDetails.location} onChange={handleChange} required />
          <InputField type="text" name="experience" placeholder="Experience Required (e.g., 2-4 years)" value={jobDetails.experience} onChange={handleChange} required />
          <InputField type="number" name="salary" placeholder="Salary (e.g., 50000)" value={jobDetails.salary} onChange={handleChange} required />
          <InputField type="text" name="education" placeholder="Education Required" value={jobDetails.education} onChange={handleChange} required />
          <InputField type="text" name="skills" placeholder="Skills Required" value={jobDetails.skills} onChange={handleChange} required />

          <SubmitButton type="submit">Post Job</SubmitButton>
        </JobForm>
      </FormContainer>
    </>
  );
};

export default AdminAddJobForm;
