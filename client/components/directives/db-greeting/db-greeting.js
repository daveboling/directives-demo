(function(){
  'use strict';

  var hello = angular.module('dbGreetingModule', []);

  hello.directive('dbGreeting', [function(){
    var o = {};

    //E = element, A = attribute, C = class
    //What kind of directive is this?
    o.restrict = 'A';


    //give this directive html to use
    o.templateUrl = '/components/directives/db-greeting/db-greeting.html';

    //false = the scope of the controller this is placed inside of
    //true = creates own scope but inherits from parents
    //{} = isolate scope
    //o.scope = false, true, {}
    //The @ sign represents a attribute method parameter to be defined within the element itself
    o.scope = {name:'@', age:'@'};

    return o;
  }]);

})();
