(function(){
   'use strict';

   var stock = angular.module('dbStockModule', []);

   stock.factory('StockApi', ['$http', function($http){
     function quote(symbol){
       //this service requires this callback JSON_CALLBACK
       return $http.jsonp('http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+symbol+'&callback=JSON_CALLBACK');
     }

     return {quote: quote};
   }]);

   stock.directive('dbStock', ['$interval', function($interval){
     var o = {};

    //E = element, A = attribute, C = class
    //What kind of directive is this?
    o.restrict = 'A';


    //give this directive html to use
    o.templateUrl = '/components/directives/db-stock/db-stock.html';

    //false = the scope of the controller this is placed inside of
    //true = creates own scope but inherits from parents
    //{} = isolate scope
    //o.scope = false, true, {}
    //The @ sign represents a attribute method parameter to be defined within the element itself
    o.scope = {symbol:'@'};

    //link function - allows to manipulate or change the DOM in real time
    //scope, see the isolate scope
    //element is the top level element in the widget
    //attrs, what are the attribute that are part of this directive
    o.link = function(scope, element, attrs){
      element.on('$destory', function(){
        $interval.cancel(scope.id);
      });
    };

    //controller for this THIS directive
    o.controller = ['$scope', 'StockApi', function($scope, StockApi){
      function getQuote(){
        StockApi.quote($scope.symbol).then(function(res){
          $scope.company = res.data.Name;
          $scope.quote = res.data.LastPrice;
        });
      }
      getQuote();
      $scope.id = $interval(getQuote, 30000);


    }];

    return o;
  }]);
})();

