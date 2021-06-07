import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import axios from 'axios';

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

const Profilepage: React.FC<Props> = ({userInfo,  accessToken }) => {
  const [followedArtists, setFollowedArtists] = useState<any>([]);

  useEffect(() => {
    if(!userInfo) return;

    const url =
    process.env.NODE_ENV !== 'production'
    ? 'http://localhost:4000'
    : 'https://spotify-typescript.herokuapp.com'

    axios.post(`${url}/profile-artists`, {accessToken})
    .then(res => {
      setFollowedArtists(res.data.body.artists.items)
    })
    .catch(err => console.error(err))
  },[userInfo, accessToken])

  let visibleSlideCount = 6;
  if(window.screen.width < 1200) visibleSlideCount = 5;
  else if(window.screen.width < 1000) visibleSlideCount = 4;
  else if(window.screen.width < 700) visibleSlideCount = 2;

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
        <p>{followedArtists.length} Artists Following</p>
      </ProfileContainer>
      <h1>Artists You Follow</h1>
        <CarouselProvider
          naturalSlideHeight = {150}
          naturalSlideWidth = {125}
          totalSlides = {followedArtists.length}
          visibleSlides = {visibleSlideCount}
        >
          <Slider>
            {followedArtists.map((artist: any) => (
              <Slide key = {artist.id} index = {0} style = {{listStyle: 'none'}}>
                <img
                  src = {artist.images[2].url}
                  alt = 'followed-artist'
                  style = {{
                    borderRadius: '20em',
                    height: '12em',
                    width: '12em'
                  }}
                />
                <p>{artist.name}</p>
                <p>{artist.followers.total} Followers</p>
              </Slide>
              ))}
          </Slider>
        </CarouselProvider>
    </ProfilePageContainer>
  )
};

export default Profilepage;
