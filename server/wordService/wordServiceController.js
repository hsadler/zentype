var ReqP = require('request-promise');

module.exports = {

  // ping the Popular Words API to make sure it's spun up
  pingWordService: function(req, res) {
    console.log('GET request recieved for pingWordService...');

    ReqP('https://popular-words-api.herokuapp.com/api/ping')
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        console.log('ERROR: ' + err);
        res.status(500).send('ERROR: problem with pingWordService request');
      });
  }

};

