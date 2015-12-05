
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR  = 10;


// for characterRecords hash
var charHash = (function() {
  var hash = {};
  var keyChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()-=_+[]{};\':",.<>/?\\|`~';
  keyChars.split('').forEach(function(c) {
    hash['char_' + c] = {
      character: { type: String, default: c },
      score: { type: Number, default: 0 }
    };
  });
  return hash;
})();

// schema
var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hashedPassword: { type: Number },
  level: { type: Number, default: 1 },
  globalRank: { type: Number, default: 0 },
  userStats: {
    testRecords:[{
      date: { type: Date, default: Date.now },
      wpm: { type: Number, required: true },
      totalWords: { type: Number, required: true },
      wordsIncorrect: { type: Number, required: true },
      totalKeystrokes: { type: Number, required: true },
      keystrokesIncorrect: { type: Number, required: true }
    }],
    characterRecords: charHash,
    challengeRecords: [{
      challengeName: { type: String, required: true, unique: true },
      unlockDate: { type: Date, default: Date.now },
      wpm: { type: Number, required: true },
      accuracy: { type: Number, required: true }
    }]
  },
  userAchievements: [{
    achievementName: { type: String, required: true, unique: true },
    unlockDate: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('user', UserSchema);
