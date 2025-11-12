'use strict'

import {
  listAllUsers,
  findUserById,
  addUser,
  updateUser,
  removeUser,
} from '../models/user-model.js';

const getAllUsers = (req, res) => {
  res.json(listAllUsers());
};

const postUser = (req, res) => {
  const result = addUser(req.body);
  if (result.user_id) {
    res.status(201).json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const getUserById = (req, res) => {
  const user = findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const putUser = (req, res) => {
  const result = findUserById(req.params.id);
  if (result) {
    const message = updateUser(result.user_id, req.body);
    res.status(200).json(message);
  } else {
    res.sendStatus(404);
  }
};

const deleteUser = (req, res) => {
  const result = findUserById(req.params.id);
  if (result) {
    const message = removeUser(result.cat_id);
    res.status(200).json(message);
  } else {
    res.sendStatus(404);
  }
};

export {getAllUsers, getUserById, postUser, putUser, deleteUser};
