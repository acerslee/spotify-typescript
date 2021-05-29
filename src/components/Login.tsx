import React from 'react';
import { Button } from '@material-ui/core';
import logo from '../images/spotify-logo.png';
import styled from 'styled-components';

//returns 20 of declared information

const scopes = [
  'streaming',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-top-read',
  'user-modify-playback-state',
  'user-follow-read',
  'user-library-read',
  'user-library-modify',
  'user-read-email',
  'user-read-private'
];

const AUTH_URL =
  `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=${scopes.join('%20')}`

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MiniContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 55vh;
  width: 30%;
  border-radius: 40px;
  background-color: #3d3d3d;
`;

const LoginText = styled.p`
  color: white;
  text-align: center;
  font-size: 3rem;
  font-family: Arial;
`

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
      <MiniContainer>
        <img
          src = {logo}
          alt = 'logo'
          style = {{height: '8rem', width: '8rem'}}
        />
        <LoginText>Explore your music here</LoginText>
        <LoginButton variant = 'contained'>
          <a
            href = {AUTH_URL}
            style = {{color: 'white', textDecoration: 'none'}}
          >
            Login spotify
          </a>
        </LoginButton>
      </MiniContainer>
    </LoginContainer>
  )
}

export default Login;