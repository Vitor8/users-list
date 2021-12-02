const CREATE_USER = 'CREATE_USER';

export const checkSessionStorage = (usersArray) => ({
  type: CREATE_USER,
  payload: usersArray,
});
