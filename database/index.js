const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  username: String,
  repos: [{repoName: String, description: String, url: String}],
  // id: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // get data from API call
  // use data.username to make new repo
  var newRepo = new Repo({username:data.username, repos:data.repos})
  return newRepo.save((err) => {if (err) throw 'Could not save to DB';});
}

module.exports.save = save;

// save({username: 'seva', id: 6969})