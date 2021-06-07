import React, { useState, useEffect } from 'react';
import MusicList from './MusicList';
import SearchBar from './SearchBar';
import MusicPlayer from './MusicPlayer';
import Lyrics from './Lyrics';
import Profile from './Profile';
import Sidebar from './Sidebar';
import Playlists from './Playlists';
import Profilepage from './Profilepage';
import axios from 'axios';
import styled from 'styled-components';

interface Props {
  code: string
  url: string
}

const HomepageContainer = styled.div`
  margin: 0 auto 0 auto;
  display: flex;
  flex-direction: row;

  // display: grid;
  // grid-template-areas: 1fr auto;
  // grid-template-rows: 1fr auto;
  // grid-template-areas:
  //   "sidebar main"
  //   "player player";
  // height: 100vh;
  // width: 100vw;
`;

const MainContentContainer = styled.div`
  width: 83%;
  // grid-area: main;
`;

const SearchAndProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export interface UserInfo{
  userId: string,
  username: string,
  email: string,
  image: string,
  product: string
}


const Homepage: React.FC<Props> = ({code, url}) => {

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any>([]);
  const [songUri, setSongUri] = useState<string>('');
  const [songArtist, setSongArtist] = useState<string>('');
  const [songTitle, setSongTitle] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userId: '',
    username: '',
    email: '',
    image: '',
    product: ''
  });

  /* states to track which item is to be rendered */
  const [showList, setShowList] = useState<boolean>(true);
  const [showLyrics, setShowLyrics] = useState<boolean>(false);
  const [showPlaylists, setShowPlaylists] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);

  /*authentication states */
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const [expiresIn, setExpiresIn] = useState<number>(0);

  const useAuth = (code: string) => {
    useEffect(() => {
      axios.post(`${url}/auth`, {
        code
      })
        .then(res => {
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          setExpiresIn(res.data.expiresIn);
          setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            userId: res.data.userId,
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
        axios.post(`${url}/refresh`, {
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
    },[])

    return accessToken;
  };

  const token = useAuth(code);

  //sets the search results list
  useEffect(() => {
    if(!searchTerm) return setSearchResults([]);
    if(!(token as any)) return;

    let cancel = false;

    let tracksReqBody = {token, searchTerm}

    axios.post(`${url}/tracks`, tracksReqBody)
    .then(res => {
      if (cancel) return
      setSearchResults(res?.data?.body?.tracks?.items)
    })
    .catch(err => console.error(err))

    return () => {
      (cancel = true)
    };
  }, [searchTerm, token, url])

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
    if (item === 'Songs') {
      setShowList(true);
      setShowProfile(false);
      setShowLyrics(false);
      setShowPlaylists(false);
    } else if (item === 'Lyrics'){
      setShowList(false);
      setShowProfile(false);
      setShowLyrics(true);
      setShowPlaylists(false);
    } else {
      setShowList(false);
      setShowProfile(false);
      setShowLyrics(false);
      setShowPlaylists(true);
    }
  };

  const renderProfilePage = () => {
    setShowProfile(true);
    setShowList(false);
    setShowLyrics(false);
    setShowPlaylists(false);
  };

  return(
    <HomepageContainer>
      <Sidebar renderSidebarItem = {renderSidebarItem} />
      <MainContentContainer>
        <SearchAndProfileContainer>
          <SearchBar changeSearchState = {changeSearchState}/>
          <Profile
            userInfo = {userInfo}
            renderProfilePage = {renderProfilePage}
          />
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
            url = {url}
          />
        }
        {showPlaylists &&
          <Playlists
            userInfo = {userInfo}
            accessToken = {accessToken}
            url = {url}
          />
        }
        {showProfile &&
          <Profilepage
            userInfo = {userInfo}
            accessToken = {accessToken}
            url = {url}
          />
        }
        <MusicPlayer
          token = {token}
          songUri = {songUri}
        />
      </MainContentContainer>
    </HomepageContainer>
  )
};

export default Homepage;
