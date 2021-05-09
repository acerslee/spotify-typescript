import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

interface Props{
  token: string
  songUri: string
}

const MusicPlayer: React.FC<Props> = ({token, songUri}) => {

  const [play, setPlay] = useState<boolean>(false);

  useEffect(() => {
    setPlay(true);
  },[songUri])

  return(
    <div>
      {token &&
        <SpotifyPlayer
          token = {token}
          uris = {songUri}
          initialVolume = {0.5}
          callback = {state => {
            if (!state.isPlaying) setPlay(false)
          }}
          play = {play}
          showSaveIcon
          magnifySliderOnHover
          persistDeviceSelection
          styles = {{
            // activeColor: '#fff',
            // color: '#fff',
            // bgColor: '#333',
            sliderColor: '#1cb954'
          }}
        />
      }
    </div>
  )
}

export default MusicPlayer;