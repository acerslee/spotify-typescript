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

const ProfilePicture = styled.img`
  height: 70px;
  width: 70px;
`;

const Username = styled.p`
  color: white;
`;

const ProfileStatus = styled.p`
  color: white;
`;

const Profile: React.FC<Props> = ({ userInfo }) => {

  return(
    <>
    {userInfo.email !== '' &&
      <div className = 'profile-container'>
        <ProfileStatus>{userInfo.product.toUpperCase()}</ProfileStatus>
        <ProfilePicture src = {userInfo.image} alt = 'profile-pic' />
        <Username>{userInfo.username}</Username>
      </div>
    }
    </>
  )
};

export default Profile;