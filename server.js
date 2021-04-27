const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'build')));

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})