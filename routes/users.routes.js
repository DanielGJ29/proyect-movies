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
const {
  validateSession,
  protectAdmin
} = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.post('/login', loginUser);

router.post('/', validateSession, createUser);

router.use(validateSession);

router.get('/', protectAdmin, getAllUsers);

router.get('/:id', getUserById);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = { usersRouter: router };
