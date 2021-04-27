import React from 'react';

const MusicPlayer = () => {

  const toggleMusic = (event: React.MouseEvent<HTMLButtonElement>) => {

  };

  return(
    <div className = 'music-player'>
      <h1>
        Hi
      </h1>
      <button onClick = {toggleMusic}>Play Music</button>
    </div>
  )
}

export default MusicPlayer;