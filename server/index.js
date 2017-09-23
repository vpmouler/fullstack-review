var fetch = require('isomorphic-fetch');
const express = require('express');
let app = express();
const request = require('request');
const config = require('../config.js');
const getAPI = require('../helpers/github.js')
const rp = require('request-promise');
const db = require('../database/index.js');
const bodyparser = require('body-parser');

let options = {
  url: `https://api.github.com/users/vozyar/repos`,
  headers: {
    'User-Agent': 'Request-Promise',
    'Authorization': `token ${config.TOKEN}`
  },
  json: true
};

app.use(bodyparser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  if (!req.body.username) {
    res.send();
  } else {
    console.log(req.body.username)
  }



  // use body parser to get req.body's submitted username & add that to options header
  // rp(options).then(data => console.log(data));
  // get data from api call, then save to database

  

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  rp(options).then(data => console.log('this my data',typeof data[0]));


  rp(options).then((data) => {
    var dataBaseObject = {'username':data[0].owner.login, 'repos':[]};
    //[{repoName: String, description: String, url: String}],
    data.forEach((obj) => {
      var repoInfo = {
        repoName:obj.name,
        description:obj.description,
        url:obj.html_url
      }
      dataBaseObject.repos.push(repoInfo)
    });
    // console.log('length: ',data.length);
    // console.log('data[0]: ', data[0]);
    // console.log('data[0].name: ', data[0].name);
    // console.log('USERNAME data[0].owner.login: ', data[0].owner.login);
    // console.log('data[0].description: ', data[0].description)
    return dataBaseObject;
  })
  .then((obj) => {
    db.save(obj);
    console.log('saved!');
  })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

