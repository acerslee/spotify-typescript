import React, { useState, useEffect } from 'react';

interface Props{
  albumImages: any,
  albumName: string,
  artist: string,
  songName: string,
  uri: string
}

const MusicDetail: React.FC<Props> = ({ albumImages, albumName, artist, songName, uri}) => {

  let renderSmallestImage = albumImages.reduce((smallest: {height: number}, image: {height: number}) => {
    if (image.height < smallest.height) return image
    return smallest;
  })
  // const [smallestImage, setSmallestImage] = useState('');

  // useEffect(() => {
  //   let smallest = albumImages[0];
  //   if (smallest.height < )

  // },[albumImages])

  console.log('albumimage', renderSmallestImage)

  return(
    <div className = 'song'>
      <img src = {renderSmallestImage.url} alt = 'Album cover' />
      <p>{albumName}</p>
      <p>{artist}</p>
      <p>{songName}</p>
    </div>
  )
};

export default MusicDetail;