import React from 'react';
import styled from 'styled-components';

interface Props{
  albumImages: any,
  albumName: string,
  artist: string,
  title: string,
  uri: string,
  duration: number, //coming in as ms
  dropdownSongData: Function
}

const SongContainer = styled.div`
  border: 1.2px solid;
  display: flex;
  flex-direction: row;
  height: 10vh;
`

const DetailContainer = styled.div`
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SongText = styled.p`
  color: white;
  font-family: Arial;
  font-size: 1.25rem;
`

const MusicDetail: React.FC<Props> = ({ albumImages, albumName, artist, title, uri, dropdownSongData}) => {

  let renderSmallestImage = albumImages.reduce((smallest: {height: number}, image: {height: number}) => {
    if (image.height < smallest.height) return image
    return smallest;
  })

  return(
    <SongContainer onClick = {() => dropdownSongData(uri, artist, title)}>
      <img src = {renderSmallestImage.url} alt = 'Album cover' />
      <DetailContainer>
        <SongText>{title}</SongText>
        <SongText>{artist}</SongText>
        <SongText>{albumName}</SongText>
      </DetailContainer>
    </SongContainer>
  )
};

export default MusicDetail;