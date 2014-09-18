'use strict';

var Mongo = require('mongodb');

function Movie(){
}

Object.defineProperty(Movie, 'collection', {
    get: function(){ return global.mongodb.collection('movies');}
});


Movie.create= function(movie, cb){
  Movie.collection.save(movie, cb);
};

Movie.all = function(cb){
  Movie.collection.find().toArray(cb);
};

Movie.delete = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Movie.collection.remove({_id: _id}, cb);
};



module.exports = Movie;
