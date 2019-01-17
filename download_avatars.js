var request = require('request');
var gitToken = require('./secrets');
var fs = require('fs');

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
      result.push({
        avatar_url: repos[i].avatar_url,
        name: repos[i].login
      });
    }
    cb(err, result);
  })

}

function downloadImageByURL(url, filePath) {
  console.log(678, url, filePath);
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (response) {
      console.log('Response Status Code: ', response.statusCode);
    })
    .on('data', function (response){
      console.log('Downloading image...');
    })
    .on('end', function (response){
      console.log('Download complete.');
    })
    .pipe(fs.createWriteStream(filePath));
      console.log()
}
getRepoContributors("jquery", "jquery", function(err, result) {
  for (var i = 0; i < result.length; i++) {
    var filePath = 'avatars/' + result[i].name + '.jpg';
    var url = result[i].avatar_url;
    downloadImageByURL(url, filePath);
  }

});
