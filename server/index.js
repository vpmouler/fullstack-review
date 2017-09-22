var fetch = require('isomorphic-fetch');
const express = require('express');
let app = express();
const request = require('request');
const config = require('../config.js');
const getAPI = require('../helpers/github.js')
const rp = require('request-promise');

let options = {
  url: `https://api.github.com/users/vpmouler/repos`,
  headers: {
    'User-Agent': 'Request-Promise',
    'Authorization': `token ${config.TOKEN}`
  },
  json: true
};

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  // getAPI.getReposByUsername();

  

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  rp(options).then(data => console.log(data));

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

