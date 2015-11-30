
// Controllers
var zentypeControllers = angular.module('zentypeControllers', []);


zentypeControllers.controller('HomeCtrl', ['$scope', '$http', 'WordApi',
  function($scope, $http, WordApi) {

    // ping the Popular Words API service to get it running
    WordApi.ping(function(data) {
      console.log(data);
    });

  }]);

// main controller for modular version of speedtest page
zentypeControllers.controller('SpeedtestPageCtrl', ['$scope',
  function($scope) {
    // logic for displaying templates based on state here
    // perhaps this is where user selects speedtest parameters,
    // which are then passed to the ztSpeedtest directive
    // speedtest is completed and score info is passed to this scope
    // score info is then passed to endGamed directive

    // set initial screen location
    $scope.currLoc = 'startscreen';

    $scope.wordSet = [];
    $scope.wordDifficulties = [];
    for(var i = 50; i <= 500; i += 50) {
      $scope.wordDifficulties.push([i - 49, i]);
    }

    // score details needed by multiple directives
    $scope.testDetails = {};

    $scope.initSpeedtest = function() {
      $scope.testDetails.wordSet = [];
      $scope.testDetails.wordSetIndex = 0;
      $scope.testDetails.currText = '';
      $scope.testDetails.speedtestTime = 0;
      $scope.testDetails.timerInterval = null;
      $scope.testDetails.timerRunning = false;
      $scope.testDetails.score = {
        correct: 0,
        incorrect: 0
      };
      $scope.testDetails.userWpm = null;
      $scope.testDetails.speedtestComplete = false;
    };

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
