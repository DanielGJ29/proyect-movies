const express = require('express');

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/users.controller');

//Middlewares
const { validateSession } = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.get('/', validateSession, getAllUsers);

router.get('/:id', validateSession, getUserById);

router.post('/', validateSession, createUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

router.post('/login', loginUser);

module.exports = { usersRouter: router };
