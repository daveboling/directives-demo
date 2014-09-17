(function(){
   'use strict';

   var hello = angular.module('dbClockModule', []);

   hello.directive('dbClock', ['$interval', function($interval){
     var o = {};

    //E = element, A = attribute, C = class
    //What kind of directive is this?
    o.restrict = 'A';


    //give this directive html to use
    o.templateUrl = '/components/directives/db-clock/db-clock.html';

    //false = the scope of the controller this is placed inside of
    //true = creates own scope but inherits from parents
    //{} = isolate scope
    //o.scope = false, true, {}
    //The @ sign represents a attribute method parameter to be defined within the element itself
    o.scope = {frequency: '@'};

    //link function - allows to manipulate or change the DOM in real time
    //scope, see the isolate scope
    //element is the top level element in the widget
    //attrs, what are the attribute that are part of this directive
    o.link = function(scope, element, attrs){
      function updateTime(){
        scope.date = new Date();
      }

      var id = $interval(updateTime, scope.frequency * 1);

      //whenever another page is select in Angular, it sends a $destory broadcast, when it does
      //this event will get fired. It will also destroy the interval currently running.
      element.on('$destroy', function(){
        $interval.cancel(id);
      });

    };

    return o;
  }]);
})();

