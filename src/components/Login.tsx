import React from 'react';
import { Button } from '@material-ui/core';
import logo from '../images/spotify-logo.png';
import styled from 'styled-components';

//returns 20 of declared information
const AUTH_URL =
  `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`


const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #333333
`;

//&&& makes styled component styling an absolute priority
const LoginButton = styled(Button)`
  &&&{
    background-color: #43E23E;
    padding: 1rem 2rem 1rem 2rem;
    border-radius: 7%;
    margin-top: 1vh;
    &: hover {
      background-color: #43E2CC;
    }
  }
`;

const Login: React.FC = () => {

  return(
    <LoginContainer>
      <img
        src = {logo}
        alt = 'logo'
        style = {{height: '5rem', width: '5rem'}}
      />
      <LoginButton variant = 'contained'>
        <a
          href = {AUTH_URL}
          style = {{color: 'white', textDecoration: 'none'}}
        >
          Login spotify
        </a>
      </LoginButton>
    </LoginContainer>
  )
}

export default Login;