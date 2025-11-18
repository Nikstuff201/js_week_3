import promisePool from '../../utils/database.js';

'use strict';

const listAllCats = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_cats');
  console.log('rows', rows);
  return rows;
};

const addCat = async (cat, filename) => {
  const {cat_name, weight, owner, birthdate} = cat;
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename, birthdate];
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {cat_id: rows[0].insertId};
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute('SELECT wsk_cats.cat_id, wsk_cats.cat_name, wsk_cats.weight, wsk_users.username AS owner FROM wsk_cats INNER JOIN wsk_users ON wsk_cats.owner=wsk_users.user_id WHERE cat_id = ?', [id]);
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const updateCat = async (cat, id) => {
  const sql = promisePool.format(`UPDATE wsk_cats
                                  SET ?
                                  WHERE cat_id = ?`, [cat, id]);
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeCat = async (id) => {
  const [rows] = await promisePool.execute('DELETE FROM wsk_cats WHERE cat_id = ?', [id]);
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const getUserCats = async (id) => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_cats WHERE owner = ?', [id]);
  console.log('rows', rows)
  return rows
};

export {listAllCats, addCat, updateCat, removeCat, findCatById, getUserCats};
