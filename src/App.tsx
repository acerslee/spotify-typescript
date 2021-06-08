import Login from './components/Login';
import Homepage from './components/Homepage';

const code = new URLSearchParams(window.location.search).get('code');

const url = process.env.NODE_ENV !== 'production' ? 'http://localhost:4000':'https://spotify-typescript.herokuapp.com'

const App  = () => {

  return (
    code
    ? <Homepage
        code = {code}
        url = {url}
      />
    : <Login url = {url} />
  );
}

export default App;
