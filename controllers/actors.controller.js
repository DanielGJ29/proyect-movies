const { Actor } = require('../models/actors.model');

//Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

//?Get all Actors
exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({
    where: { status: 'active' }
    // attributes: { exclude: ['password'] },
  });

  res.status(200).json({
    status: 'success',
    data: { data }
  });
});

//?Get user by Id
exports.getActorsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({ where: { id } });

  if (!user) {
    return next(new AppError(404, 'User not found'));
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

//?Update post put
// exports.updateActorPut = catchAsync(async(req,res,next)=>{

// });
// exports.updateActor = catchAsync(async (req, res) => {});

// exports.deleteActor = catchAsync(async (req, res) => {});
