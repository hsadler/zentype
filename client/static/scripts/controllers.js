
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


zentypeControllers.controller('HomeCtrl', ['$scope', '$http', 'WordApiService',
  function ($scope, $http, WordApiService) {

  }]);


zentypeControllers.controller('SpeedtestPageCtrl', ['$scope',
  function ($scope) {
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


zentypeControllers.controller('UserDashboardCtrl', ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.user = {
      username: '',
      level: null
    };

    $scope.$watch(function () { return AuthService.userData; }, function (newVal) {
      $scope.user = newVal;
    });

    $scope.handleLogout = function() {
      AuthService.logout();
      $location.path('/login');
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
