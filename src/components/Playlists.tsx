import React, { useState, useEffect } from 'react';
import Playlist from './Playlist';
import styled from 'styled-components';
import axios from 'axios';

type UserInfo = {
  userId: string,
  username: string
}

interface Props{
  userInfo: UserInfo,
  accessToken: string,
  url: string
}

const PlaylistContainer = styled.div`
  color: white;
  display: grid;
  grid-template-columns: auto auto auto auto;
  overflow: scroll;
  height: 83vh;
  @media(max-width: 1500px){
    grid-template-columns: auto auto auto;
  }
  @media(max-width: 1150px){
    grid-template-columns: auto auto;
  }
`;

const PlaylistHeader = styled.h1`
  color: white;
  margin: 0.5em 0;
`;

const Playlists: React.FC<Props> = ({ userInfo, accessToken, url }) => {
  const [userPlaylists, setUserPlaylists] = useState<any>([])

  useEffect(() => {
    if(!userInfo) return setUserPlaylists([]);

    let userId = userInfo.userId;
    let playlistReqBody = {accessToken, userId}

    axios.post(`${url}/playlist`,
      playlistReqBody
    )
    .then(res => {
      setUserPlaylists(res.data.body.items)
    })
    .catch(err => console.error(err))
  },[userInfo, accessToken, url])

  return(
    <>
    <PlaylistHeader>My Playlists</PlaylistHeader>
    {userPlaylists &&
      <PlaylistContainer>
        {userPlaylists.map((playlist: any, index: number) => (
          <Playlist
            key = {index}
            name = {playlist.name}
            image = {playlist.images}
            tracks = {playlist.tracks}
          />
        ))}
      </PlaylistContainer>
    }
    </>
  )
};

export default Playlists;
