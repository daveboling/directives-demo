(function(){
  'use strict';

  angular.module('directives-demo')
  .factory('Movie', ['$http', function($http){

    function all(){
      return $http.get('/movies');
    }

    function create(movie){
      return $http.post('/movie/new', {movie: movie});
    }

    function remove(id){
      return $http.delete('/movie/delete/'+id);
    }

    return {create: create, all: all, remove: remove};
  }]);
})();

