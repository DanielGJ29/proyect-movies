const express = require('express');

//Controller
const {
  getAllActors,
  getActorsById,
  createActor
} = require('../controllers/actors.controller');

const router = express.Router();

router.get('/', getAllActors);

router.get('/', getActorsById);

router.post('/', createActor);

module.exports = { actorRouter: router };
