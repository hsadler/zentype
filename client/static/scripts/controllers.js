
// Controllers

var zentypeControllers = angular.module('zentypeControllers', []);


zentypeControllers.controller('HomeCtrl', ['$scope', '$http',
  function($scope, $http) {

    // ping the Popular Words API service to get it running
    $http.get('/api/ping-words-service')
      .success(function(data) {
        console.log(data);
      });

  }]);

zentypeControllers.controller('SpeedtestCtrl', ['$scope', '$http',
  function($scope, $http) {

    $scope.title = "ZenType";

    $http.get('/api/speedtest/randomlist')
      .success(function(data) {
        $scope.wordSet = data;
      });

  }]);

zentypeControllers.controller('UserDetailCtrl', ['$scope',
  function($scope) {

    $scope.user = {
      name: 'Harry',
      level: '1'
    };

  }]);
