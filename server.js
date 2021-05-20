const express = require('express');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const lyricsFinder = require('lyrics-finder');

require('dotenv').config();

const app = express();

const port = 4000;

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/login', (req, res) => {
  const code = req.body.code;

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    redirectUri: process.env.REACT_APP_REDIRECT_URI
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
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})