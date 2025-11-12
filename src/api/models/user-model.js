'use strict';

const userItems = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  }];

const listAllUsers = () => {return userItems;};

const addUser = (user) => {
  const {name, username, email, role, password} = user;
  const newId = userItems[0].user_id + 1;
  userItems.unshift({user_id: newId, name, username, email, role, password});
  return {user_id: newId};
}

const findUserById = (id) => {
  return userItems.find(user => user.user_id === parseInt(id));
}

const updateUser = (id, user) => {
  for (let i=0; i<=userItems.length; i++){
    if (parseInt(id) === userItems[i].user_id){
      userItems.splice(i,1);
      const {name, username, email, role, password} = user;
      userItems[i]={user_id: id, name, username, email, role, password};
      return {message: 'User item updated.'}
    }
  }
}

const removeUser = (id) => {
  const index = userItems.findIndex(user => user.user_id === parseInt(id));
  userItems.splice(index, 1);
  return {message: 'User item deleted.'}
}

export {listAllUsers, addUser, updateUser, removeUser, findUserById};
