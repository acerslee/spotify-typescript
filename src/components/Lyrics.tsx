import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const LyricsContainer = styled.div`
  white-space: pre;
  color: #FFFFFC;
  height: 50vh;
  overflow-y: scroll;
  overflow-style: none;
  width: 50%;
`;

const LyricsText = styled.p`
  margin-top: 0.5rem;
  text-align: center;
  font-size: 1.3rem;
  font-family: Arial;
`;

interface Props{
  artist: string
  title: string,
}

const Lyrics: React.FC<Props> = ({ artist, title }) => {
  const [lyrics, setLyrics] = useState<string>('');

  useEffect(() => {
    if (artist === '' || title === '') return;
    axios.get(`http://localhost:4000/lyrics/${artist}/${title}`)
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