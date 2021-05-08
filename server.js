const express = require('express');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');

require('dotenv').config();

const app = express();

const port = 4000;

app.use(cors())
app.use(bodyParser.json())

app.post('/login', (req, res) => {
  const code = req.body.code;

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    redirectUri: process.env.REACT_APP_REDIRECT_URI
  })

  spotifyApi.authorizationCodeGrant(code)
    .then(data => {
      console.log('The token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
      console.log('The refresh token is ' + data.body['refresh_token']);
      res.status(201).json({
        expiresIn: data.body['expires_in'],
        accessToken: data.body['access_token'],
        refreshToken: data.body['refresh_token']
      })
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})