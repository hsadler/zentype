
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR  = 10;


var UserSchema = new mongoose.Schema({
  username: String,
  level: Number
});

module.exports = mongoose.model('user', UserSchema);
