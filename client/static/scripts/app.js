
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
  function($routeProvider) {
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
        controller: 'UserDashboardCtrl'
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
