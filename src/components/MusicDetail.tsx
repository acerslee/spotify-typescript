import React from 'react';
import styled from 'styled-components';

interface Props{
  albumImages: any,
  albumName: string,
  artist: string,
  songName: string,
  uri: string,
  dropdownSongUri: Function
}

const SongContainer = styled.div`
  border: 2px solid;
`

const MusicDetail: React.FC<Props> = ({ albumImages, albumName, artist, songName, uri, dropdownSongUri}) => {

  let renderSmallestImage = albumImages.reduce((smallest: {height: number}, image: {height: number}) => {
    if (image.height < smallest.height) return image
    return smallest;
  })

  return(
    <SongContainer onClick = {() => dropdownSongUri(uri)}>
      <img src = {renderSmallestImage.url} alt = 'Album cover' />
      <p>{albumName}</p>
      <p>{artist}</p>
      <p>{songName}</p>
    </SongContainer>
  )
};

export default MusicDetail;