var ReqP = require('request-promise');

module.exports = {

  // fetch a random list of specified size
  getRandomList: function(req, res) {
    console.log('GET request recieved for getRandomList...');

    var minRank = req.query.minrank || 1;
    var maxRank = req.query.maxrank || 100;
    var size = req.query.size || 60

    // request ten thousand random words from the api
    // filter out any single letter words that aren't 'i' or 'a'
    // once we have the correct size collection, send JSON response
    ReqP('https://popular-words-api.herokuapp.com/api/words/randomlist?' +
        'size=' + 10000 +
        '&minrank=' + minRank +
        '&maxrank=' + maxRank)
      .then(function(data) {
        data = JSON.parse(data);
        var result = [];
        var curr = null;
        while(result.length < size) {
          var curr = data[data.length - 1];
          if(curr.length !== 1 || curr === 'a' || curr === 'i') {
            result.push(data.pop());
          } else {
            data.pop();
          }
        }
        res.json(JSON.stringify(result));
      })
      .catch(function(err) {
        console.log('ERROR: ' + err);
        res.status(500).send('ERROR: problem with randomlist request');
      });
  }

};

