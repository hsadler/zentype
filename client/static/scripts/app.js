
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
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/speedtest', {
        templateUrl: 'partials/speedtest.html',
        controller: 'SpeedtestCtrl'
      }).
      when('/speedtest-page', {
        templateUrl: 'partials/speedtest-page.html',
        controller: 'SpeedtestPageCtrl'
      }).
      when('/user', {
        templateUrl: 'partials/user-details.html',
        controller: 'UserDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
