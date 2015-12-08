
var User = require('./userModel.js');
var Promise = require('bluebird');


module.exports = {

  // create and authenticate user
  createUser: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    console.log('POST for createUser with username: ' + username + ' and password: ' + password);

    User.findOne({
      username: username
    })
    .then(function(user) {
      if(!user) {
        var newUser = new User({ username: username });

        newUser.generateHash(password)
        .then(function(hash) {

          newUser.hashed_password = hash;

          newUser.save()
          .then(function(user) {
            console.log(user);
            res.json(user);
          }, function(err) {
            res.json(err);
          });

        });
      } else {
        res.sendStatus(404);
      }
    });

  },

  // authenticate user
  loginUser: function(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    console.log('GET for loginUser with username: ' + username + ' and password: ' + password);

    User.findOne({
      username: username
    })
    .then(function(user) {
      if(user) {
        user.passwordIsValid(password)
        .then(function(isAuth) {
          if(isAuth) {
            res.json(user);
          } else {
            res.sendStatus(401);
          }
        });
      } else {
        res.sendStatus(404);
      }
    }, function(err) {
      res.status(500).send(err);
    });
  },

  // user info
  getUser: function(req, res) {
    var username = req.query.username;

    console.log('GET for getUser info with username: ', username);

    User.findOne({
      username: username
    })
    .then(function(data) {
      if(data) {
        res.json(data);
      } else {
        res.sendStatus(404);
      }
    }, function(err) {
      res.status(500).send(err);
    });
  }

};

