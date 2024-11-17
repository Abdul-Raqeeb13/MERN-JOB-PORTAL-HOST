import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 2px auto;
  padding: 20px;
  background: #222;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-family: 'Arial', sans-serif;
`;

const LeftSection = styled.div`
  width: 35%;
  text-align: center;
  padding: 20px;
  border-right: 2px solid #ffd700;
`;

const ProfileImage = styled.img`
  width: 80%;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const UserName = styled.h2`
  color: #ffd700;
  font-size: 28px;
  margin-bottom: 10px;
`;

const JobTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #f5a623;
  margin-bottom: 20px;
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0;
`;

const Skill = styled.span`
  background: #333;
  color: yellow;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
`;

const RightSection = styled.div`
  width: 65%;
  padding: 20px;
`;

const SectionTitle = styled.h3`
  color: #ffd700;
  font-size: 22px;
  border-bottom: 2px solid #ffd700;
  padding-bottom: 5px;
  margin-bottom: 15px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
`;

const InfoItem = styled.div`
  font-size: 16px;
  color: #ffd700;
  width: 45%;
`;

const Button = styled.button`
  background: #ffd700;
  color: black;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  margin: 10px 5px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    background: #333;
    color: yellow;
  }
`;

const ExperienceContainer = styled.div`
  background: #333;
  padding: 15px;
  border-radius: 10px;
  margin: 10px 0;
  color: yellow;
`;

const UserProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('Token');
      const userId = localStorage.getItem('UserID');

      try {
        const response = await axios({
          method: "GET",
          url: `http://localhost:8000/user/userSeeProfile?userId=${userId}`,
          headers: {
            Authorization: `${token}`,
            'Content-Type': "application/json"
          },
        });

        if (response.data && response.data.data) {
          setProfile(response.data.data);
        } else {
          console.error('Profile data not found in response');
        }
      } catch (error) {
        console.log('Error fetching profile:', error);
      }
    };

    fetchProfileData();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      {/* Left Section */}
      <LeftSection>
        <ProfileImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&s" alt="Profile" />
        <UserName>{profile.name}</UserName>
        <JobTitle>{profile.jobTitle}</JobTitle>
        <p>{profile.description}</p>

        <SectionTitle>Skills</SectionTitle>
        <Skills>
          {profile.skills?.split(',').map((skill, index) => (
            <Skill key={index}>{skill}</Skill>
          ))}
        </Skills>
        {/* <Button>Add Note</Button> */}
      </LeftSection>

      {/* Right Section */}
      <RightSection>
        <SectionTitle>Basic Information</SectionTitle>
        <InfoContainer>
          <InfoItem><strong>Age:</strong> {profile.age} years</InfoItem>
          <InfoItem><strong>Experience:</strong> {profile.experience} years</InfoItem>
          <InfoItem><strong>Location:</strong> {profile.location}</InfoItem>
          <InfoItem><strong>Phone:</strong> {profile.phone}</InfoItem>
          <InfoItem><strong>Email:</strong> {profile.email}</InfoItem>
        </InfoContainer>

        {/* <Button>Download Resume</Button>
        <Button>Send Email</Button> */}

        <SectionTitle>Experience</SectionTitle>
        {profile.experiences?.map((exp, index) => (
          <ExperienceContainer key={exp._id}>
            <p><strong>Company:</strong> {exp.company}</p>
            <p><strong>Role:</strong> {exp.role}</p>
            <p><strong>Duration:</strong> {exp.duration}</p>
          </ExperienceContainer>
        ))}

        <SectionTitle>Education</SectionTitle>
        <ExperienceContainer>
          <p><strong>Degree:</strong> {profile.degree}</p>
          <p><strong>University:</strong> {profile.university}</p>
          <p><strong>Year:</strong> {profile.year}</p>
        </ExperienceContainer>
      </RightSection>
    </ProfileContainer>
  );
};

export default UserProfile;
