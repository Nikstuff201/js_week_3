'use strict';

import express from 'express';
import {
  getAllUsers, postUser, getUserById, putUser, deleteUser,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {validationErrors} from '../../middlewares/error-handlers.js';
import {body} from 'express-validator';


const userRouter = express.Router();

userRouter.route('/')
  .get(getAllUsers)
  .post(
    body('name').trim().isLength({min: 3, max: 20,}),
    body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 20,}).isAlphanumeric(),
    body('password').trim().isLength({min: 8}),
    body('role').trim().isIn(['admin', 'user']),
    validationErrors,
    postUser);

userRouter.route('/:id')
  .get(authenticateToken, getUserById)
  .put(
    authenticateToken,
    body('name').optional().trim().isLength({min: 3, max: 20,}),
    body('email').optional().trim().isEmail(),
    body('username').optional().trim().isLength({min: 3, max: 20,}).isAlphanumeric(),
    body('password').optional().trim().isLength({min: 8}),
    body('role').optional().trim().isIn(['admin', 'user']),
    validationErrors,
    putUser)
  .delete(authenticateToken, deleteUser);


export default userRouter;
