const { Actor } = require('../models/actors.model');

//Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');

//?Get all Actors
exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({
    where: { status: 'active' },
    attributes: { exclude: ['password'] }
  });

  res.status(200).json({
    status: 'success',
    data: { actors }
  });
});

//?Get Actors by Id
exports.getActorsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({
    where: { id },
    attributes: { exclude: ['password'] }
  });

  if (!actor) {
    return next(new AppError(404, 'Actors not found'));
  }

  res.status(200).json({
    status: 'success',
    data: { actor }
  });
});

//?Save new Actor
exports.createActor = catchAsync(async (req, res, next) => {
  const { name, country, rating, age, profilePic } = req.body;
  //console.log(name);
  if (!name || !country || !rating || !age || !profilePic) {
    return next(new AppError(400, 'Must provider a valid actor'));
  }

  const newActor = await Actor.create({
    name: name,
    country: country,
    rating: rating,
    age: age,
    profilePic: profilePic
  });

  res.status(201).json({
    status: 'success',
    data: { newActor }
  });
});

//?Update Actors
exports.updateActor = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const data = filterObj(req.body, 'name', 'country', 'rating', 'age');

  const actors = await Actor.findOne({ where: { id: id } });

  if (!actors) {
    res.status(404).json({
      status: 'error',
      message: 'Cant update actors, invalid Id'
    });
    return;
  }

  await actors.update({ ...data });

  res.status(204).json({
    status: 'success'
  });
});

exports.deleteActor = catchAsync(async (req, res) => {
  const { id } = req.params;

  const actor = await Actor.findOne({
    where: { id: id, status: 'active' }
  });

  if (!actor) {
    res.status(404).json({
      status: 'error',
      message: 'Cant delete Actor, Invalid Id'
    });
    return;
  }

  await actor.update({ status: 'deleted' });

  res.status(204).json({
    status: 'success'
  });
});
