'use strict'

import express from 'express';
import {getAllCats, postCat, getCatById, putCat, deleteCat} from  '../controllers/cat-controller.js'

const catRouter = express.Router();

catRouter.route('/').get(getAllCats).post(postCat)
catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat)



export default catRouter;
