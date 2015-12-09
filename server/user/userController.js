
var User = require('./userModel.js');
var Promise = require('bluebird');
var jwt = require('jwt-simple');

var secret = 'Myspoonistoobig';

module.exports = {

  // user info
  getUser: function(req, res) {
    var username = req.query.username;

    console.log('GET for getUser info with username: ', username);

    User.findOne({
      username: username
    })
    .then(function(user) {
      if(user) {
        user = user.toObject();
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    }, function(err) {
      res.status(500).send(err);
    });
  },

  // create and authenticate user
  signupUser: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    console.log('POST for signupUser with username: ' + username + ' and password: ' + password);

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

            user = user.toObject();
            user.token = jwt.encode({
              username: username,
              date: Date.now()
            }, secret);
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
            user = user.toObject();
            user.token = jwt.encode({
              username: username,
              date: Date.now()
            }, secret);
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

  authWithToken: function(req, res) {
    var token = req.body.token;

    console.log('POST for authWithToken with token: ', token);

    var tokenData = jwt.decode(token, secret);

    // if token is younger than 7 days
    if(Date.now() - tokenData.date < 1000 * 60 * 60 * 24 * 7) {
      User.findOne({
        username: tokenData.username
      })
      .then(function(user) {
        if(user) {
          user = user.toObject();
          // attach new token
          user.token = jwt.encode({
            username: tokenData.username,
            date: Date.now()
          }, secret);
          res.json(user);
        } else {
          res.sendStatus(404);
        }
      }, function(err) {
        res.status(500).send(err);
      });
    } else {
      // token is expired
      res.sendStatus(401);
    }

  }


};

