import React from 'react';
import MusicDetail from './MusicDetail';

interface Props {
  searchResults: (string | number)[],
  retrieveSongUri: Function
}

const MusicList: React.FC<Props> = ({ searchResults, retrieveSongUri}) => {

  const dropdownSongUri = (uri: string) => {
    retrieveSongUri(uri)
  };

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
          dropdownSongUri = {dropdownSongUri}
        />
      ))}
    </div>
  )
};

export default MusicList;