import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { authAPI } from './api/authAPI';
import { getMeAPI } from './api/getMeAPI';
import userReducer from './api/userSlice';
import { itemAPI } from './api/itemAPI';
import { userAPI } from './api/userAPI';
import { itemRequestAPI } from './api/itemRequestAPI';
import { dashboardAPI } from './api/dashboardAPI';

export const store = configureStore({
    reducer: {
      [authAPI.reducerPath]: authAPI.reducer,
      [getMeAPI.reducerPath]: getMeAPI.reducer,
      [itemAPI.reducerPath]: itemAPI.reducer,
      [itemRequestAPI.reducerPath]: itemRequestAPI.reducer,
      [userAPI.reducerPath]: userAPI.reducer,
      [dashboardAPI.reducerPath]: dashboardAPI.reducer,

      userState: userReducer,
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([
        authAPI.middleware,
        getMeAPI.middleware,
        itemAPI.middleware,
        itemRequestAPI.middleware,
        userAPI.middleware,
        dashboardAPI.middleware,
      ])
  });
  
  export var RootState = store.getState();
  export var AppDispatch = store.dispatch;
  export function useAppDispatch() {
    return useDispatch(AppDispatch);
  }
  export function useAppSelector(selector) {
    return useSelector(selector);
  }
  