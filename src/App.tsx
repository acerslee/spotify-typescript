import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  return (
    <>
      <SearchBar />
      <MusicPlayer />
    </>
  );
}