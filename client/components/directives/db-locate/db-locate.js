/* jshint camelcase:false */

(function(){
   'use strict';

   var locate = angular.module('dbLocateModule', []);

   locate.factory('LocateApi', ['$http', '$q', function($http, $q){
    function locate(){
      //deferred - it's not gonna happen right now, deferred until later
      var deferred = $q.defer(), //create deferred promise
      options = {enableHighAccuracy: true,timeout: 10000, maximumAge: 0};
      navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject, options);
      return deferred.promise;
    }

    return {locate: locate};

   }]);




   locate.directive('dbLocate', ['$interval', '$rootScope', function($interval, $rootScope){
     var o = {};
    o.restrict = 'A';
    o.templateUrl = '/components/directives/db-locate/db-locate.html';
    o.scope = {};
    o.link = function(scope, element, attrs){
    };

    o.controller = ['$scope', 'LocateApi', function($scope, LocateApi){
      $scope.findMe = function(){
        LocateApi.locate().then(success, error);
      };


      function success(pos){
        console.log(pos);
        $rootScope.$broadcast('position', pos);
      }

      function error(err){
      }

    }];

    return o;
  }]);





})();

