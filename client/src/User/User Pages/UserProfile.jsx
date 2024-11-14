import React from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 50px auto;
  padding: 20px;
  background: black;
  color: yellow;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const LeftSection = styled.div`
  width: 35%;
  text-align: center;
  padding: 20px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const UserName = styled.h2`
  color: #ffd700;
  font-size: 24px;
  margin-bottom: 10px;
`;

const JobTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
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
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
`;

const RightSection = styled.div`
  width: 65%;
  padding: 20px;
`;

const SectionTitle = styled.h3`
  color: yellow;
  font-size: 18px;
  border-bottom: 2px solid #ffd700;
  padding-bottom: 5px;
  margin-bottom: 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const InfoItem = styled.div`
  font-size: 14px;
  color: yellow;
`;

const Button = styled.button`
  background: #ffd700;
  color: black;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  margin: 10px 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #333;
    color: yellow;
  }
`;

const ExperienceContainer = styled.div`
  background: #222;
  padding: 10px;
  border-radius: 10px;
  margin: 10px 0;
  color: yellow;
`;

const UserProfile = () => {
  return (
    <ProfileContainer>
      {/* Left Section */}
      <LeftSection>
        <ProfileImage src="https://via.placeholder.com/120" alt="Profile" />
        <UserName>John Doe</UserName>
        <JobTitle>UX/UI Designer</JobTitle>
        <p>
          Full stack designer with hands-on experience solving problems for clients. Specializing in creating user-centered designs.
        </p>
        <SectionTitle>Skills</SectionTitle>
        <Skills>
          <Skill>UI Design</Skill>
          <Skill>UX</Skill>
          <Skill>Adobe XD</Skill>
          <Skill>Mobile Apps</Skill>
          <Skill>Wireframing</Skill>
        </Skills>
        <Button>Add Note</Button>
      </LeftSection>

      {/* Right Section */}
      <RightSection>
        <SectionTitle>Basic Information</SectionTitle>
        <InfoContainer>
          <InfoItem><strong>Age:</strong> 28 years</InfoItem>
          <InfoItem><strong>Experience:</strong> 6 years</InfoItem>
          <InfoItem><strong>Location:</strong> New York, USA</InfoItem>
          <InfoItem><strong>Phone:</strong> +1 123 456 7890</InfoItem>
          <InfoItem><strong>Email:</strong> johndoe@example.com</InfoItem>
        </InfoContainer>
        <Button>Download Resume</Button>
        <Button>Send Email</Button>

        <SectionTitle>Experience</SectionTitle>
        <ExperienceContainer>
          <p><strong>Company:</strong> Tech Corp</p>
          <p><strong>Role:</strong> Product & UX Designer</p>
          <p><strong>Duration:</strong> Jan 2020 - Present</p>
        </ExperienceContainer>
        <ExperienceContainer>
          <p><strong>Company:</strong> Pixel Studio</p>
          <p><strong>Role:</strong> UI/UX Designer</p>
          <p><strong>Duration:</strong> Aug 2018 - Dec 2019</p>
        </ExperienceContainer>
        <ExperienceContainer>
          <p><strong>Company:</strong> Creative Labs</p>
          <p><strong>Role:</strong> Web Designer</p>
          <p><strong>Duration:</strong> Feb 2016 - Jul 2018</p>
        </ExperienceContainer>

        <SectionTitle>Education</SectionTitle>
        <ExperienceContainer>
          <p><strong>Degree:</strong> Bachelor of Design</p>
          <p><strong>University:</strong> Design University</p>
          <p><strong>Year:</strong> 2012 - 2016</p>
        </ExperienceContainer>

        <SectionTitle>Certifications</SectionTitle>
        <ExperienceContainer>
          <p><strong>Certificate:</strong> UX Design Professional</p>
          <p><strong>Institution:</strong> UX Academy</p>
          <p><strong>Year:</strong> 2021</p>
        </ExperienceContainer>
      </RightSection>
    </ProfileContainer>
  );
};

export default UserProfile;
