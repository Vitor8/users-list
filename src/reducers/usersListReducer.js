// Estado global da aplicação

const INITIAl_STATE = {
  usersArray: [],
};

const usersListReducer = (state = INITIAl_STATE, action) => {
  switch (action.type) {

  case 'ADD_USER':
    const newUser = {
      id: state.usersArray.length,
      name: action.payload.name,
      age: action.payload.age
    }
      
    const newStateADD = {
      ...state,
      usersArray: [ ...state.usersArray, newUser],
    }

  return newStateADD;

  default:
    return state;
  }
};

export default usersListReducer;
