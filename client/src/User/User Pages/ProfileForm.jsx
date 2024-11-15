import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  width: 100%;
  margin: 0.4px auto;
  padding: 50px;
  background: #222;
  color: yellow;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #ffd700;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  color: #ffd700;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #333;
  border-radius: 5px;
  background: #333;
  color: yellow;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #333;
  border-radius: 5px;
  background: #333;
  color: yellow;
  resize: vertical;
`;

const SectionTitle = styled.h3`
  margin-top: 20px;
  color: yellow;
  border-bottom: 2px solid #ffd700;
  padding-bottom: 5px;
`;

const Button = styled.button`
  background: #ffd700;
  color: black;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  margin: 20px 0;
  cursor: pointer;
  font-weight: bold;
  width: 100%;

  &:hover {
    background: #333;
    color: yellow;
  }
`;

const UserProfileForm = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    jobTitle: '',
    description: '',
    age: '',
    experience: '',
    dob: '',
    location: '',
    phone: '',
    email: '',
    skills: '',
    experiences: '',
    education: '',
    // accomplishments: '',
    // certifications: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Calculate age if the dob field is updated
    if (name === 'dob') {
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
  
      setProfileData({ ...profileData, [name]: value, age: age.toString() });
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(profileData);
    const token = localStorage.getItem('Token');
    const userId = localStorage.getItem('UserID');

    console.log(token);
    console.log(userId);
    
    try {

      const response = await axios({
        method: "POST",
        url: `http://localhost:8000/user/usermakeprofile?userId=${userId}`,
        headers: {
          'Authorization': `${token}`,
          'Content-Type': "application/json"
        },
        data : JSON.stringify(profileData)
      });
    } catch (error) {
      
    }
    // This is where you would save or pass profileData to a UserProfile component
  };

  return (
    <FormContainer>
      <FormTitle>User Profile Information</FormTitle>
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <SectionTitle>Basic Information</SectionTitle>
        <FormGroup>
          <Label>Name</Label>
          <Input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Job Title</Label>
          <Input type="text" name="jobTitle" placeholder="Job Title" onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <TextArea name="description" placeholder="Brief Description" onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>DOB</Label>
          <Input type="date" name="dob" placeholder="Date Of Birth" onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
  <Label>Age</Label>
  <Input type="number" name="age" value={profileData.age} placeholder="Age" readOnly />
</FormGroup>
        <FormGroup>
          <Label>Experience (years)</Label>
          <Input type="number" name="experience" placeholder="Years of Experience" onChange={handleChange} required />
        </FormGroup>
       
        <FormGroup>
          <Label>Location</Label>
          <Input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Phone</Label>
          <Input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        </FormGroup>

        {/* Skills */}
        <SectionTitle>Skills</SectionTitle>
        <FormGroup>
          <Label>Skills</Label>
          <Input type="text" name="skills" placeholder="Skills (comma separated)" onChange={handleChange} required />
        </FormGroup>

        {/* Experience */}
        <SectionTitle>Experience</SectionTitle>
        <FormGroup>
          <Label>Experience Details</Label>
          <TextArea name="experiences" placeholder="Deine only latest experience in your related field" onChange={handleChange} required />
        </FormGroup>

        {/* Education */}
        <SectionTitle>Education</SectionTitle>
        <FormGroup>
          <Label>Education</Label>
          <TextArea name="education" placeholder="Educational background or Latest degree that you have" onChange={handleChange} required />
        </FormGroup>

        {/* Accomplishments
        <SectionTitle>Accomplishments</SectionTitle>
        <FormGroup>
          <Label>Accomplishments</Label>
          <TextArea name="accomplishments" placeholder="Your accomplishments" onChange={handleChange} />
        </FormGroup> */}

        {/* Certifications */}
        {/* <SectionTitle>Certifications</SectionTitle>
        <FormGroup>
          <Label>Certifications</Label>
          <Input type='file' name="certifications" placeholder="Your certifications" onChange={handleChange} />
        </FormGroup> */}

        <Button type="submit">Submit Profile</Button>
      </form>
    </FormContainer>
  );
};

export default UserProfileForm;
