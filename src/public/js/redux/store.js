import { reducer as formReducer } from 'redux-form';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './AuthSlice';
import postReducer from './PostSlice';
import userReducer from './UserSlice';
import chatReducer from './ChatSlice';
import notificationReducer from './NotificationSlice';

const allReducers = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  post: postReducer,
  form: formReducer,
  user: userReducer,
  chat: chatReducer,
});

const rootReducer = (state, action) => {
  // eslint-disable-next-line no-param-reassign
  if (action.type === 'RESET_APP_STATE') state = undefined;
  return allReducers(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
