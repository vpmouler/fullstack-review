const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  username: String,
  // repos: [{repoName: String, description: String, url: String, stars: Number}],
  repo: String,
  description: String,
  url: String,
  stars: Number,
  repoId: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // get data from API call
  // use data.username to make new repo
  var newRepo = new Repo({username:data.username, repo:data.repoName, description:data.description, url:data.url, stars:data.stars, repoId:data.id}) // one repo {user:seva, repo:xx} {user:seva, repo:hh}
  return newRepo.save((err) => {if (err) throw 'Could not save to DB';});
};

let find = (callback) => {
  return Repo.find({stars:{$gt:0}}).sort({stars:-1})//.exec((err,data) => {
  //   if (err) {
  //     throw 'Could not fetch top 25'
  //   } else {
  //     // callback(JSON.stringify(data))
  //     callback(null,data)
  //   }
  // })
};

module.exports.find = find;
module.exports.save = save;

// save({username: 'seva', id: 6969})