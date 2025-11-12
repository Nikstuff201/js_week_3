'use strict';

const cats = [{
  cat_id: 1,
  name: 'Murka',
  birthdate: '2025-11-01',
  weight: 25,
  owner: 'Nikita',
  image: 'https://loremflickr.com/320/240/cat',
}];

const listAllCats = () => {return cats}

const addCat = (cat) => {
  const {name, birthdate, weight, owner, image} = cat;
  const newId = cats[0].cat_id + 1;
  cats.unshift({cat_id: newId, name, birthdate, weight, owner, image});
  return {cat_id: newId};
}

const findCatById = (id) => {
  return cats.find(cat => cat.cat_id === parseInt(id));
}

const updateCat = (id, data) => {
  for (let i=0; i<=cats.length; i++){
    if (parseInt(id) === cats[i].cat_id){
      cats.splice(i,1);
      const {name, birthdate, weight, owner, image} = data;
      cats[i]={cat_id: id, name, birthdate, weight, owner, image};
      return {message: 'Cat item updated.'}
    }
  }
}

const removeCat = (id) => {
  const index = cats.findIndex(cat => cat.cat_id === parseInt(id));
  cats.splice(index, 1);
  return {message: 'Cat item deleted.'}
}

export {listAllCats, addCat, updateCat, removeCat, findCatById};
