import React, { useState, useEffect } from 'react';
import MusicList from './MusicList';
import SearchBar from './SearchBar';
import MusicPlayer from './MusicPlayer';
import Lyrics from './Lyrics';
import Profile from './Profile';
import Sidebar from './Sidebar';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';
import styled from 'styled-components';

interface Props {
  code: string
}

const HomepageContainer = styled.div`
  margin: 0 auto 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SearchAndProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID
})

export interface UserInfo{
  username: string,
  email: string,
  image: string,
  product: string
}

const Homepage: React.FC<Props> = ({code}) => {

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any>([]);
  const [songUri, setSongUri] = useState<string>('');
  const [songArtist, setSongArtist] = useState<string>('');
  const [songTitle, setSongTitle] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: '',
    email: '',
    image: '',
    product: ''
  });

  /* states to track which sidebar items is clicked */
  const [showList, setShowList] = useState<boolean>(true);
  const [showLyrics, setShowLyrics] = useState<boolean>(false);

  const useAuth = (code: string) => {

    const [accessToken, setAccessToken] = useState<string>('');
    const [refreshToken, setRefreshToken] = useState<string>('');
    const [expiresIn, setExpiresIn] = useState<number>(0);

    useEffect(() => {
      axios.post('http://localhost:4000/login', {
        code
      })
        .then(res => {
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          setExpiresIn(res.data.expiresIn);
          setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            username: res.data.name,
            email: res.data.email,
            image: res.data.image,
            product: res.data.product
          }));
          (window as any).history.pushState({}, null, '/home');
        })
        .catch(() => {
          (window as any).location = '/'
        })
    },[code])

    useEffect(() =>{
      if (!refreshToken || !expiresIn) return;

      const intervalCall = setInterval(() => {
        axios.post('http://localhost:4000/refresh', {
          refreshToken
        })
          .then(res => {
            setAccessToken(res.data.accessToken);
            setExpiresIn(res.data.expiresIn);
          })
          .catch(() => {
            (window as any).location = '/'
          })
      }, (expiresIn - 60) * 1000)

      return () => clearInterval(intervalCall);
    },[refreshToken, expiresIn])

    return accessToken;
  };

  const token = useAuth(code);

  useEffect(() => {
    if(!(token as any)) return
    spotifyApi.setAccessToken(token as any);
  }, [token])

  useEffect(() => {
    if(!searchTerm) return setSearchResults([]);
    if(!(token as any)) return;

    let cancel = false;

    spotifyApi.searchTracks(searchTerm)
      .then(res => {
        if (cancel) return
        setSearchResults(res?.body?.tracks?.items)
      })
      .catch(err => console.error(err))

    return () => {
      (cancel = true)
    };
  }, [searchTerm, token])

  /*helper state-data functions to be passed down to child components*/
  const retrieveSongData = (uri: string, artist: string, title: string) => {
    setSongUri(uri);
    setSongArtist(artist);
    setSongTitle(title);
  };

  const changeSearchState = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  const renderSidebarItem = (item: string) => {
    setShowList(!showList);
    setShowLyrics(!showLyrics);
  };

  return(
    <HomepageContainer>
      <SearchAndProfileContainer>
        <SearchBar changeSearchState = {changeSearchState}/>
        <Profile userInfo = {userInfo} />
      </SearchAndProfileContainer>
      {showList &&
        <MusicList
          searchResults = {searchResults}
          retrieveSongData = {retrieveSongData}
        />
      }
      {showLyrics &&
        <Lyrics
          artist = {songArtist}
          title = {songTitle}
        />
      }
      <Sidebar renderSidebarItem = {renderSidebarItem} />
      <MusicPlayer
        token = {token}
        songUri = {songUri}
      />
    </HomepageContainer>
  )
};

export default Homepage;