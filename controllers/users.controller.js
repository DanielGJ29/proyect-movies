const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Models
const { User } = require('../models/users.model');

//Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError.js');
const { filterObj } = require('../util/filterObj');
const { password } = require('pg/lib/defaults');
const { Email } = require('../util/email');

dotenv.config({ path: '../config.env' });

//?All users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: 'password' },
    where: { status: 'active' }
  });

  res.status(200).json({
    status: 'success',
    data: { users }
  });
});

//?Get Users By Id
exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id: id, status: 'active' }
  });

  if (!user) {
    return next(new AppError(404, 'User not found'));
  }

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

//?Create User
exports.createUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return next(new AppError(400, 'Must provider a valid User'));
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
    role: role
  });

  newUser.password = undefined;

  //Sent msil to newly created account
  await new Email(email).send();

  res.status(201).json({
    status: 'success',
    data: { newUser }
  });
});

//?Update User
exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const data = filterObj(req.body, 'username', 'email', 'password', 'role');

  const user = await User.findOne({ where: { id: id } });

  if (!user) {
    return next(new AppError(404, 'Cant update user, invalid Id'));
  }

  await user.update({ ...data });

  res.status(204).json({
    status: 'success'
  });
});

//?Delete User
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id: id, status: 'active' }
  });

  if (!user) {
    return next(new AppError(404, 'Cant delete User, Invalid Id'));
  }

  await user.update({ status: 'delete' });

  res.status(204).json({
    status: 'success'
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email, status: 'active' }
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(404, 'Credentials are invalid'));
  }

  // const isPasswordValid = await bcrypt.compare(password, user.password);
  // if (!isPasswordValid) {
  //   return next(new AppError(400, 'Credentials are not valid'));
  // }

  //JWT
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  // jwt.verify(token, 'mySecretKey');

  res.status(200).json({
    status: 'success',
    data: { token }
  });
});
