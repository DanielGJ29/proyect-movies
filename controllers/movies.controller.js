const { Movie } = require('../models/movies.model');

//Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');

//?Get all Actors
exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({
    where: { status: 'active' }
    // attributes: { exclude: ['password'] },
  });

  res.status(200).json({
    status: 'success',
    data: { movies }
  });
});

//?Get Movies by Id
exports.getMoviesById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({ where: { id } });

  if (!movie) {
    return next(new AppError(404, 'Movie not found'));
  }

  res.status(200).json({
    status: 'success',
    data: { movie }
  });
});

//?Save new movie
exports.createMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, rating, img, genre } = req.body;
  //console.log(name);
  if (!title || !description || !duration || !rating || !img || !genre) {
    return next(new AppError(400, 'Must provider a valid movie'));
  }

  const newMovie = await Movie.create({
    title,
    description,
    duration,
    rating,
    img,
    genre
  });

  res.status(201).json({
    status: 'success',
    data: { newMovie }
  });
});

//?Update Movie
exports.updateMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const data = filterObj(req.body, 'title', 'description', 'rating', 'img');

  const movies = await Movie.findOne({ where: { id: id } });

  if (!movies) {
    res.status(404).json({
      status: 'error',
      message: 'Cant update Movie, invalid Id'
    });
    return;
  }

  await movies.update({ ...data });

  res.status(204).json({
    status: 'success'
  });
});

exports.deleteMovie = catchAsync(async (req, res) => {
  const { id } = req.params;

  const movie = await Movie.findOne({
    where: { id: id, status: 'active' }
  });

  if (!movie) {
    res.status(404).json({
      status: 'error',
      message: 'Cant delete Movie, Invalid Id'
    });
    return;
  }

  await movie.update({ status: 'deleted' });

  res.status(204).json({
    status: 'success'
  });
});
