
// Controllers
var zentypeControllers = angular.module('zentypeControllers', []);


zentypeControllers.controller('HomeCtrl', ['$scope', '$http', 'WordApi',
  function($scope, $http, WordApi) {

    // ping the Popular Words API service to get it running
    WordApi.ping(function(data) {
      console.log(data);
    });

  }]);


zentypeControllers.controller('SpeedtestCtrl', ['$scope', '$http',
  function($scope, $http) {

    $scope.wordSet = [];
    $scope.wordSetIndex = 0;
    $scope.currText = '';
    $scope.score = {
      correct: 0,
      incorrect: 0
    };

    $http.get('/api/speedtest/randomlist')
      .success(function(data) {
        JSON.parse(data).forEach(function(item, index) {
          $scope.wordSet.push({
            word: item,
            correct: null
          });
        });
      });

    $scope.checkUserType = function(event) {
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
        $scope.currText = '';
      }
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
