/* jshint camelcase:false */

(function(){
   'use strict';

   var weather = angular.module('dbWeatherModule', []);

   weather.factory('WeatherApi', ['$http', function($http){
     function current(zip){
       //this service requires this callback JSON_CALLBACK
       return $http.jsonp('http://api.wunderground.com/api/9b9842efc9926224/conditions/q/'+zip+'.json?callback=JSON_CALLBACK');

     }

     return {current: current};
   }]);

   weather.directive('dbWeather', ['$interval', function($interval){
     var o = {};

    o.restrict = 'A';


    o.templateUrl = '/components/directives/db-weather/db-weather.html';

    o.scope = {zip:'@'};

    o.link = function(scope, element, attrs){
    };

    o.controller = ['$scope', 'WeatherApi', function($scope, WeatherApi){
      WeatherApi.current($scope.zip).then(function(res){
          $scope.icon = res.data.current_observation.icon_url;
          $scope.temp_f = res.data.current_observation.temp_f;
          console.log(res.data);
      });
    }];

    return o;
  }]);
})();

