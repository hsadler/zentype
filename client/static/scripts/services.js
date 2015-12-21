
// Services
var zentypeServices = angular.module('zentypeServices', []);


zentypeServices.factory('WordApiService', ['$http',
  function ($http){
    return {
      ping: function(callback) {
        // change this to new get version
        $http.get('/api/wordservice/ping')
        .success(function(data) {
          callback(data);
        });
      }
    };
  }]);


zentypeServices.factory('SpeedtestService', ['$http', '$q', '$interval', '$window',
  function ($http, $q, $interval, $window) {

    // date: { type: Date, default: Date.now },
    // wpm: { type: Number, required: true },
    // total_words: { type: Number, required: true },
    // words_incorrect: { type: Number, required: true },
    // total_keystrokes: { type: Number, required: true },
    // keystrokes_incorrect: { type: Number, required: true }

    var service = {

      testDetails: {},

      initTest: function () {
        this.testDetails.wordSet = [];
        this.testDetails.wordSetIndex = 0;
        this.testDetails.currText = '';
        this.testDetails.speedtestTime = 0;
        this.testDetails.timerInterval = null;
        this.testDetails.timerRunning = false;
        this.testDetails.score = {
          date: Date.now(),
          wpm: null,
          totalWords: 0,
          correct: 0,
          incorrect: 0,
          totalKeystrokes: 0,
          keystrokesIncorrect: 0
        };
        this.testDetails.userWpm = null;
        this.testDetails.speedtestComplete = false;
        this.getWords(1, 200, 10)
        .then(function () {
          console.log('testDetails', service.testDetails);
        }, function (err) {
          console.log('ERROR: ', err);
        });
      },

      getWords: function (minRank, maxRank, size) {
        var deferred = $q.defer();
        var context = this;
        var currWordSet = [];
        // fetch random words from the api
        return $http({
          method: 'GET',
          url: '/api/speedtest/randomlist',
          params: {
            size: size || 60,
            minrank: minRank,
            maxrank: maxRank
          }
        })
        .then(function (res) {
          JSON.parse(res.data).forEach(function(item, index) {
            currWordSet.push({
              word: item,
              correct: null
            });
          });
          context.testDetails.wordSet = currWordSet.slice();
          deferred.resolve(context.testDetails);
          return deferred.promise;
        }, function (err) {
          deferred.reject(err);
          return deferred.promise;
        });
      },

      handleUserType: function(event) {
        // save quick pointer to test details
        var td = this.testDetails;
        // only run the function if the speedtest is not complete
        if(!td.speedtestComplete) {
          // if it is the first char entered, start the timer
          if(!td.timerRunning) {
            td.startStopTimer();
          }

          // if last letter of last word is correct, stop the test and calc results
          if(td.wordSetIndex === td.wordSet.length - 1 && td.currText === td.wordSet[td.wordSet.length - 1].word) {
            $interval.cancel(td.timerInterval);
            td.wordSet[td.wordSetIndex].correct = true;
            td.score.correct += 1;
            td.speedtestComplete = true;
            td.currText = '';
          }

          // else if the key pressed is a space, evaluate the currText
          else if(event.keyCode === 32) {
            var text = td.currText.trim();
            if(text === td.wordSet[td.wordSetIndex].word) {
              td.wordSet[td.wordSetIndex].correct = true;
              td.score.correct += 1;
            } else {
              td.wordSet[td.wordSetIndex].correct = false;
              td.score.incorrect += 1;
            }
            td.wordSetIndex += 1;
            td.calculateWpm();
            if(td.wordSetIndex === td.wordSet.length) {
              // stop the speedtest
              $interval.cancel(td.timerInterval);
              td.speedtestComplete = true;
            }
            td.currText = '';
          }
        }
      },

      navigation: {
        locations: ['loadingscreen', 'speedtest', 'scorescreen'],
        currLocIndex: 0,
        currLoc: 'loadingscreen',
        next: function () {
          if(this.locations[this.currLocIndex + 1]) {
            this.currLocIndex++;
          } else {
            this.currLocIndex = 0;
            service.initTest();
          }
          this.currLoc = this.locations[this.currLocIndex];
        }
      }

    };

    // testDetails utility functions
    service.testDetails.calculateWpm = function () {
      var wpm = Math.floor(this.score.correct / (this.speedtestTime / 60));
      this.userWpm = wpm > 0 && wpm < 500 ? wpm : null;
    };

    service.testDetails.startStopTimer = function() {
      var context = this;
      if(!context.timerRunning) {
        context.timerInterval = $interval(function() {
          context.speedtestTime += 1;
        }, 1000);
        context.timerRunning = true;
      } else {
        $interval.cancel(context.timerInterval);
        context.timerRunning = false;
      }
    };

    service.initTest();

    return service;

  }]);


zentypeServices.factory('AuthService', ['$http', '$q', '$window',
  function ($http, $q, $window){

    return {

      auth: false,
      userData: null,

      signup: function(username, password) {
        var deferred = $q.defer();
        var context = this;
        return $http({
          method: 'POST',
          url: '/api/user/create',
          data: {
            username: username,
            password: password,
          }
        })
        .then(function (res) {
          // set the AuthService data to the response
          context.userData = res.data;
          context.auth = true;
          $window.localStorage['com.ZenType'] = res.data.token;

          deferred.resolve(res.data);
          return deferred.promise;
        }, function (err) {
          deferred.reject(err);
          return deferred.promise;
        });
      },

      login: function(username, password) {
        var deferred = $q.defer();
        var context = this;
        return $http({
          method: 'GET',
          url: '/api/user/login',
          params: {
            username: username,
            password: password,
          }
        })
        .then(function (res) {
          // set the AuthService data to the response
          context.userData = res.data;
          context.auth = true;
          $window.localStorage['com.ZenType'] = res.data.token;

          deferred.resolve(res.data);
          return deferred.promise;
        }, function (err) {
          deferred.reject(err);
          return deferred.promise;
        });
      },

      logout: function() {
        this.auth = false;
        this.userData = null;
        $window.localStorage.removeItem('com.ZenType');
      },

      checkToken: function() {
        var context = this;
        var token = $window.localStorage.getItem('com.ZenType');

        if(token) {
          return $http({
            method: 'POST',
            url: '/api/user/auth-token',
            data: {
              token: token
            }
          })
          .then(function (res) {
            // set the AuthService data to the response
            context.userData = res.data;
            context.auth = true;
            $window.localStorage['com.ZenType'] = res.data.token;
          }, function (err) {
            console.log('ERROR: ', err);
          });
        }
      },

      checkTokenAsync: function() {
        var deferred = $q.defer();
        var context = this;
        var token = $window.localStorage.getItem('com.ZenType');

        if(token) {
          return $http({
            method: 'POST',
            url: '/api/user/auth-token',
            data: {
              token: token
            }
          })
          .then(function (res) {
            // set the AuthService data to the response
            context.userData = res.data;
            context.auth = true;
            $window.localStorage['com.ZenType'] = res.data.token;

            deferred.resolve(res.data);
            return deferred.promise;
          }, function (err) {
            deferred.reject(err);
            return deferred.promise;
          });
        } else {
          // return an empty promise for consistency
          return $q.when(false);
        }
      }

    };

  }]);


zentypeServices.factory('UserDetailService', ['$http', '$q', '$window',
  function ($http, $q, $window){

    return {
      userData: null,
      getUser: function(username) {
        var deferred = $q.defer();
        var context = this;
        return $http({
          method: 'GET',
          url: '/api/user/',
          params: {
            username: username
          }
        })
        .then(function (res) {
          // set the AuthService data to the response
          context.userData = res.data;

          deferred.resolve(res.data);
          return deferred.promise;
        }, function (err) {
          deferred.reject(err);
          return deferred.promise;
        });
      }
    };

  }]);


/////////////// UTILITY SERVICES ///////////////////

// navigation service for speedtests
// maybe don't use this
zentypeServices.factory('SpeedtestNavService', [
  function (){

    // return {
    //   next: function()
    // };

  }]);








