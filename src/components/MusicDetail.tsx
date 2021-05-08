import React from 'react';

interface Props{
  albumImages: (string | number)[],
  albumName: string,
  artist: string,
  songName: string,
  uri: string
}

const MusicDetail: React.FC<Props> = ({ albumImages, albumName, artist, songName, uri}) => {
  return(
    <div className = 'song'>
      <p>{albumName}</p>
      <p>{artist}</p>
      <p>{songName}</p>
    </div>
  )
};

export default MusicDetail;