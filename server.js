const express = require('express');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');

const app = express();

const port = 4000;

// const headers = {
//   'Content-Type': 'application/x-www-form-urlencoded',
//   'Authorization': 'Basic' + process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET
// }

app.post('/login', (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
  })


  spotifyApi.authorizationCodeGrant(code)
    .then(data => {
      console.log('The token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
      console.log('The refresh token is ' + data.body['refresh_token']);
      res.json({
        expiresIn: data.body['expires_in'],
        accessToken: data.body['access_token'],
        refreshToken: data.body['refresh_token']
      })
    })
    .catch(err => {
      console.log('Something went wrong!', err)
    })
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})