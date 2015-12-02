
var User = require('./userModel.js');


module.exports = {

  // create a test user
  createTestUser: function(req, res) {
    var username = req.query.username;
    var level = req.query.level;

    console.log("GET recieved for createTestUser with query: ", username, level);

    //add a test user to DB
    var testUser = new User({
      username: username,
      level: level
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

    console.log('GET test for user info with query: ', username);

    User.findOne({
      username: username
    })
    .exec()
    .then(function(data) {
      res.json(data);
    }, function(err) {
      res.json(err);
    });
  }

};

