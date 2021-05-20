import React, { useState, useEffect } from 'react';
import Playlist from './Playlist';
import styled from 'styled-components';
import SpotifyWebApi from 'spotify-web-api-node';

type UserInfo = {
  userId: string,
  username: string
}

interface Props{
  userInfo: UserInfo,
  accessToken: string
}

const PlaylistHeader = styled.h1`
  font-family: Arial
`

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID
});

const Playlists: React.FC<Props> = ({ userInfo, accessToken }) => {
  const [userPlaylists, setUserPlaylists] = useState<any>([])

  useEffect(() => {
    if(!userInfo) return setUserPlaylists([]);

    spotifyApi.setAccessToken(accessToken)

    spotifyApi.getUserPlaylists(userInfo.userId)
      .then(res => {
        console.log(res.body.items);
        setUserPlaylists(res.body.items)
      })
      .catch(err => console.error(err))
  },[userInfo, accessToken])

  return(
    <>
    {userPlaylists &&
      <div style = {{color: 'white'}}>
        <PlaylistHeader>My Playlists</PlaylistHeader>
        {userPlaylists.map((playlist: any, index: number) => (
          <Playlist
            key = {index}
            name = {playlist.name}
            image = {playlist.images}
            tracks = {playlist.tracks}
          />
        ))}
      </div>
    }
    </>
  )
};

export default Playlists;