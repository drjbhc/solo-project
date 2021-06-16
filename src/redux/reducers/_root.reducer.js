import { combineReducers } from 'redux';
import user from './user.reducer';
import errors from './errors.reducer';

import homeReducer from './homepage.reducer';
import artifactReducer from './artifacts.reducer';
import connectionReducer from './connections.reducer';
import userListReducer from './userlist.reducer';

const rootReducer = combineReducers({
    user,
    errors,
    homeReducer,
    artifactReducer,
    connectionReducer,
    userListReducer,
});

export default rootReducer;