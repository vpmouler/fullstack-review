const request = require('request');
const config = require('../config.js');

let getReposByUsername = (req, res) => { // OR CALL BACK HERE??
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/vpmouler/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, function(err, response, body) {
    // console.log('err',err);
    // console.log('response',response); 
    console.log('body!!!!!! : ',body) // array of objects of repos
  })

}

// get post requests body to find username,
// insert it into URL
// use express to attach options in request
// upon receiving the response in cb, save it to DB (need to require db here)
// also send it in response (maybe take them to a template where we render based on our API requests props like username, forEach repo names, desc, etc)

module.exports.getReposByUsername = getReposByUsername;