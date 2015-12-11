
// Services
var zentypeServices = angular.module('zentypeServices', []);


zentypeServices.factory('WordApiService', ['$http',
  function ($http){
    return {
      ping: function(callback) {
        // change this to new get version
        $http.get('/api/wordservice/ping')
        .success(function(data) {
          callback(data);
        });
      }
    };
  }]);


zentypeServices.factory('SpeedtestService', ['$http', '$q', '$window',
  function ($http, $q, $window){

    return {
      testDetails: 'the test details'
    };

  }]);


zentypeServices.factory('AuthService', ['$http', '$q', '$window',
  function ($http, $q, $window){

    return {

      auth: false,
      userData: null,

      signup: function(username, password) {
        var deferred = $q.defer();
        var context = this;
        return $http({
          method: 'POST',
          url: '/api/user/create',
          data: {
            username: username,
            password: password,
          }
        })
        .then(function (res) {
          // set the AuthService data to the response
          context.userData = res.data;
          context.auth = true;
          $window.localStorage['com.ZenType'] = res.data.token;

          deferred.resolve(res.data);
          return deferred.promise;
        }, function (err) {
          deferred.reject(err);
          return deferred.promise;
        });
      },

      login: function(username, password) {
        var deferred = $q.defer();
        var context = this;
        return $http({
          method: 'GET',
          url: '/api/user/login',
          params: {
            username: username,
            password: password,
          }
        })
        .then(function (res) {
          // set the AuthService data to the response
          context.userData = res.data;
          context.auth = true;
          $window.localStorage['com.ZenType'] = res.data.token;

          deferred.resolve(res.data);
          return deferred.promise;
        }, function (err) {
          deferred.reject(err);
          return deferred.promise;
        });
      },

      logout: function() {
        this.auth = false;
        this.userData = null;
        $window.localStorage.removeItem('com.ZenType');
      },

      checkToken: function() {
        var context = this;
        var token = $window.localStorage.getItem('com.ZenType');

        if(token) {
          return $http({
            method: 'POST',
            url: '/api/user/auth-token',
            data: {
              token: token
            }
          })
          .then(function (res) {
            // set the AuthService data to the response
            context.userData = res.data;
            context.auth = true;
            $window.localStorage['com.ZenType'] = res.data.token;
          }, function (err) {
            console.log('ERROR: ', err);
          });
        }
      },

      checkTokenAsync: function() {
        var deferred = $q.defer();
        var context = this;
        var token = $window.localStorage.getItem('com.ZenType');

        if(token) {
          return $http({
            method: 'POST',
            url: '/api/user/auth-token',
            data: {
              token: token
            }
          })
          .then(function (res) {
            // set the AuthService data to the response
            context.userData = res.data;
            context.auth = true;
            $window.localStorage['com.ZenType'] = res.data.token;

            deferred.resolve(res.data);
            return deferred.promise;
          }, function (err) {
            deferred.reject(err);
            return deferred.promise;
          });
        } else {
          // return an empty promise for consistency
          return $q.when(false);
        }
      }

    };

  }]);


zentypeServices.factory('UserDetailService', ['$http', '$q', '$window',
  function ($http, $q, $window){

    var deferred = $q.defer();

    return {
      userData: null,
      getUser: function(username) {
        var context = this;
        return $http({
          method: 'GET',
          url: '/api/user/',
          params: {
            username: username
          }
        })
        .then(function (res) {
          // set the AuthService data to the response
          context.userData = res.data;

          deferred.resolve(res.data);
          return deferred.promise;
        }, function (err) {
          deferred.reject(err);
          return deferred.promise;
        });
      }
    };

  }]);










