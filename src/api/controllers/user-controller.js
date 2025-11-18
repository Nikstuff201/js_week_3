'use strict'

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
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201).json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const putUser = async (req, res) => {
  console.log('Form data:', req.body);
  const result = await findUserById(req.params.id);
  if (result) {
    const message = await updateUser(result.user_id, req.body);
    res.status(200).json(message);
  } else {
    res.sendStatus(404);
  }
};

const deleteUser = async (req, res) => {
  const result = await findUserById(req.params.id);
  if (result) {
    const message = await removeUser(result.user_id);
    res.status(200).json(message);
  } else {
    res.sendStatus(404);
  }
};

export {getAllUsers, getUserById, postUser, putUser, deleteUser};
