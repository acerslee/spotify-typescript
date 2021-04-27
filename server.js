const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 4000;

app.get('/music', (req, res) => {
  console.log('hello it`s  me');
  res.send('bye');
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})