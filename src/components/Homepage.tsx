import React, { useState, useEffect } from 'react';
import MusicList from './MusicList';
import SearchBar from './SearchBar';
import MusicPlayer from './MusicPlayer';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';

interface Props {
  code: string
}

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID
})

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
}


const Homepage: React.FC<Props> = ({code}) => {

  const token = useAuth(code);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any>([]);

  const changeSearchState = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  useEffect(() => {
    if(!(token as any)) return
    spotifyApi.setAccessToken(token as any);
  }, [token])

  useEffect(() => {
    if(!searchTerm) return setSearchResults([]);
    if(!(token as any)) return;

    spotifyApi.searchTracks(searchTerm)
      .then(res => console.log(res))
      .catch(err => console.error(err))

  }, [searchTerm, token])

  return(
    <div className = 'homepage'>
      <SearchBar changeSearchState = {changeSearchState}/>
      <MusicPlayer />
      <MusicList />
    </div>
  )
};

export default Homepage;