
var User = require('./userModel.js');


module.exports = {

  // create a test user
  createTestUser: function(req, res) {
    var username = req.body.username;

    console.log("POST recieved for createTestUser with username: ", username);

    //add a test user to DB
    var testUser = new User({
      username: username
    })
    .save()
    .then(function(data) {
      res.json(data);
    }, function(err) {
      res.json(err);
    });
  },

  // test for GET user info
  getTestUser: function(req, res) {
    var username = req.query.username;

    console.log('GET test for user info with username: ', username);

    User.findOne({
      username: username
    })
    .then(function(data) {
      res.json(data);
    }, function(err) {
      res.json(err);
    });
  }

};

