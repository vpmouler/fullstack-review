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
    options.url = `https://api.github.com/users/${req.body.username}/repos`
    rp(options).then((data) => {
      // get array of objects back
      // save w/ right prop names foreach
      res.send(JSON.stringify(data));
      data.forEach((repo) => {
        var obj = {
          username:data[0].owner.login,
          repoName:repo.name,
          description:repo.description,
          url:repo.html_url,
          stars:repo.stargazers_count,
          id:repo.id
        }
        console.log(repo.name)
        db.save(obj);
      })
      console.log('saved!!!')
    });
  }

  //     var dataBaseObject = {'username':data[0].owner.login, 'repos':[]};
  //     data.forEach((obj) => {
  //       var repoInfo = {
  //         repoName:obj.name,
  //         description:obj.description,
  //         url:obj.html_url,
  //         stars:obj.stargazers_count
  //       }
  //       dataBaseObject.repos.push(repoInfo)
  //     });
  //     return dataBaseObject;
  //   })
  //   .then((obj) => {
  //     res.send(JSON.stringify(obj));
  //     db.save(obj);
  //     console.log('saved!');
  //   });
  // }

// add top stared on prop in db, check if. exists when posting n compare stars

  // use body parser to get req.body's submitted username & add that to options header
  // rp(options).then(data => console.log(data));
  // get data from api call, then save to database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  db.find().limit(10).exec((err, data) => {
    if (err) {
      throw 'Could not fetch top 25'
    } else {
      console.log(data)
      // callback(JSON.stringify(data))
      res.send(JSON.stringify(data));
    }
  })

  // res.send(JSON.stringify({name:'HIIHIHIH'}))


  // do afind for the top ones w. most stars, limited to 25, and send back to client
    // client will handle this (component will mount request) - set a prop on state like state.top if exists, render one way, refactkr to have less render fns




});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

