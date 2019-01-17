var request = require('request');
var gitToken = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + gitToken.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var repos = JSON.parse(body);
    var result = [];
    for (var i = 0; i < repos.length; i++){
      result.push(repos[i].avatar_url);
    }
    cb(err, result);
  })
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});