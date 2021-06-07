const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const lyricsFinder = require('lyrics-finder');

const app = express();

let REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || 'http://localhost:3000';
// let FRONTEND_URI = process.env.REACT_APP_FRONTEND_URI || 'http://localhost:3000';
const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  REDIRECT_URI = 'http://localhost:3000';
  // FRONTEND_URI = 'http://localhost:3000';
}

app.use(express.static(path.resolve(__dirname, '../build')));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/login', (req, res) => {
  const scopes = [
    'streaming',
    'user-read-recently-played',
    'user-read-playback-state',
    'user-top-read',
    'user-modify-playback-state',
    'user-follow-read',
    'user-library-read',
    'user-library-modify',
    'user-read-email',
    'user-read-private'
  ];

  res.redirect(
    `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${scopes.join('%20')}`
  )
})

app.post('/auth', (req, res) => {
  const code = req.body.code;

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    redirectUri: REDIRECT_URI
  })

  //object to store all returned data from the api calls below
  const userJSON = {};

  spotifyApi.authorizationCodeGrant(code)
    .then(data => {
      userJSON['expiresIn'] = data.body['expires_in']
      userJSON['accessToken'] = data.body['access_token']
      userJSON['refreshToken'] = data.body['refresh_token']

      //retrieve the current user's info
      spotifyApi.setAccessToken(data.body['access_token']);
      return spotifyApi.getMe();
    })
    .then(data => {
      userJSON['userId'] = data.body['id'];
      userJSON['name'] = data.body['display_name'];
      userJSON['email'] = data.body['email'];

      const image = data.body.images[0].url;
      userJSON['image'] = image;
      userJSON['product'] = data.body['product'];

      res.status(201).send(userJSON);
    })
    .catch(err => {
      res.status(500).send(err);
    })
})

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    redirectUri: REDIRECT_URI,
    refreshToken
  })

  spotifyApi.refreshAccessToken()
    .then(data => {
      console.log('The access token has been refreshed!');
      res.status(201).json({
        accessToken: data.body.access_token,
        expires_in: data.body.expires_in
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
})

app.get('/lyrics/:artist/:title', async (req, res) => {
  try {
    const lyrics = await lyricsFinder(req.params.artist, req.params.title) ||
    'No Lyrics Found';
    res.send(lyrics);
  } catch (err) {
    res.status(500).send(err);
  }
})

app.post('/tracks', async (req, res) => {
  try{
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.REACT_APP_CLIENT_ID
    })
    spotifyApi.setAccessToken(req.body.token)

    const getTracks = await spotifyApi.searchTracks(req.body.searchTerm)
    res.status(201).send(getTracks)
  }
  catch(err) {
    res.status(500).send(err)
  }
})

app.post('/playlist', async (req, res) => {
  try{
    const {accessToken, userId} = req.body
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.REACT_APP_CLIENT_ID
    })
    spotifyApi.setAccessToken(accessToken)

    const getPlaylists = await spotifyApi.getUserPlaylists(userId)
    res.status(201).send(getPlaylists)
  }
  catch(err) {
    res.status(500).send(err)
  }
})

app.post('/profile-artists', async (req, res) => {
  try{
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.REACT_APP_CLIENT_ID
    })
    spotifyApi.setAccessToken(req.body.accessToken)

    const getArtists = await spotifyApi.getFollowedArtists()
    res.status(201).send(getArtists)
  }
  catch(err) {
    res.status(500).send(err)
  }
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})