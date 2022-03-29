const express = require('express');

//Controller
const {
  getAllMovies,
  getMoviesById,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movies.controller');

const router = express.Router();

router.get('/', getAllMovies);

router.get('/:id', getMoviesById);

router.post('/', createMovie);

router.patch('/:id', updateMovie);

router.delete('/:id', deleteMovie);

module.exports = { movieRouter: router };
