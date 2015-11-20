var ReqP = require('request-promise');

module.exports = {

  // fetch a size 60 random list
  getRandomList: function(req, res) {
    console.log('GET request recieved for getRandomList...');

    ReqP('https://popular-words-api.herokuapp.com/api/words/randomlist?size=60&minrank=1&maxrank=100')
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        console.log('ERROR: ' + err);
        res.status(500).send('ERROR: problem with randomlist request');
      });
  }

};

