import React from 'react';
import MusicDetail from './MusicDetail';
import styled from 'styled-components';

interface Props {
  searchResults: (string | number)[],
  retrieveSongData: Function
}

const MusicListContainer = styled.div`
  height: 100vh;
  overflow-y: scroll;
  overflow-style: none;
`;

const ListHeading = styled.h1`
  color: white;
  font-family: Arial;
  margin: 0.5rem 0.5rem;
`;

const MusicList: React.FC<Props> = ({ searchResults, retrieveSongData}) => {

  const dropdownSongData = (uri: string, artist: string, title: string) => {
    retrieveSongData(uri, artist, title)
  };

  return(
    <MusicListContainer>
      {searchResults.length !== 0 &&
        <ListHeading>
          Search Results
        </ListHeading>
      }
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