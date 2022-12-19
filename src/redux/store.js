import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user.js'
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';


const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})

const { dispatch } = store;
const useSelector = useAppSelector;
const useDispatch = () => useAppDispatch();

export { store, dispatch, useDispatch, useSelector };
