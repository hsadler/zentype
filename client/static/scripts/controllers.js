
// Controllers
var zentypeControllers = angular.module('zentypeControllers', []);


zentypeControllers.controller('HomeCtrl', ['$scope', '$http', 'WordApi',
  function($scope, $http, WordApi) {

    // ping the Popular Words API service to get it running
    WordApi.ping(function(data) {
      console.log(data);
    });

  }]);


// temporary all-in-one version of the speedtest
zentypeControllers.controller('SpeedtestCtrl', ['$scope', '$http', '$interval',
  function($scope, $http, $interval) {

    $scope.getWords = function() {
      // fetch 60 random words from the api
      $http.get('/api/speedtest/randomlist')
        .success(function(data) {
          JSON.parse(data).forEach(function(item, index) {
            $scope.wordSet.push({
              word: item,
              correct: null
            });
          });
        });
    };

    $scope.initSpeedtest = function() {
      $scope.wordSet = [];
      $scope.wordSetIndex = 0;
      $scope.currText = '';

      $scope.speedtestTime = 0;
      $scope.timerInterval;
      $scope.timerRunning = false;

      $scope.score = {
        correct: 0,
        incorrect: 0
      };
      $scope.userWpm = null;
      $scope.speedtestComplete = false;

      $scope.getWords();
    };
    $scope.initSpeedtest();

    $scope.startStopTimer = function() {
      if(!$scope.timerRunning) {
        $scope.timerInterval = $interval(function() {
          $scope.speedtestTime += 1;
        }, 1000);
        $scope.timerRunning = true;
      } else {
        $interval.cancel($scope.timerInterval);
        $scope.timerRunning = false;
      }
    };

    $scope.calculateWpm = function() {
      var wpm = Math.floor($scope.score.correct / ($scope.speedtestTime / 60));
      $scope.userWpm = wpm > 0 && wpm < 500 ? wpm : null;
    };

    $scope.handleUserType = function(event) {
      // only run the function if the speedtest is not complete
      if(!$scope.speedtestComplete) {
        // if it is the first char entered, start the timer
        if(!$scope.timerRunning) {
          $scope.startStopTimer();
        }
        // if the key pressed is a space, evaluate the currText
        if(event.charCode === 32) {
          var text = $scope.currText;
          if(text === $scope.wordSet[$scope.wordSetIndex].word) {
            $scope.wordSet[$scope.wordSetIndex].correct = true;
            $scope.score.correct += 1;
          } else {
            $scope.wordSet[$scope.wordSetIndex].correct = false;
            $scope.score.incorrect += 1;
          }
          $scope.wordSetIndex += 1;
          $scope.calculateWpm();
          if($scope.wordSetIndex === $scope.wordSet.length) {
            // stop the speedtest, and calculate the wpm
            $interval.cancel($scope.timerInterval);
            $scope.speedtestComplete = true
          }
          $scope.currText = '';
        }
      }
    };

  }]);


// main controller for modular version of speedtest page
zentypeControllers.controller('SpeedtestPageCtrl', ['$scope',
  function($scope) {
    // logic for displaying templates based on state here
    // perhaps this is where user selects speedtest parameters,
    // which are then passed to the ztSpeedtest directive
    // speedtest is completed and score info is passed to this scope
    // score info is then passed to endGamed directive
  }]);


zentypeControllers.controller('UserDetailCtrl', ['$scope', 'WordApi',
  function($scope, WordApi) {

    // ping the Popular Words API service to get it running
    WordApi.ping(function(data) {
      console.log(data);
    });

    $scope.user = {
      name: 'Harry',
      level: '1'
    };

  }]);
