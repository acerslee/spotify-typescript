import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const LyricsContainer = styled.div`
  white-space: pre;
  color: #FFFFFC;
  height: 85vh;
  overflow-y: scroll;
  overflow-style: none;
`;

const LyricsText = styled.p`
  margin-top: 0.5rem;
  text-align: center;
  font-size: 1.3rem;
`;

interface Props{
  artist: string
  title: string,
}

const Lyrics: React.FC<Props> = ({ artist, title }) => {
  const [lyrics, setLyrics] = useState<string>('');

  useEffect(() => {
    const url =
      process.env.NODE_ENV !== 'production'
      ? 'http://localhost:4000'
      : 'https://spotify-typescript.herokuapp.com'

    if (artist === '' || title === '') return;
    axios.get(`${url}/lyrics/${artist}/${title}`)
      .then(res => setLyrics(res.data))
      .catch(err => console.error(err))

  },[artist, title]);

  return(
    <LyricsContainer>
      <LyricsText>{lyrics}</LyricsText>
    </LyricsContainer>
  )
};

export default Lyrics;