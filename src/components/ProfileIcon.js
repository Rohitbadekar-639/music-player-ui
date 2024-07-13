import React from 'react';
import styled from 'styled-components';

const ProfileIconContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 12rem;

  @media (max-width: 1280px) {
    left: 1.5rem;
  }

  @media (max-width: 768px) {
    left: 1.5rem;
  }

  @media (max-width: 480px) {
    left: 0.25rem;
    bottom: 5px;
  }
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;

  @media (max-width: 1280px) {
    width: 28px;
    height: 28px;
  }

  @media (max-width: 768px) {
    width: 26px;
    height: 26px;
  }

  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
  }
`;

const ProfileIcon = () => {
  return (
    <ProfileIconContainer>
      <Avatar src="/images/profile.jpg" alt="Profile" />
    </ProfileIconContainer>
  );
};

export default ProfileIcon;
