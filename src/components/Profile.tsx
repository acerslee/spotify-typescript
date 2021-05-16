import React from 'react';
import styled from 'styled-components';

type UserInfo = {
  username: string,
  email: string,
  image: string,
  product: string
}

interface Props{
  userInfo: UserInfo
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfilePicture = styled.img`
  height: 2.5em;
  width: 2.5em;
  border-radius: 5em;
  margin-right: 0.5em;
`;

const Username = styled.p`
  color: white;
  font-family: Arial;
`;

const ProfileStatus = styled.p`
  margin-right: 3em;
  font-size: 0.8em;
  color: gold;
  letter-spacing: 2px;
`;

const Profile: React.FC<Props> = ({ userInfo }) => (
  <>
  {userInfo.email !== '' &&
    <ProfileContainer>
      <ProfileStatus>{userInfo.product.toUpperCase()}</ProfileStatus>
      <ProfilePicture src = {userInfo.image} alt = 'profile-pic' />
      <Username>{userInfo.username}</Username>
    </ProfileContainer>
  }
  </>
);

export default Profile;