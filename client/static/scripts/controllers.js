
// Controllers
var zentypeControllers = angular.module('zentypeControllers', []);


zentypeControllers.controller('MainCtrl', ['$scope', 'WordApiService',
  function($scope, WordApiService) {

    // ping the Popular Words API service to get it running
    WordApiService.ping(function(data) {
      console.log(data);
    });

  }]);


zentypeControllers.controller('HomeCtrl', ['$scope', '$http', 'WordApiService',
  function($scope, $http, WordApiService) {

  }]);


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


zentypeControllers.controller('UserDetailCtrl', ['$scope', 'WordApiService',
  function($scope, WordApiService) {

    $scope.user = {
      name: 'Harry',
      level: '1'
    };

  }]);


zentypeControllers.controller('UserSignupCtrl', ['$scope', 'AuthService',
  function($scope, AuthService) {

  }]);


zentypeControllers.controller('UserLoginCtrl', ['$scope',
  function($scope) {

    console.log('UserLoginCtrl is online...');

  }]);
