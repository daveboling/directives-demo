(function(){
  'use strict';

  angular.module('directives-demo')
  .controller('HomeCtrl', ['$scope', '$interval', 'Home', 'Movie', function($scope, $interval, Home, Movie){
    $scope.people = [{name: 'Bob', age: 25}, {name: 'Tim', age: 500}];
    $scope.titles = [];

    $scope.addMovie = function(){
      $scope.titles.push($scope.movie);
      Movie.create($scope.movie).then(function(res){
        $scope.movie = '';
      });
    };

    $scope.delMovie = function(index, id){
      Movie.remove(id).then(function(res){
        $scope.titles.splice(index, 1);
      });
    };

    Movie.all().then(function(res){
      res.data.movies.forEach(function(m){
        $scope.titles.push(m.movie);
      });
    });

  }]);
})();

