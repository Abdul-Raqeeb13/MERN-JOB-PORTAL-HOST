import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../User Pages/AuthContext';

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
  const { isprofileComplete } = useAuth();

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
    experiences: [], // Change to an array
    degree: '',
    university: '',
    year: '',
  });

  const navigate = useNavigate();


  useEffect(() => {
    const fetchProfileStatus = async () => {
      try {
        const token = localStorage.getItem('Token');
        const userId = localStorage.getItem('UserID');

        const response = await axios({
          method: "GET",
          url: `http://localhost:8000/user/getProfileStatus?userId=${userId}`,
          headers: {
            Authorization: `${token}`,
            'Content-Type': "application/json",
          },
        });

        console.log(response.data.data);
        if (response.data.data) {
          await isprofileComplete()
          navigate('/seeprofile');
          return null
        }

      
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileStatus();
  }, []);
  // useEffect(() => {

  //   try {
  //     const fetchProfileStatus = async () => {
       
  //         const token = localStorage.getItem('Token');
  //         const userId = localStorage.getItem('UserID');
  
  //         const response = await axios({
  //           method: "GET",
  //           url: `http://localhost:8000/user/getProfileStatus?userId=${userId}`,
  //           headers: {
  //             Authorization: `${token}`,
  //             'Content-Type': "application/json",
  //           },
  //         });
  
        
  //     };
  //   } catch (error) {
      
  //   }
  //   // const profileComplete = localStorage.getItem('profileComplete');
  //   // console.log(profileComplete);

  //   // if (profileComplete) {
  //   //   navigate('/seeprofile');  // If profile is complete, navigate to profile page
  //   // }
  // }, [navigate]);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const token = localStorage.getItem('Token');
        const userId = localStorage.getItem('UserID');

        const response = await axios({
          method: "GET",
          url: `http://localhost:8000/user/getUserEmail?userId=${userId}`,
          headers: {
            Authorization: `${token}`,
            'Content-Type': "application/json",
          },
        });

        setProfileData((prevData) => ({
          ...prevData,
          email: response.data.email,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserEmail();
  }, []);


  const handleExperienceChange = (index, e) => {
    const updatedExperiences = [...profileData.experiences];
    updatedExperiences[index][e.target.name] = e.target.value;
    setProfileData({ ...profileData, experiences: updatedExperiences });
  };

  const addExperience = () => {
    setProfileData((prevData) => ({
      ...prevData,
      experiences: [...prevData.experiences, { company: '', role: '', duration: '' }],
    }));
  };

  const removeExperience = (index) => {
    const updatedExperiences = profileData.experiences.filter((_, i) => i !== index);
    setProfileData({ ...profileData, experiences: updatedExperiences });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

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
    const token = localStorage.getItem('Token');
    const userId = localStorage.getItem('UserID');
    console.log(profileData);
    
    try {
      const response = await axios({
        method: "POST",
        url: `http://localhost:8000/user/usermakeprofile?userId=${userId}`,
        headers: {
          Authorization: `${token}`,
          'Content-Type': "application/json",
        },
        data: JSON.stringify(profileData),
      });

      toast.success("Profile created successfully!", {
        position: "top-center",
        autoClose: 1900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    });;
      localStorage.setItem("profileComplete", true);
      navigate('/seeprofile'); // Navigate to profile view after profile creation
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred!");
    }
  };

  return (
    <FormContainer>
      <ToastContainer />
      <FormTitle>User Profile Information</FormTitle>
      <form onSubmit={handleSubmit}>
        <SectionTitle>Basic Information</SectionTitle>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            value={profileData.name}
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Job Title</Label>
          <Input
            type="text"
            name="jobTitle"
            value={profileData.jobTitle}
            placeholder="Job Title"
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <TextArea
            name="description"
            value={profileData.description}
            placeholder="Brief Description"
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>DOB</Label>
          <Input
            type="date"
            name="dob"
            value={profileData.dob}
            placeholder="Date Of Birth"
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Age</Label>
          <Input type="number" name="age" value={profileData.age} placeholder="Age" readOnly />
        </FormGroup>
        <FormGroup>
          <Label>Experience (years)</Label>
          <Input
            type="number"
            name="experience"
            value={profileData.experience}
            placeholder="Years of Experience"
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Location</Label>
          <Input
            type="text"
            name="location"
            value={profileData.location}
            placeholder="Location"
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Phone</Label>
          <Input
            type="tel"
            name="phone"
            value={profileData.phone}
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={profileData.email}
            placeholder="Email"
            onChange={handleChange}
            required
            readOnly
          />
        </FormGroup>
        <SectionTitle>Skills</SectionTitle>
        <FormGroup>
          <Label>Skills</Label>
          <Input
            type="text"
            name="skills"
            value={profileData.skills}
            placeholder="Skills (comma separated)"
            onChange={handleChange}
            required
          />
        </FormGroup>

        <SectionTitle>Experience</SectionTitle>
        {profileData.experiences.map((exp, index) => (
          <FormGroup key={index}>
            <Label>Company Name</Label>
            <Input
              type="text"
              name="company"
              value={exp.company}
              placeholder="Company Name"
              onChange={(e) => handleExperienceChange(index, e)}
              required
            />
            <Label>Role</Label>
            <Input
              type="text"
              name="role"
              value={exp.role}
              placeholder="Role"
              onChange={(e) => handleExperienceChange(index, e)}
              required
            />
            <Label>Duration</Label>
            <Input
              type="text"
              name="duration"
              value={exp.duration}
              placeholder="Duration (e.g., 2 years)"
              onChange={(e) => handleExperienceChange(index, e)}
              required
            />
            <Button type="button" onClick={() => removeExperience(index)}>
              Remove Experience
            </Button>
          </FormGroup>
        ))}
        <Button type="button" onClick={addExperience}>
          Add Experience
        </Button>
        <SectionTitle>Education</SectionTitle>
        <FormGroup>
          <Label>Degree</Label>
          <Input
            type="text"
            name="degree"
            value={profileData.degree}
            placeholder="Educational background or Latest degree that you have"
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>University</Label>
          <Input
            type="text"
            name="university"
            value={profileData.university}
            placeholder="University"
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Years</Label>
          <Input
            type="text"
            name="year"
            value={profileData.year}
            placeholder="Years"
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button type="submit">Submit Profile</Button>
      </form>
    </FormContainer>
  );
};

export default UserProfileForm;
