import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

interface Column {
  id: 'index' | 'title' | 'artist' | 'album' | 'duration';
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'index', label: '#'},
  { id: 'title', label: 'Title', minWidth: 100 },
  { id: 'artist', label: 'Artist', maxWidth: 100},
  { id: 'album', label: 'Album', maxWidth: 200},
  { id: 'duration', label: 'Duration', align: 'right'}
];

interface Props {
  searchResults: (string | number)[],
  retrieveSongData: Function
}

const AlbumImage = styled.img`
  height: 2em;
  width: 2em;
  margin-right: 1em;
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
    height: '80vh'
  },
  row: {
    '&:hover':{
      background: '#333333'
    },
  },
  cell: {
    color: '#cfcfcf',
    borderBottom: 'none'
  },
  cellFlexBox: {
    borderBottom: 'none',
    color: '#cfcfcf',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const MusicList: React.FC<Props> = ({ searchResults, retrieveSongData}) => {

  console.log('searched', searchResults)

  const classes = useStyles();

  const dropdownSongData = (uri: string, artist: string, title: string) => {
    retrieveSongData(uri, artist, title)
  };

  const convertTime = (millis: number) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);

    return (
      Number(seconds) === 60 ?
      (minutes + 1) + '.00' :
      minutes + ':' + (Number(seconds) < 10 ? '0' : '') + seconds
    );
  };

  const renderSmallestImage = (images: any) => {
    let returnedImage = images[0];
    for (let i = 1; i < images.length; i++) {
      if (images[i].height < returnedImage.height) returnedImage = images[i]
    }
    return returnedImage.url;
  };

  return(
    <div className = 'music-container'>
      {searchResults.length !== 0 &&
        <ListHeading>
          Search Results
        </ListHeading>
      }
      <TableContainer className = {classes.container}>
        <Table stickyHeader = {true} aria-label = 'sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key = {index}
                  className = {classes.cell}
                  style = {{
                      minWidth: column.minWidth,
                      borderBottom: 'solid 1px',
                      textTransform: 'uppercase'
                    }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults.map((song: any, index: number) => (
              <TableRow
                key = {index}
                className = {classes.row}
                onClick = {() => dropdownSongData(song.uri, song.name,song.artists[0].name)}
              >
                <TableCell className = {classes.cell}>{index + 1}</TableCell>
                <TableCell className = {classes.cellFlexBox}>
                  <AlbumImage src = {renderSmallestImage(song.album.images)} alt = 'album placeholder'/>
                  {song.name}
                </TableCell>
                <TableCell className = {classes.cell}>
                  {song.artists.map((artist: {name: string}, index: number) => (
                      index !== song.artists.length - 1
                      ? artist.name + ', '
                      : artist.name
                  ))}
                </TableCell>
                <TableCell className = {classes.cell}>{song.album.name}</TableCell>
                <TableCell className = {classes.cell}>{convertTime(song.duration_ms)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
};

export default MusicList;