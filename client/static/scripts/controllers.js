
// Controllers
var zentypeControllers = angular.module('zentypeControllers', []);


zentypeControllers.controller('MainCtrl', ['$scope', 'WordApiService', 'AuthService',
  function($scope, WordApiService, AuthService) {

    $scope.$watch(function() { return AuthService.auth; }, function(newVal) {
      $scope.auth = newVal;
    });

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


zentypeControllers.controller('UserSignupCtrl', ['$scope', 'AuthService',
  function($scope, AuthService) {

  }]);


zentypeControllers.controller('UserLoginCtrl', ['$scope', '$location', 'AuthService',
  function($scope, $location, AuthService) {

    // this will have to be changed to asynch
    $scope.submitAuth = function() {
      AuthService.login($scope.username, $scope.password);
      if(AuthService.auth) {
        $location.path('/user');
      }
    };

  }]);


zentypeControllers.controller('UserDetailCtrl', ['$scope', '$location', 'AuthService',
  function($scope, $location, AuthService) {

    $scope.handleLogout = function() {
      AuthService.logout();
      $location.path('/login');
    };

    $scope.user = {
      name: 'Harry',
      level: '1'
    };

  }]);
