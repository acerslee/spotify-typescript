import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';

type UserInfo = {
  userId: string,
  username: string
}

interface Props{
  userInfo: UserInfo,
  accessToken: string
}

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID
});



const Playlists: React.FC<Props> = ({ userInfo, accessToken }) => {

  // console.log(userInfo);

  const [userPlaylists, setUserPlaylists] = useState<any>(null)

    // useEffect(() => {
    //   if(!(accessToken as any)) return
    //   spotifyApi.setAccessToken(accessToken);
    // }, [accessToken])

    useEffect(() => {
    if(!userInfo) return setUserPlaylists([]);
    // if(!(token as any)) return;

    spotifyApi.setAccessToken(accessToken)

    spotifyApi.getUserPlaylists(userInfo.userId)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error(err))

  },[userInfo, accessToken])

  return(
    <div style = {{color: 'white'}}>placeholder
      <h1>My playlists</h1>
    </div>
  )
};

export default Playlists;