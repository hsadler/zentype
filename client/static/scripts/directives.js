
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
        testDetails: '=',
        initSpeedtest: '&'
      },
      restrict: 'E', //can only be an element
      replace: true,
      templateUrl: '../templates/zt-startscreen.html',

      link: function(scope, elem, attrs) {},

      controller: ['$scope', '$http' , function($scope, $http) {

        $scope.nextLoc = function() {
          $scope.currLoc = 'loadingscreen';
        };

        $scope.getWords = function(minRank, maxRank) {
          // init the speedtest
          $scope.initSpeedtest();
          // fetch 60 random words from the api
          // temp small wordset
          var url = '/api/speedtest/randomlist?size=10&minrank=' + minRank + '&maxrank=' + maxRank;
          var currWordSet = [];
          $http.get(url)
            .success(function(data) {
              JSON.parse(data).forEach(function(item, index) {
                currWordSet.push({
                  word: item,
                  correct: null
                });
              });
              $scope.testDetails.wordSet = currWordSet.slice();
            });
        };

      }]

    };
  }]);

// loadingscreen component directive
zentypeDirectives.directive('ztLoadingscreen', [
  function() {
    return {
      scope: { //own scope
        currLoc: '=',
        testDetails: '='
      },
      restrict: 'E', //can only be an element
      replace: true,
      templateUrl: '../templates/zt-loadingscreen.html',

      link: function(scope, elem, attrs) {

        scope.$watchGroup(['currLoc', 'testDetails.wordSet'], function(newVal, oldVal) {
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
        testDetails: '='
      },
      restrict: 'E', //can only be an element
      replace: true,
      templateUrl: '../templates/zt-speedtest.html',

      link: function(scope,  elem, attrs) {

        scope.$watch('testDetails.speedtestComplete', function(newVal) {
          if(newVal === true) {
            scope.nextLoc();
          }
        });

      },

      controller: ['$scope', '$http', '$interval',
        function($scope, $http, $interval) {

          // save testDetails to quick pointer variable
          var td = $scope.testDetails;

          $scope.nextLoc = function() {
            $scope.currLoc = 'scorescreen';
          };

          $scope.startStopTimer = function() {
            if(!td.timerRunning) {
              td.timerInterval = $interval(function() {
                td.speedtestTime += 1;
              }, 1000);
              td.timerRunning = true;
            } else {
              $interval.cancel(td.timerInterval);
              td.timerRunning = false;
            }
          };

          $scope.calculateWpm = function() {
            var wpm = Math.floor(td.score.correct / (td.speedtestTime / 60));
            td.userWpm = wpm > 0 && wpm < 500 ? wpm : null;
          };

          $scope.handleUserType = function(event) {
            // only run the function if the speedtest is not complete
            if(!td.speedtestComplete) {
              // if it is the first char entered, start the timer
              if(!td.timerRunning) {
                $scope.startStopTimer();
              }
              // if the key pressed is a space, evaluate the currText
              // TODO: update this logic to handle no space on last word
              if(event.charCode === 32) {
                var text = td.currText;
                if(text === td.wordSet[td.wordSetIndex].word) {
                  td.wordSet[td.wordSetIndex].correct = true;
                  td.score.correct += 1;
                } else {
                  td.wordSet[td.wordSetIndex].correct = false;
                  td.score.incorrect += 1;
                }
                td.wordSetIndex += 1;
                $scope.calculateWpm();
                if(td.wordSetIndex === td.wordSet.length) {
                  // stop the speedtest, and calculate the wpm
                  $interval.cancel(td.timerInterval);
                  td.speedtestComplete = true
                }
                td.currText = '';
              }
            }
          };

        }] // end ztSpeedtest controller

    };
  }]);

// scorescreen component directive
zentypeDirectives.directive('ztScorescreen', [
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

      controller: ['$scope', function($scope) {

        $scope.nextLoc = function() {
          $scope.currLoc = 'startscreen';
        };

      }]

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
