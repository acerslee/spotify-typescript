import React, { useEffect } from 'react';
import MusicList from './MusicList';
import SearchBar from './SearchBar';
import MusicPlayer from './MusicPlayer';
import axios from 'axios';

interface Props {
  code: string
}


const useAuth = (code: string) => {
  // const [accessToken, setAccessToken] = useState<string>('');
  // const [refreshToken, setRefreshToken] = useState<string>('');
  // const [expiresIn, setExpiresIn] = useState<string>('');

  useEffect(() => {
    axios.post('http://localhost:4000/login', {
      code
    })
      .then(res => console.log(res.data))
      .catch((err) => {
        // (window as any).location = '/'
        console.log(err);
      })
  },[code])
}

const Homepage: React.FC<Props> = ({code}) => {

  const accessToken = useAuth(code);

  return(
    <div className = 'homepage'>
      <SearchBar />
      <MusicPlayer />
      <MusicList />
    </div>
  )
};

export default Homepage;