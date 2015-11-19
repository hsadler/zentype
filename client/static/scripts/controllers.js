
// Controllers

var zentypeControllers = angular.module('zentypeControllers', []);


zentypeControllers.controller('HomeCtrl', ['$scope', '$http', 'WordApi',
  function($scope, $http, WordApi) {

    // ping the Popular Words API service to get it running
    WordApi.ping();

  }]);

zentypeControllers.controller('SpeedtestCtrl', ['$scope', '$http',
  function($scope, $http) {

    $scope.title = "ZenType";

    $http.get('/api/speedtest/randomlist')
      .success(function(data) {
        $scope.wordSet = data;
      });

  }]);

zentypeControllers.controller('UserDetailCtrl', ['$scope', 'WordApi',
  function($scope, WordApi) {

    // ping the Popular Words API service to get it running
    WordApi.ping();

    $scope.user = {
      name: 'Harry',
      level: '1'
    };

  }]);
