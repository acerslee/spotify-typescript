import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MusicPlayer from './components/MusicPlayer';
import axios from 'axios';

const App: React.FC = () => {

  const getMusic = () => {
    console.log('does it reach')
    axios.get('/music')
    .then(res => console.log(res))
    .catch(err => console.error(err))
  }

  return (
    <>
      <SearchBar getMusic = {getMusic}/>
      <MusicPlayer />
    </>
  );
}

export default App;