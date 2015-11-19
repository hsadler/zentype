
// App Module

var zentypeApp = angular.module('zentypeApp', [
  'ngRoute',
  'ui.bootstrap',
  'zentypeControllers'
  // 'zentypeFilters',
  // 'zentypeServices'
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
      when('/user', {
        templateUrl: 'partials/user-details.html',
        controller: 'UserDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
