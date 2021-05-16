import React from 'react';
import MusicDetail from './MusicDetail';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

interface Column {
  id: 'index' | 'title' | 'artist' | 'album' | 'duration';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'index', label: '#'},
  { id: 'title', label: 'Title', minWidth: 100 },
  { id: 'artist', label: 'Artist'},
  { id: 'album', label: 'Album'},
  { id: 'duration', label: 'Duration'}
];

interface Props {
  searchResults: (string | number)[],
  retrieveSongData: Function
}

const MusicListContainer = styled.div`
  height: 100vh;
  overflow-y: scroll;
  overflow-style: none;
`;

const ListHeading = styled.h1`
  color: white;
  font-family: Arial;
  margin: 0.5rem 0.5rem;
`;

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const MusicList: React.FC<Props> = ({ searchResults, retrieveSongData}) => {

  const classes = useStyles();

  const dropdownSongData = (uri: string, artist: string, title: string) => {
    console.log(uri, artist, title);
    // retrieveSongData(uri, artist, title)
  };

  return(
    <MusicListContainer>
      {searchResults.length !== 0 &&
        <ListHeading>
          Search Results
        </ListHeading>
      }
      <TableContainer className = {classes.container}>
        <Table stickyHeader  aria-label = 'sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key = {index}
                  style = {{minWidth: column.minWidth}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults.map((song: any, index: number) => {
              return(
                <TableRow key = {index} onClick = {() => dropdownSongData(song.uri, song.name,song.artists[0].name)}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{song.name}</TableCell>
                  <TableCell>{song.artists[0].name}</TableCell>
                  <TableCell>{song.album.name}</TableCell>
                  <TableCell>{song.duration_ms}</TableCell>
                </TableRow>
              )
              // <MusicDetail
              //   key = {song.uri}
              //   albumImages = {song.album.images}
              //   albumName = {song.album.name}
              //   artist = {song.artists[0].name}
              //   title = {song.name}
              //   uri = {song.uri}
              //   duration = {song.duration_ms}
              //   dropdownSongData = {dropdownSongData}
              // />
            })}
          </TableBody>
        </Table>

      </TableContainer>
    </MusicListContainer>
  )
};

export default MusicList;