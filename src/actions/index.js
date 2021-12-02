const ADD_USER = 'ADD_USER';
const REMOVE_USER = 'REMOVE_USER';

export const addUser = (name, age) => ({
  type: ADD_USER,
  payload: { name, age },
});

export const removeUser = (userId) => ({
  type: REMOVE_USER,
  payload: userId,
});
