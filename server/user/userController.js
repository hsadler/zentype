var Promise = require('bluebird');


module.exports = {

  // this is a sample GET endpoint
  sampleEndpoint: function(req, res) {
    console.log('GET request recieved for sampleEndpoint...');
    console.log('query string message: ' + req.query.message);
    res.send('message received.. sending your message back: ' + req.query.message);
  }

};

