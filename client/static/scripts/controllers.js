
// Controllers

var zentypeControllers = angular.module('zentypeControllers', []);


zentypeControllers.controller('HomeCtrl', ['$scope',
  function($scope) {
    // nothing for now
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
