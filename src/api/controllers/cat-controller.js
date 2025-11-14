import {
  listAllCats,
  findCatById,
  addCat,
  updateCat,
  removeCat,
} from '../models/cat-model.js';


const getAllCats = async (req, res) => {
  const cats = await listAllCats();
  res.json(cats);
};

const postCat = async (req, res) => {
  console.log('Form data:', req.body);
  console.log('File data:', req.file);
  const result = await addCat(req.body, req.file.filename);
  if (result.cat_id) {
    res.status(201).json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const putCat = async (req, res) => {
  const result = await findCatById(req.params.id);
  if (result) {
    const message = await updateCat(result.cat_id, req.body);
    res.status(200).json(message);
  } else {
    res.sendStatus(404);
  }
};

const deleteCat = async (req, res) => {
  const result = await findCatById(req.params.id);
  if (result) {
    const message = await removeCat(result.cat_id);
    res.status(200).json(message);
  } else {
    res.sendStatus(404);
  }
};

export {getAllCats, getCatById, postCat, putCat, deleteCat};
