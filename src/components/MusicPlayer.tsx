import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

interface Props{
  token: string
  songUri: string
}

const MusicPlayer: React.FC<Props> = ({token, songUri}) => {
  console.log(token);
  return(
    <div className = 'music-player'>
      <SpotifyPlayer token = {token} uris = {songUri} />
    </div>
  )
}

export default MusicPlayer;