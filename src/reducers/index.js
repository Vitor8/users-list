import { combineReducers } from 'redux';

import usersListReducer from './usersListReducer';

const rootReducer = combineReducers({
  usersListReducer,
});

export default rootReducer;
