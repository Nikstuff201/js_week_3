import {
  listAllCats,
  findCatById,
  addCat,
  updateCat,
  removeCat,
} from '../models/cat-model.js';

const getAllCats = (req, res) => {
  res.json(listAllCats());
};

const postCat = (req, res) => {
  const result = addCat(req.body);
  if (result.cat_id) {
    res.status(201).json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const putCat = (req, res) => {
  const result = findCatById(req.params.id);
  if (result) {
    const message = updateCat(result.cat_id, req.body);
    res.status(200).json(message);
  } else {
    res.sendStatus(404);
  }
};

const deleteCat = (req, res) => {
  const result = findCatById(req.params.id);
  if (result) {
    const message = removeCat(result.cat_id);
    res.status(200).json(message);
  } else {
    res.sendStatus(404);
  }
};

export {getAllCats, getCatById, postCat, putCat, deleteCat};
