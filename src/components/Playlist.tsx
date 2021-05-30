import React from 'react';
import styled from 'styled-components';

interface Props {
  name: string,
  image: {url: string}[],
  tracks: {total: number}
}

const PlaylistItem = styled.div`
  margin-bottom: 1em;
`;

const Playlist: React.FC<Props> = ({ name, image, tracks }) => {
  return(
    <PlaylistItem>
      <img src = {image[1].url} alt = 'playlist-cover'/>
      <p>{name}</p>
      <p>{tracks.total} Tracks</p>
    </PlaylistItem>
  )
};

export default Playlist