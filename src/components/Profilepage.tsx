import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import styled from 'styled-components';

type UserInfo = {
  username: string,
  email: string,
  image: string,
  product: string
}

interface Props{
  userInfo: UserInfo,
  accessToken: string
}

const ProfilePageContainer = styled.div`
  color: white;
`;

const FollowedArtistsContainer = styled.div`

`;

const FollowedArtistCard = styled.div`

`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID
});

const Profilepage: React.FC<Props> = ({userInfo,  accessToken }) => {

  const [followedArtists, setFollowedArtists] = useState<any>([]);

  useEffect(() => {
    if(!userInfo) return;

    spotifyApi.setAccessToken(accessToken)

    //**figure out the client scope issue here**
    spotifyApi.getFollowedArtists()
      .then(artists => {
        console.log(artists.body.artists.items)
        setFollowedArtists(artists.body.artists.items);
      })
      .catch(err => console.error(err))
  },[userInfo, accessToken])


  return(
    <ProfilePageContainer>
      <img
        src = {userInfo.image}
        alt = 'profile'
        style = {{
          borderRadius: '20em'
        }}
      />
      <h1>{userInfo.username}</h1>
      <FollowedArtistsContainer>
        {followedArtists.map((artist: any) => {
          return(
            <FollowedArtistCard key = {artist.id}>
              <img src = {artist.images[2].url} alt = 'followed-artist' />
              <p>{artist.name}</p>
              <p>{artist.followers.total} FOLLOWERS</p>
            </FollowedArtistCard>
          )
        })}
      </FollowedArtistsContainer>
    </ProfilePageContainer>
  )
};

export default Profilepage;