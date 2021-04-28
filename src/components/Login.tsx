import React, { useState } from 'react';

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
      <form className = 'login-form' onSubmit = {handleSubmit}>
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
      </form>
    </div>
  )
}

export default Login;