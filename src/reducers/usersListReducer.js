// Estado global da aplicação

const INITIAl_STATE = {
  usersArray: [],
};

const usersListReducer = (state = INITIAl_STATE, action) => {
  switch (action.type) {
  case 'CREATE_USER': {
    return state;
  }

  default:
    return state;
  }
};

export default usersListReducer;
