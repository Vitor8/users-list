const ADD_USER = 'ADD_USER';

export const addUser = (name, age) => ({
  type: ADD_USER,
  payload: { name, age },
});
