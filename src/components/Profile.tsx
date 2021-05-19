import React, {useState} from 'react';
import styled from 'styled-components';
import {Button, Menu, MenuItem}  from '@material-ui/core';

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

const Username = styled(Button)`
  color: white;
  font-family: Arial;
`;

const ProfileStatus = styled.p`
  margin-right: 3em;
  font-size: 0.8em;
  color: gold;
  letter-spacing: 2px;
`;

const Profile: React.FC<Props> = ({ userInfo }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  return(
    <>
    {userInfo.email !== '' &&
      <ProfileContainer>
        <ProfileStatus>{userInfo.product.toUpperCase()}</ProfileStatus>
        <ProfilePicture src = {userInfo.image} alt = 'profile-pic' />
        <Username
          aria-controls = 'simple-menu'
          aria-haspopup = 'true'
          onClick = {handleClick}
        >
          {userInfo.username}
        </Username>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </ProfileContainer>
    }
    </>
  );
}

export default Profile;