
// Services
var zentypeServices = angular.module('zentypeServices', []);


zentypeServices.factory('WordApiService', ['$http',
  function($http){
    return {
      ping: function(callback) {
        $http.get('/api/wordservice/ping')
          .success(function(data) {
            callback(data);
          });
      }
    };
  }]);


zentypeServices.factory('AuthService', ['$http', '$q', '$window',
  function($http, $q, $window){

    return {
      auth: false,
      login: function(username, password) {
        if(username && password) {
          this.auth = true;
        }
      },
      logout: function() {
        this.auth = false;
      }
    };

  }]);










