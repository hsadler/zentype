
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

    var deferred = $q.defer();

    return {
      auth: false,
      userData: null,
      signup: function(username, password) {
        var context = this;
        return $http({
          method: 'POST',
          url: '/api/user/create-user',
          data: {
            username: username,
            password: password,
          }
        })
        .then(function (res) {
          // set the AuthService data to the response
          context.userData = res.data;
          context.auth = true;
          // promise is fulfilled
          deferred.resolve(res.data);
          // promise is returned
          return deferred.promise;
        }, function (err) {
          // the following line rejects the promise
          deferred.reject(err);
          // promise is returned
          return deferred.promise;
        });
      },
      login: function(username, password) {
        var context = this;
        return $http({
          method: 'GET',
          url: '/api/user/get-user',
          params: {
            username: username,
            password: password,
          }
        })
        .then(function (res) {
          // set the AuthService data to the response
          context.userData = res.data;
          context.auth = true;
          // promise is fulfilled
          deferred.resolve(res.data);
          // promise is returned
          return deferred.promise;
        }, function (err) {
          // the following line rejects the promise
          deferred.reject(err);
          // promise is returned
          return deferred.promise;
        });
      },
      logout: function() {
        this.auth = false;
        this.userData = null;
      }
    };

  }]);










