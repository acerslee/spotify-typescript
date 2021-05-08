import React from 'react';
import { Container, Button } from '@material-ui/core/';

const AUTH_URL =
  `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`


const Login: React.FC = () => {

  return(
    <Container
      style = {{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Button
        variant = 'contained'
        style = {{
          backgroundColor: '#43E23E'
        }}
      >
        <a
          href = {AUTH_URL}
          style = {{
            color: 'white',
            textDecoration: 'none'
          }}
        >
          Login spotify
        </a>
      </Button>
    </Container>
  )
}

export default Login;