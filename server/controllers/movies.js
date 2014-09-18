'use strict';

var Movie = require('../models/movie');

exports.new = function(req, res){
  console.log(req.body);
  Movie.create(req.body, function(err, movie){
    res.status(200).end();
  });
};

exports.index = function(req, res){
  Movie.all(function(err, movies){
    res.send({movies: movies});
  });
};

exports.delete = function(req, res){
  Movie.delete(req.body.id, function(err, movie){
    res.status(200).end();
  });
};
