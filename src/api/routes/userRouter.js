'use strict'

import express from 'express';
import {getAllUsers, postUser, getUserById, putUser, deleteUser} from  '../controllers/user-controller.js'
import {authenticateToken} from '../../middlewares/authentication.js';

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(postUser)
userRouter.route('/:id').get(authenticateToken,getUserById).put(authenticateToken,putUser).delete(authenticateToken,deleteUser)



export default userRouter;
