'use strict'

import express from 'express';
import multer from 'multer';
import {getAllCats, postCat, getCatById, putCat, deleteCat} from  '../controllers/cat-controller.js'

const upload = multer({dest: 'uploads/'})
const catRouter = express.Router();

catRouter.route('/').get(getAllCats).post(upload.single('file'),postCat)
catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat)



export default catRouter;
