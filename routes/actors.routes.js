const express = require('express');

//Controller
const {
  getAllActors,
  getActorsById,
  createActor,
  updateActor,
  deleteActor
} = require('../controllers/actors.controller');

const router = express.Router();

router.get('/', getAllActors);

router.get('/:id', getActorsById);

router.post('/', createActor);

router.patch('/:id', updateActor);

router.delete('/:id', deleteActor);

module.exports = { actorRouter: router };
