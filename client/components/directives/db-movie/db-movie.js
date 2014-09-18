/* jshint camelcase:false */

(function(){
   'use strict';

   var weather = angular.module('dbMovieModule', []);

   weather.factory('MovieApi', ['$http', function($http){
     function search(movie){
       return $http.jsonp('http://api.rottentomatoes.com/api/public/v1.0/movies.json?q='+movie+'&page_limit=1&page=1&apikey=28sm734zfc9a2v3hdptd77gy&callback=JSON_CALLBACK');
     }

     function info(res){
      return $http.jsonp('http://api.rottentomatoes.com/api/public/v1.0/movies/'+res.data.movies[0].id+'.json?apikey=28sm734zfc9a2v3hdptd77gy&callback=JSON_CALLBACK');
     }

     return {search: search, info: info};
   }]);

   weather.directive('dbMovie', ['$interval', function($interval){
     var o = {};

    o.restrict = 'A';


    o.templateUrl = '/components/directives/db-movie/db-movie.html';

    //functions get an ampersand
    //Our handler for this function is given inside controller calling this
    o.scope = {movie:'@', remove:'&'};

    o.link = function(scope, element, attrs){
    };

    o.controller = ['$scope', 'MovieApi',function($scope, MovieApi, Movie){
      MovieApi.search($scope.movie)
     .then(MovieApi.info)
     .then(function(res){
       $scope.result = res.data;
       $scope.result.posters.original = res.data.posters.original.replace('_tmb', '_pos');
      });
    }];

    return o;
  }]);
})();

