import React from 'react';
import MusicDetail from './MusicDetail';

const MusicList = ({searchResults}: {searchResults: (string | number)[] }) => {

  console.log('does it reach here', searchResults);

  return(
    <div className = 'music-list' style = {{overflowY: 'auto'}}>
      <h1>
        Songs
      </h1>
      {searchResults.map((song: any) => (
        <MusicDetail
          key = {song.uri}
          albumImages = {song.album.images}
          albumName = {song.album.name}
          artist = {song.artists[0].name}
          songName = {song.name}
          uri = {song.uri}
        />
      ))}
    </div>
  )
};

export default MusicList;