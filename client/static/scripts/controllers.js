
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
    $scope.currLoc = 'startscreen';
    $scope.wordSet = [];
    $scope.wordDifficulties = [];
    for(var i = 50; i <= 1000; i += 50) {
      $scope.wordDifficulties.push([i - 49, i]);
    }
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
