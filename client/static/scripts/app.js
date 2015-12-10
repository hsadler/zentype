
// App Module
var zentypeApp = angular.module('zentypeApp', [
  'ngRoute',
  'ui.bootstrap',
  'zentypeControllers',
  'zentypeServices',
  'zentypeDirectives'
  // 'zentypeFilters'
]);


zentypeApp.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      })
      .when('/speedtest', {
        templateUrl: 'partials/speedtest-page.html',
        controller: 'SpeedtestPageCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'partials/user-dashboard.html',
        controller: 'UserDashboardCtrl',
        requiresLogin: true
      })
      .when('/user', {
        templateUrl: 'partials/user-details.html',
        controller: 'UserDetailCtrl'
      })
      .when('/signup', {
        templateUrl: 'partials/user-signup.html',
        controller: 'UserSignupCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/user-login.html',
        controller: 'UserLoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);


zentypeApp.run(['$rootScope', '$location', 'AuthService',
  function ($rootScope, $location, AuthService) {

    // this is where jwt token auth is checked
    $rootScope.$on('$routeChangeStart', function (event, next) {

      // only do async token checks for routes that require login
      if(next.requiresLogin && !AuthService.auth) {
        AuthService.checkTokenAsync()
        .then(function (res) {
          if(!AuthService.auth) {
            event.preventDefault();
            $location.path('/login');
          }
        }, function (err) {
          console.log('ERROR: ', err);
        });
      }
      // else, if not already logged in, do a normal token check
      else if(!AuthService.auth) {
        AuthService.checkToken();
      }

    });

  }]);
