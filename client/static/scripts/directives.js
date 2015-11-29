
//Directives
var zentypeDirectives = angular.module('zentypeDirectives', []);


// autofocus when passed expression evals true
zentypeDirectives.directive('autoFocus', [ '$timeout',
  function($timeout) {
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
  function() {
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

// startscreen component directive
zentypeDirectives.directive('ztStartscreen', [
  function() {
    return {
      scope: { //own scope
        currLoc: '=',
        wordDifficulties: '=',
        wordSet: '='
      },
      restrict: 'E', //only element
      replace: true,
      templateUrl: '../templates/zt-startscreen.html',
      link: function(scope, elem, attrs) {},

      controller: ['$scope', '$http' , function($scope, $http) {

        $scope.nextLoc = function() {
          $scope.currLoc = 'loadingscreen';
        };

        $scope.getWords = function(minRank, maxRank) {
          // fetch 60 random words from the api
          var url = '/api/speedtest/randomlist?minrank=' + minRank + '&maxrank=' + maxRank;
          var currWordSet = [];
          $http.get(url)
            .success(function(data) {
              JSON.parse(data).forEach(function(item, index) {
                currWordSet.push({
                  word: item,
                  correct: null
                });
              });
              $scope.wordSet = currWordSet.slice();
            });
        };

      }]

    };
  }]);

zentypeDirectives.directive('ztLoadingscreen', [
  function() {
    return {
      scope: { //own scope
        currLoc: '=',
        wordSet: '='
      },
      restrict: 'E', //only element
      replace: true,
      templateUrl: '../templates/zt-loadingscreen.html',
      link: function(scope, elem, attrs) {

        scope.$watchGroup(['currLoc', 'wordSet'], function(newVal, oldVal) {
          if(newVal[0] === 'loadingscreen' && newVal[1].length > 0) {
            scope.nextLoc();
          }
        });

      },

      controller: ['$scope', function($scope) {

        $scope.nextLoc = function() {
          $scope.currLoc = 'speedtest';
        };

      }]

    };
  }]);

// speedtest component directive
zentypeDirectives.directive('ztSpeedtest', [
  function() {
    return { //own scope
      scope: {
        currLoc: '=',
        wordSet: '='
      },
      restrict: 'E', //only element
      replace: true,
      templateUrl: '../templates/zt-speedtest.html',
      link: function(scope,  elem, attrs) {},

      controller: ['$scope', '$http', '$interval',
        function($scope, $http, $interval) {

          $scope.nextLoc = function() {
            $scope.currLoc = 'scorescreen';
          };

          $scope.initSpeedtest = function() {
            $scope.wordSet = [];
            $scope.wordSetIndex = 0;
            $scope.currText = '';

            $scope.speedtestTime = 0;
            $scope.timerInterval;
            $scope.timerRunning = false;

            $scope.score = {
              correct: 0,
              incorrect: 0
            };
            $scope.userWpm = null;
            $scope.speedtestComplete = false;
          };
          $scope.initSpeedtest();

          $scope.startStopTimer = function() {
            if(!$scope.timerRunning) {
              $scope.timerInterval = $interval(function() {
                $scope.speedtestTime += 1;
              }, 1000);
              $scope.timerRunning = true;
            } else {
              $interval.cancel($scope.timerInterval);
              $scope.timerRunning = false;
            }
          };

          $scope.calculateWpm = function() {
            var wpm = Math.floor($scope.score.correct / ($scope.speedtestTime / 60));
            $scope.userWpm = wpm > 0 && wpm < 500 ? wpm : null;
          };

          $scope.handleUserType = function(event) {
            // only run the function if the speedtest is not complete
            if(!$scope.speedtestComplete) {
              // if it is the first char entered, start the timer
              if(!$scope.timerRunning) {
                $scope.startStopTimer();
              }
              // if the key pressed is a space, evaluate the currText
              if(event.charCode === 32) {
                var text = $scope.currText;
                if(text === $scope.wordSet[$scope.wordSetIndex].word) {
                  $scope.wordSet[$scope.wordSetIndex].correct = true;
                  $scope.score.correct += 1;
                } else {
                  $scope.wordSet[$scope.wordSetIndex].correct = false;
                  $scope.score.incorrect += 1;
                }
                $scope.wordSetIndex += 1;
                $scope.calculateWpm();
                if($scope.wordSetIndex === $scope.wordSet.length) {
                  // stop the speedtest, and calculate the wpm
                  $interval.cancel($scope.timerInterval);
                  $scope.speedtestComplete = true
                }
                $scope.currText = '';
              }
            }
          };

        }] // end ztSpeedtest controller

    };
  }]);



//-----------------------------TESTING BELOW------------------------------//


// test directives (for learning)
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
