import {
  listAllCats,
  findCatById,
  addCat,
  updateCat,
  removeCat,
  getUserCats,
} from '../models/cat-model.js';


const getAllCats = async (req, res) => {
  const cats = await listAllCats();
  res.json(cats);
};

const postCat = async (req, res, next) => {
  console.log('Form data:', req.body);
  console.log('File data:', req.file);
  if (!req.file) {
    const error = new Error('Invalid or missing file');
    error.status = 400;
    return next(error);
  }
  const result = await addCat(req.body, req.file.filename);
  res.status(201).json({message: 'New cat added.', result});
};

const getCatById = async (req, res, next) => {
  const cat = await findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    const error = new Error('Missing cat');
    error.status = 404;
    return next(error);
  }
};

const putCat = async (req, res, next) => {
  console.log('Form data:', req.body);
  if (!req.file) {
    const error = new Error('Invalid or missing file');
    error.status = 400;
    return next(error);
  }
  const result = await findCatById(req.params.id);
  if (result) {
    if (res.locals.user.user_id !== result.owner_Id && res.locals.user.role !== 'admin') {
      const error = new Error('Forbidden.');
      error.status = 403;
      return next(error);
    } else {
      const message = await updateCat(req.body, result.cat_id);
      res.status(200).json(message);
    }
  } else {
    const error = new Error('Cat not found');
    error.status = 404;
    return next(error);
  }
};

const deleteCat = async (req, res, next) => {
  const result = await findCatById(req.params.id);
  if (result) {
    if (res.locals.user.user_id !== result.owner_Id && res.locals.user.role !== 'admin') {
      const error = new Error('Forbidden.');
      error.status = 403;
      return next(error);
    } else {
      const message = await removeCat(result.cat_id);
      res.status(200).json(message);
    }
  } else {
    const error = new Error('Cat not found');
    error.status = 404;
    return next(error);
  }
};

const getCatsByUser = async (req, res) => {
  const result = await getUserCats(req.params.id);
  res.json(result);
};

export {getAllCats, getCatById, postCat, putCat, deleteCat, getCatsByUser};
