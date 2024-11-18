import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const ProfileContainer = styled.div`
  display: flex;
  width: 90%;
  margin: 0px auto;
  padding: 20px;
  background: linear-gradient(90deg, #0077b6, #023e8a);
  color: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  font-family: 'Arial', sans-serif;
`;

const LeftSection = styled.div`
  width: 35%;
  text-align: center;
  padding: 20px;
  border-right: 2px solid #fff;
`;

const ProfileImage = styled.img`
  width: 80%;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 5px solid #fff;
`;

const UserName = styled.h2`
  color: #ffdd00;
  font-size: 28px;
  margin-bottom: 10px;
`;

const JobTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #caf0f8;
  margin-bottom: 20px;
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0;
`;

const Skill = styled.span`
  background: #023e8a;
  color: #ffdd00;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  border: 2px solid #ffdd00;
`;

const RightSection = styled.div`
  width: 65%;
  padding: 20px;
`;

const SectionTitle = styled.h3`
  color: #ffdd00;
  font-size: 22px;
  border-bottom: 2px solid #ffdd00;
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
  color: #fff;
  width: 45%;
`;

const Button = styled.button`
  background: #ffdd00;
  color: #023e8a;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  margin: 10px 5px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    background: #fff;
    color: #0077b6;
  }
`;

const ExperienceContainer = styled.div`
  background: #0077b6;
  padding: 15px;
  border-radius: 10px;
  margin: 10px 0;
  color: #ffdd00;
`;

const AdminUserProfile = () => {
  const [profile, setProfile] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('Token');

      try {
        const response = await axios.get(
          `http://localhost:8000/admin/adminUserProfile`,
          {
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'application/json',
            },
            params: { userId: userId },
          }
        );

        if (response.data && response.data.data) {
          setProfile(response.data.data);
        } else {
          console.error('Profile data not found in response');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfileData();
  }, [userId]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      {/* Left Section */}
      <LeftSection>
        <ProfileImage
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&s"
          alt="Profile"
        />
        <UserName>{profile.name}</UserName>
        <JobTitle>{profile.jobTitle}</JobTitle>
        <p style={{ textAlign: 'justify' }}>{profile.description}</p>

        <SectionTitle>Skills</SectionTitle>
        <Skills>
          {profile.skills?.split(',').map((skill, index) => (
            <Skill key={index}>{skill}</Skill>
          ))}
        </Skills>
      </LeftSection>

      {/* Right Section */}
      <RightSection>
        <SectionTitle>Basic Information</SectionTitle>
        <InfoContainer>
          <InfoItem>
            <strong>Age:</strong> {profile.age} years
          </InfoItem>
          <InfoItem>
            <strong>Experience:</strong> {profile.experience} years
          </InfoItem>
          <InfoItem>
            <strong>Location:</strong> {profile.location}
          </InfoItem>
          <InfoItem>
            <strong>Phone:</strong> {profile.phone}
          </InfoItem>
          <InfoItem>
            <strong>Email:</strong> {profile.email}
          </InfoItem>
        </InfoContainer>

        <SectionTitle>Experience</SectionTitle>
        {profile.experiences?.map((exp) => (
          <ExperienceContainer key={exp._id}>
            <p>
              <strong>Company:</strong> {exp.company}
            </p>
            <p>
              <strong>Role:</strong> {exp.role}
            </p>
            <p>
              <strong>Duration:</strong> {exp.duration}
            </p>
          </ExperienceContainer>
        ))}

        <SectionTitle>Education</SectionTitle>
        <ExperienceContainer>
          <p>
            <strong>Degree:</strong> {profile.degree}
          </p>
          <p>
            <strong>University:</strong> {profile.university}
          </p>
          <p>
            <strong>Year:</strong> {profile.year}
          </p>
        </ExperienceContainer>
      </RightSection>
    </ProfileContainer>
  );
};

export default AdminUserProfile;
