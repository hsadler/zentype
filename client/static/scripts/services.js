
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

    var userInfo = {
      username: null,
      password: null
    };

    return {

      login: function(username, password) {
        userInfo.username = username;
        userInfo.password = password;
      },

      isAuthenticated: function() {
        return userInfo.username && username.password;
      }

    };

  }]);










