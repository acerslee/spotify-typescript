import React from 'react';
import styled from 'styled-components';

interface Props{
  albumImages: any,
  albumName: string,
  artist: string,
  title: string,
  uri: string,
  dropdownSongData: Function
}

const SongContainer = styled.div`
  border: 2px solid;
`

const SongText = styled.p`
  color: #ffffcf;
`

const MusicDetail: React.FC<Props> = ({ albumImages, albumName, artist, title, uri, dropdownSongData}) => {

  let renderSmallestImage = albumImages.reduce((smallest: {height: number}, image: {height: number}) => {
    if (image.height < smallest.height) return image
    return smallest;
  })

  return(
    <SongContainer onClick = {() => dropdownSongData(uri, artist, title)}>
      <img src = {renderSmallestImage.url} alt = 'Album cover' />
      <SongText>{title}</SongText>
      <SongText>{artist}</SongText>
      <SongText>{albumName}</SongText>
    </SongContainer>
  )
};

export default MusicDetail;