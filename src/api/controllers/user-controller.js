'use strict';

import bcrypt from 'bcrypt';
import {
  listAllUsers,
  findUserById,
  addUser,
  updateUser,
  removeUser,
} from '../models/user-model.js';


const getAllUsers = async (req, res) => {
  res.json(await listAllUsers());
};

const postUser = async (req, res) => {
  console.log('Form data:', req.body);
  console.log('File data:', req.file);
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const result = await addUser(req.body);
  res.status(201).json({message: 'New user added.', result});
};

const getUserById = async (req, res, next) => {
  const user = await findUserById(req.params.id);
  if (user) {
    if (res.locals.user.user_id !== user.user_id && res.locals.user.role !== 'admin') {
      const error = new Error('Forbidden');
      error.status = 403;
      return next(error);
    } else {
      res.json(user);
    }
  } else {
    const error = new Error('User not found');
    error.status = 404;
    return next(error);
  }
};

const putUser = async (req, res, next) => {
  console.log('Form data:', req.body);
  const result = await findUserById(req.params.id);
  if (result) {
    if (res.locals.user.user_id !== result.user_id && res.locals.user.role !== 'admin') {
      const error = new Error('Forbidden');
      error.status = 403;
      return next(error);
    } else {
      const message = await updateUser(result.user_id, req.body);
      res.status(200).json(message);
    }
  } else {
    const error = new Error('User not found');
    error.status = 404;
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const result = await findUserById(req.params.id);
  if (result) {
    if (res.locals.user.user_id !== result.user_id && res.locals.user.role !== 'admin') {
      const error = new Error('Forbidden');
      error.status = 403;
      return next(error);
    } else {
      const message = await removeUser(result.user_id);
      res.status(200).json(message);
    }
  } else {
    const error = new Error('User not found');
    error.status = 404;
    return next(error);
  }
};

export {getAllUsers, getUserById, postUser, putUser, deleteUser};
