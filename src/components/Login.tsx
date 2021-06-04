import { Button } from '@material-ui/core';
import logo from '../images/spotify-logo.png';
import styled from 'styled-components';

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
  background-color: #282828;
  @media(max-width: 900px) {
    width: 85%;
    height: 45vh;
  }
`;

const LoginText = styled.p`
  color: white;
  text-align: center;
  font-size: 3rem;
  @media(max-width: 900px) {
    font-size: 1.5rem;
  }
`

//&&& makes styled component styling an absolute priority
const LoginButton = styled(Button)`
  &&&{
    background-color: #43E23E;
    padding: 1rem 2rem 1rem 2rem;
    border-radius: 7%;
    margin-top: 1vh;
    &: hover {
      background-color: #18d860;
    }
  }
`;

const AUTH_URL =
  process.env.NODE_ENV !== 'production'
  ? 'http://localhost:4000/login'
  : 'https://spotify-typescript.herokuapp.com/login'

const Login  = () => {

  return(
    <LoginContainer>
      <MiniContainer>
        <img
          src = {logo}
          alt = 'logo'
          style = {{height: '8rem', width: '8rem'}}
        />
        <LoginText>Explore Your Music Here!</LoginText>
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
};

export default Login;