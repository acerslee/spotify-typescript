import React from 'react';
import Login from './components/Login';
import SearchBar from './components/SearchBar';
import MusicPlayer from './components/MusicPlayer';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App: React.FC = () => {

  const getMusic = () => {
    console.log('does it reach')
    axios.get('/music')
    .then(res => console.log(res))
    .catch(err => console.error(err))
  }

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path = '/'>
            <Login />
          </Route>
          <Route path = '/home'>
            <SearchBar getMusic = {getMusic}/>
            <MusicPlayer />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;