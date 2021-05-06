import React, { useState, useEffect } from 'react';
import MusicList from './MusicList';
import SearchBar from './SearchBar';
import MusicPlayer from './MusicPlayer';
import axios from 'axios';

interface Props {
  code: string
}


const useAuth = (code: string) => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const [expiresIn, setExpiresIn] = useState<string>('');

  useEffect(() => {
    axios.post('http://localhost:4000/login', {
      code
    })
      .then(res => {
        console.log(res.data)
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        (window as any).history.pushState({}, null, '/home');
      })
      .catch(() => {
        (window as any).location = '/'
      })
  },[code])
}

const Homepage: React.FC<Props> = ({code}) => {

  const token = useAuth(code);

  return(
    <div className = 'homepage'>
      <SearchBar />
      <MusicPlayer />
      <MusicList />
    </div>
  )
};

export default Homepage;