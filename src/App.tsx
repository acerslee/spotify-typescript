import React from 'react';
import Login from './components/Login';
import Homepage from './components/Homepage';

const code = new URLSearchParams(window.location.search).get('code');

const App: React.FC = () => {

  return (
    code ? <Homepage code = {code} /> : <Login />
  );
}

export default App;