'use strict'

import express from 'express';
import multer from 'multer';
import createThumbnail from '../../middlewares/upload.js';
import {getAllCats, postCat, getCatById, putCat, deleteCat, getCatsByUser} from  '../controllers/cat-controller.js'
import {authenticateToken} from '../../middlewares/authentication.js';

const upload = multer({dest: 'uploads/'})
const catRouter = express.Router();


catRouter.route('/').get(getAllCats).post(upload.single('file'), createThumbnail, postCat)
catRouter.route('/:id').get(getCatById).put(authenticateToken,upload.single('file'), createThumbnail, putCat).delete(authenticateToken,deleteCat);
catRouter.route('/user/:id').get(getCatsByUser)



export default catRouter;
