var zentypeServices = angular.module('zentypeServices', []);

zentypeServices.factory('WordApi', ['$http',
  function($http){
    return {
      ping: function() {
        $http.get('/api/wordservice/ping')
          .success(function(data) {
            console.log(data);
          });
      }
    }
  }]);
