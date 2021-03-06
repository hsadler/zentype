
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

// schema
var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hashed_password: { type: String },
  xp_points: { type: Number, default: 0 },
  global_rank: { type: Number, default: 0 },
  user_stats: {
    test_records:[{
      date: { type: Date, default: Date.now },
      wpm: { type: Number, required: true },
      total_words: { type: Number, required: true },
      words_incorrect: { type: Number, required: true },
      total_keystrokes: { type: Number, required: true },
      keystrokes_incorrect: { type: Number, required: true }
    }],
    // character hash for keeping track of missed key characters
    character_records: { type: mongoose.Schema.Types.Mixed, default: {} },
    // word hash for keeping track of missed words
    word_records: { type: mongoose.Schema.Types.Mixed, default: {} },
    challenge_records: [{
      challenge_name: { type: String, required: true },
      unlock_date: { type: Date, default: Date.now },
      wpm: { type: Number, required: true },
      accuracy: { type: Number, required: true }
    }]
  },
  user_achievements: [{
    achievement_name: { type: String, required: true },
    unlock_date: { type: Date, default: Date.now }
  }]
}, { minimize: false });


// static methods
// generating a hash
UserSchema.methods.generateHash = function(password) {
  var genSalt = Promise.promisify(bcrypt.genSalt);
  var hash = Promise.promisify(bcrypt.hash);

  return genSalt(10)
  .then(function(salt) {
    return hash(password, salt, null);
  });
};

// checking if password is valid
UserSchema.methods.passwordIsValid = function(password) {
  var compare = Promise.promisify(bcrypt.compare);
  return compare(password, this.hashed_password);
};


module.exports = mongoose.model('user', UserSchema);




