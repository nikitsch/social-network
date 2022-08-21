import {combineReducers, legacy_createStore as createStore} from 'redux';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';

let reducers = combineReducers ({
  profileReducer: profileReducer,
  dialogsReducer: dialogsReducer,
  sidebarReducer: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer
})

let store = createStore(reducers);

window.store = store;

export default store;