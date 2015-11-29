var ReqP = require('request-promise');

module.exports = {

  // fetch a size 60 random list
  getRandomList: function(req, res) {
    console.log('GET request recieved for getRandomList...');

    var minRank = req.query.minrank || 1;
    var maxRank = req.query.maxrank || 100;
    var size = req.query.size || 60

    ReqP('https://popular-words-api.herokuapp.com/api/words/randomlist?' +
        'size=' + size +
        '&minrank=' + minRank +
        '&maxrank=' + maxRank)
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        console.log('ERROR: ' + err);
        res.status(500).send('ERROR: problem with randomlist request');
      });
  }

};

