import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import cbrReducer from './reducers/cbr';
import loadingReducer from './reducers/loading';

export const store = configureStore({
  reducer: {
    authReducer,
    cbrReducer,
    loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
