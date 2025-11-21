'use strict';


import express from 'express';
import {createThumbnail, upload} from '../../middlewares/upload.js';
import {
  getAllCats, postCat, getCatById, putCat, deleteCat, getCatsByUser,
} from '../controllers/cat-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrors} from '../../middlewares/error-handlers.js';


const catRouter = express.Router();


catRouter.route('/')
  .get(getAllCats)
  .post(
    upload.single('file'),
    body('cat_name').trim().isLength({min: 3, max: 20,}),
    body('weight').trim().isFloat({min: 0.1, max: 20.0,}),
    body('owner').trim().isInt(),
    body('birthdate').isISO8601(),
    validationErrors,
    createThumbnail,
    postCat);

catRouter.route('/:id')
  .get(getCatById)
  .put(
    authenticateToken,
    upload.single('file'),
    body('cat_name').optional().trim().isLength({min: 3, max: 20,}),
    body('weight').optional().trim().isFloat({min: 0.1, max: 20.0,}),
    body('owner').optional().trim().isInt(),
    body('birthdate').optional().trim().isISO8601(),
    validationErrors,
    createThumbnail,
    putCat)
  .delete(
    authenticateToken,
    deleteCat);

catRouter.route('/user/:id').get(getCatsByUser);


export default catRouter;
