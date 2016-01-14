
//Directives
var zentypeDirectives = angular.module('zentypeDirectives', []);


// autofocus when passed expression evals true
zentypeDirectives.directive('autoFocus', [ '$timeout',
  function ($timeout) {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        scope.$watch(attrs.autoFocus, function(newVal, oldVal) {
          if(newVal === true) {
            $timeout(function() {
              elem[0].focus();
            }, 0);
          }
        }, true);
      }
    };
  }]);

// prevent tabs when inside speedtest input field
zentypeDirectives.directive('preventTab', [
  function () {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        elem.bind('keydown', function(e) {
          var keycode = e.which;
          if(keycode === 9) {
            e.preventDefault();
          }
        });
      }
    };
  }]);


///////////////// SPEEDTEST DIRECTIVES ////////////////////////

// loadingscreen component directive
zentypeDirectives.directive('ztLoadingscreen', [
  function () {
    return {
      scope: { //own scope
        testDetails: '=',
        navigation: '='
      },
      restrict: 'E', //can only be an element
      replace: true,
      templateUrl: '../templates/zt-loadingscreen.html',

      link: function (scope, elem, attrs) {
        scope.$watchGroup(['navigation.currLoc', 'testDetails.wordSet'], function(newVal, oldVal) {
          if(newVal[0] === 'loadingscreen' && newVal[1].length > 0) {
            scope.navigation.next();
          }
        });
      },

      controller: ['$scope', function($scope) {

      }]

    };
  }]);

// speedtest component directive
zentypeDirectives.directive('ztSpeedtest', [
  function() {
    return { //own scope
      scope: {
        testDetails: '=',
        // perhaps pass an options object to the speedtest to account for different speedtest types
        // testOptions: '=',
        navigation: '='
      },
      restrict: 'E', //can only be an element
      replace: true,
      templateUrl: '../templates/zt-speedtest.html',

      link: function(scope,  elem, attrs) {
        scope.$watch('testDetails.speedtestComplete', function(newVal) {
          if(newVal === true) {
            scope.navigation.next();
          }
        });
      },

      controller: ['$scope', '$http', '$interval', 'SpeedtestService',
        function($scope, $http, $interval, SpeedtestService) {

          $scope.handleUserType = SpeedtestService.handleUserType;

        }]
    };
  }]);

// scorescreen component directive
zentypeDirectives.directive('ztScorescreen', [
  function() {
    return {
      scope: { //own scope
        testDetails: '=',
        navigation: '='
      },
      restrict: 'E', //can only be an element
      replace: true,
      templateUrl: '../templates/zt-scorescreen.html',

      link: function(scope, elem, attrs) {},

      controller: ['$scope', 'UtilityService',
        function ($scope, UtilityService) {

          console.log($scope.testDetails);

          $scope.calcAccuracy = function (total, incorrect) {
            return UtilityService.calcAccuracy(total, incorrect);
          };
          $scope.calcUserXp = function (wpm, totalWords, incorrect) {
            return UtilityService.calcUserXp(wpm, totalWords, incorrect);
          };

      }]

    };
  }]);


///////////////// D3 DIRECTIVES ////////////////////////

// dashboard wpm directive
zentypeDirectives.directive('ztWpmGraph', ['$window',
  function($window) {
    return {
      scope: { //own scope
        testDetails: '=',
        navigation: '='
      },
      restrict: 'E', //can only be an element
      replace: true,
      templateUrl: '../templates/zt-wpm-graph.html',

      link: function(scope, elem, attrs) {

        console.log('link method has been run...');

        var w = angular.element($window);

        scope.getGraphSpaceWidth = function() {
          return elem[0].offsetWidth;
        };

        scope.renderGraph(scope.getGraphSpaceWidth());

        scope.$watch(scope.getGraphSpaceWidth, function(newVal, oldVal) {
          scope.updateGraphWidth(newVal);
        }, true);

        w.bind('resize', function () {
          scope.$apply();
        });

      },

      controller: ['$scope', 'UserDetailService', 'UtilityService',
        function ($scope, UserDetailService, UtilityService) {

          console.log('the wpm graph has attached...');

          var vis = d3.select('#wpm-graph');

          $scope.renderGraph = function(width) {
            var testRecords = UserDetailService.userData.user_stats.test_records;
            var graphData = [];

            testRecords.forEach(function(item, i) {
              graphData.push({ pos: i, wpm: item.wpm });
            });

            vis.data(graphData)
              .append('svg')
              .style('height', 300)
              .style('width', width)
              .style('background-color', '#1c1e22')
              .attr('viewBox', '0 0 ' + width + ' 300')
              .attr('perserveAspectRatio', 'xMinYMid');

            console.log('vis', vis);
          };

          $scope.updateGraphWidth = function(width) {
            vis.select('svg')
              .style('width', width);
          };

      }]

    };
  }]);










//             <==== OLD CODE BELOW ====>                    //

///////////////// CHALLENGE DIRECTIVES ////////////////////////

// this all needs to be rewritten

// startscreen component directive
zentypeDirectives.directive('ztChallengeStartscreen', [
  function () {
    return {
      scope: { //own scope
        currLoc: '=',
        wordDifficulties: '=',
        testDetails: '=',
        initSpeedtest: '&'
      },
      restrict: 'E', //can only be an element
      replace: true,
      templateUrl: '../templates/zt-startscreen.html',

      link: function (scope, elem, attrs) {},

      controller: ['$scope', '$http' , function($scope, $http) {}]

    };
  }]);

// loadingscreen component directive
zentypeDirectives.directive('ztChallengeLoadingscreen', [
  function () {
    return {
      scope: { //own scope
        currLoc: '=',
        testDetails: '='
      },
      restrict: 'E', //can only be an element
      replace: true,
      templateUrl: '../templates/zt-loadingscreen.html',

      link: function (scope, elem, attrs) {},

      controller: ['$scope', function($scope) {}]

    };
  }]);

// speedtest component directive
zentypeDirectives.directive('ztChallengeSpeedtest', [
  function() {
    return { //own scope
      scope: {
        currLoc: '=',
        testDetails: '='
      },
      restrict: 'E', //can only be an element
      replace: true,
      templateUrl: '../templates/zt-speedtest.html',

      link: function(scope,  elem, attrs) {},

      controller: ['$scope', '$http', '$interval', function($scope, $http, $interval) {}]

    };
  }]);

// scorescreen component directive
zentypeDirectives.directive('ztChallengeScorescreen', [
  function() {
    return {
      scope: { //own scope
        currLoc: '=',
        testDetails: '='
      },
      restrict: 'E', //can only be an element
      replace: true,
      templateUrl: '../templates/zt-scorescreen.html',

      link: function(scope, elem, attrs) {},

      controller: ['$scope', function($scope) {}]

    };
  }]);



//-----------------------------TESTING BELOW------------------------------//


// test directives (examples for learning)
zentypeDirectives.directive('helloWorld', [
  function() {
    return {
      restrict: 'EA', // restricts the directive to only be used as an element or an attribute
      replace: 'true', // boolean whether or not the html in the template will replace the element
      template: '<h3>Hello World!!</h3>' // specifies the compiled markup
      // templateUrl: '/templateLocation.html' // alternative to template that specifies url of template file
    };
  }]);

// test2
zentypeDirectives.directive('helloWorld2', function() {
  return {
    scope: {
      color: '@',
      showing: '@'
    },
    restrict: 'AE',
    replace: true,
    template: '<p style="background-color:{{color}}" ng-hide="{{showing}}">Hello World, I\'m {{color}}, and my ng-show is {{showing}}</p>',
    link: function(scope, elem, attrs) {
      elem.bind('click', function() {
        elem.css('background-color', 'white');
        scope.$apply(function() {
          scope.color = "white";
        });
      });
      elem.bind('mouseover', function() {
        elem.css('cursor', 'pointer');
      });
    }
  };
});
