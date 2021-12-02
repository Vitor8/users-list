const CHECK_SESSION_STORAGE = 'CHECK_SESSION_STORAGE';
const ADD_USER = 'ADD_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_USER = 'UPDATE_USER';

export const checkSessionStorage = (usersArray) => ({
  type: CHECK_SESSION_STORAGE,
  payload: usersArray,
});

export const addUser = (name, age) => ({
  type: ADD_USER,
  payload: { name, age },
});

export const removeUser = (userId) => ({
  type: REMOVE_USER,
  payload: userId,
});

export const updateUser = ({ userId, newName, newAge }) => ({
  type: UPDATE_USER,
  payload: { userId, newName, newAge }
})