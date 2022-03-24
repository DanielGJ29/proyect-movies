const { ActorInMovie } = require('../models/actorinMovie.model');
const { Actor } = require('../models/actors.model');
const { Movie } = require('../models/movies.model');
const { Review } = require('../models/review.model');
const { User } = require('../models/users.model');

const initModel = () => {
  //1 User <---> M Review
  User.hasMany(Review);
  Review.belongsTo(User);

  //1 Movie <---> M Review
  Movie.hasMany(Review);
  Review.belongsTo(Movie);

  //M Movie <---> M Actor
  Movie.belongsToMany(Actor, { through: ActorInMovie });
  Actor.belongsToMany(Movie, { through: ActorInMovie });
};

module.exports = { initModel };
