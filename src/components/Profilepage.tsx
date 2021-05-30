import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import styled from 'styled-components';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

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

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
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
      <ProfileContainer>
        <img
          src = {userInfo.image}
          alt = 'profile'
          style = {{
            borderRadius: '20em',
            height: '10em',
            width: '10em'
          }}
        />
        <h1>{userInfo.username}</h1>
      </ProfileContainer>
      <h1>Artists You Follow</h1>
        <CarouselProvider
          naturalSlideHeight = {150}
          naturalSlideWidth = {125}
          totalSlides = {followedArtists.length}
          visibleSlides = {6}
        >
          <Slider>
            {followedArtists.map((artist: any) => {
              return(
                <Slide key = {artist.id} index = {0} style = {{listStyle: 'none'}}>
                  <img src = {artist.images[2].url} alt = 'followed-artist' />
                  <p>{artist.name}</p>
                  <p>{artist.followers.total} FOLLOWERS</p>
                </Slide>
              )
            })}
          </Slider>
        </CarouselProvider>
    </ProfilePageContainer>
  )
};

export default Profilepage;