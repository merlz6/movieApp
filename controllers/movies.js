const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.js');

router.get('/', (req, res) => {
  Movie.find({}, (error, foundMovie) => {
    res.json(foundMovie)
  })
})
router.delete('/:id', (req, res) => {
  Movie.findByIdAndRemove(req.params.id, (error, deletedMovie) => {
    res.json(deletedMovie)
  })
})
router.put('/:id', (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedMovie) => {
    res.json(updatedMovie)
  })
})

router.post('/', (req, res) => {
  Movie.create(req.body, (error, createdMovie) => {
    res.json(createdMovie)
  })
})

module.exports = router;
