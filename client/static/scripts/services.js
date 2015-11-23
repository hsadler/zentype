
// Services
var zentypeServices = angular.module('zentypeServices', []);


zentypeServices.factory('WordApi', ['$http',
  function($http){
    return {
      ping: function(callback) {
        $http.get('/api/wordservice/ping')
          .success(function(data) {
            callback(data);
          });
      }
    }
  }]);
