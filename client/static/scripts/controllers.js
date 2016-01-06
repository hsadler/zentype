
// Controllers
var zentypeControllers = angular.module('zentypeControllers', []);


zentypeControllers.controller('MainCtrl', ['$scope', 'WordApiService', 'AuthService',
  function ($scope, WordApiService, AuthService) {

    $scope.$watch(function () { return AuthService.auth; }, function (newVal) {
      $scope.auth = newVal;
    });

    // ping the Popular Words API service to get it running
    WordApiService.ping(function(data) {
      console.log(data);
    });

  }]);


zentypeControllers.controller('HomeCtrl', ['$scope',
  function ($scope) {

  }]);


// standard speedtest page
zentypeControllers.controller('SpeedtestPageCtrl', ['$scope', 'SpeedtestService',
  function ($scope, SpeedtestService) {

    // watch the SpeedtestService and databind the test details to the controller scope
    $scope.$watch(function () { return SpeedtestService.testDetails; }, function (newVal) {
      $scope.testDetails = newVal;
    });
    // watch the SpeedtestService and databind the test navigation to the controller scope
    $scope.$watch(function () { return SpeedtestService.navigation; }, function (newVal) {
      $scope.navigation = newVal;
    });

  }]);


// mutiple challenges page (coming later)
zentypeControllers.controller('ChallengesPageCtrl', ['$scope',
  function ($scope) {

    // set initial screen location
    $scope.currLoc = 'startscreen';

    $scope.wordSet = [];
    $scope.wordDifficulties = [];
    for(var i = 50; i <= 500; i += 50) {
      $scope.wordDifficulties.push([i - 49, i]);
    }

    // score details needed by multiple directives
    $scope.testDetails = {};

    $scope.initSpeedtest = function () {
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


zentypeControllers.controller('UserSignupCtrl', ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.username = '';
    $scope.password = '';
    $scope.confirmPassword = '';

    $scope.submitIsClickable = function() {
      return $scope.username.length > 0
        && $scope.password.length > 0
        && $scope.password === $scope.confirmPassword;
    };

    $scope.submitSignup = function() {
      AuthService.signup($scope.username, $scope.password)
      .then(function (res) {
        if(AuthService.auth) {
          $location.path('/dashboard');
        }
      }, function (err) {
        console.log('ERROR: ', err);
      });
    };

  }]);


zentypeControllers.controller('UserLoginCtrl', ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.username = '';
    $scope.password = '';

    $scope.submitIsClickable = function() {
      return $scope.username.length > 0 && $scope.password.length > 0;
    };

    $scope.submitLogin = function() {
      AuthService.login($scope.username, $scope.password)
      .then(function (res) {
        if(AuthService.auth) {
          $location.path('/dashboard');
        }
      }, function (err) {
        console.log('ERROR: ', err);
      });
    };

  }]);


zentypeControllers.controller('UserDashboardCtrl', ['$scope', '$location', 'AuthService', 'UserDetailService', 'UtilityService',
  function ($scope, $location, AuthService, UserDetailService, UtilityService) {

    $scope.$watch(function () { return UserDetailService.userData; }, function (newVal) {
      console.log(newVal);
      $scope.user = newVal;
    });

    $scope.handleLogout = function() {
      AuthService.logout();
      $location.path('/login');
    };

    // for getting user stat averages
    $scope.userLevel = function() { return UserDetailService.userLevel(); };
    $scope.userWpm = function() { return UserDetailService.userWpm(); };
    $scope.userTotalTests = function() { return UserDetailService.userTotalTests(); };
    $scope.userTotalWordsTyped = function() { return UserDetailService.userTotalWordsTyped(); };
    $scope.userTotalKeystrokes = function() { return UserDetailService.userTotalKeystrokes(); };
    $scope.userWordAccuracy = function() { return UserDetailService.userWordAccuracy(); };
    $scope.userKeystrokeAccuracy = function() { return UserDetailService.userKeystrokeAccuracy(); };

    // top 5 missed words and keys
    $scope.getTopFiveMissedWords = function() {
      return _.sortBy($scope.user.user_stats.word_records, 'incorrect_count').reverse();
    };
    $scope.getTopFiveMissedKeys = function() {
      return _.sortBy($scope.user.user_stats.character_records, 'incorrect_count').reverse();
    };

    // utility functions
    $scope.calcAccuracy = function(total, incorrect) {
      return UtilityService.calcAccuracy(total, incorrect);
    };

  }]);


zentypeControllers.controller('UserDetailCtrl', ['$scope', '$location', 'UserDetailService',
  function ($scope, $location, UserDetailService) {

    UserDetailService.getUser($location.search().username)
    .then(function (res) {
      $scope.user = UserDetailService.userData;
    }, function (err) {
      console.log('ERROR: ', err);
    });

  }]);
