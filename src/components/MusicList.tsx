import React from 'react';
import MusicDetail from './MusicDetail';
import styled from 'styled-components';

interface Props {
  searchResults: (string | number)[],
  retrieveSongData: Function
}

const MusicListContainer = styled.div`
  height: 45vh;
  overflow-y: scroll;
  overflow-style: none;
`

const MusicList: React.FC<Props> = ({ searchResults, retrieveSongData}) => {

  const dropdownSongData = (uri: string, artist: string, title: string) => {
    retrieveSongData(uri, artist, title)
  };

  return(
    <MusicListContainer>
      <h1>
        Search Results
      </h1>
      {searchResults.map((song: any) => (
        <MusicDetail
          key = {song.uri}
          albumImages = {song.album.images}
          albumName = {song.album.name}
          artist = {song.artists[0].name}
          title = {song.name}
          uri = {song.uri}
          dropdownSongData = {dropdownSongData}
        />
      ))}
    </MusicListContainer>
  )
};

export default MusicList;