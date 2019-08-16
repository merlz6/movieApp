const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = Schema({
  Title: String,
  Year: String,
  Rated:String,
  Released:String,
  RunTime:String,
  Genre:String,
  Actors:String,
  Poster:String,
  Ratings:[]
});

const Movie = mongoose.model('Movie', movieSchema);

//export this file
module.exports = Movie;
