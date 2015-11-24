
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

// speedtest component directive
zentypeDirectives.directive('ztSpeedtest', [
  function() {
    return {
      scope: {}, //own scope
      restrict: 'E', //only element
      replace: true
      // templateUrl: url
    };
  }]);

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
