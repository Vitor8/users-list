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
      age: action.payload.age,
    }
      
    const newStateADD = {
      ...state,
      usersArray: [ ...state.usersArray, newUser],
    }

  return newStateADD;

  case 'REMOVE_USER':
    const newUsersArray = state.usersArray.filter((user) => user.id !== action.payload);

    const newStateREMOVE = {
      ...state,
      usersArray: newUsersArray,
    }

  return newStateREMOVE;

  case 'UPDATE_USER':
    const updatedUsersArray = [...state.usersArray];
    const index = updatedUsersArray.findIndex((user) => user.id === action.payload.userId);

    updatedUsersArray[index].name = action.payload.newName;
    updatedUsersArray[index].age = action.payload.newAge;

    const newStateUPDATED = {
      ...state,
      usersArray: updatedUsersArray,
    }

  return newStateUPDATED;

  default:
    return state;
  }
};

export default usersListReducer;
