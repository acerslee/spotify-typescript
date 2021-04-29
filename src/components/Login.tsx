import React, { useState } from 'react';


const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=fc8a244bbf8a42e6931a053e3d03276b&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


const Login: React.FC = () => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUsername = (event: React.FormEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };

  const handlePassword = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  };

  return(
    <div className = 'login-page'>
      <h1>Login here</h1>
      <a href = {AUTH_URL}>
        Login spotify
      </a>
      {/* <form className = 'login-form' onSubmit = {handleSubmit}>
        <input
          type = 'text'
          value = {username}
          onChange = {handleUsername}
        />
        <input
          type = 'text'
          value = {password}
          onChange = {handlePassword}
        />
        <input
          type = 'submit'
          value = 'Submit'
        />
      </form> */}
    </div>
  )
}

export default Login;