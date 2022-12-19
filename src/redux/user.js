
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
//
import { dispatch } from './store';

const initialState = {
  isLoading: false,
  error: null,
  users: [],
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET USERS SUCCESS
    getUsersSuccess(state, action) {
      state.users = action.payload;
    },

    // DELETE USER 
    deleteUser(state, action) {
      const updateUsers = state.users.filter((user) => user.login.uuid !== action.payload);
      state.users = updateUsers;
    },

    // ADD USER 
    addUser(state, action) {
      state.users.push(action.payload)
    },

    // UPDATE USER 
    updateUser(state, action) {
      const updateUsers =  state.users.map(user => user.login.uuid !== action.payload.login.uuid ? user : action.payload);
      state.users = updateUsers;
    }
  }
});

// ----------------------------------------------------------------------


export default userReducer.reducer

// Actions
export const {
  deleteUser,
  addUser,
  updateUser
} = userReducer.actions;

export function getUsers() {
  return async () => {
    dispatch(userReducer.actions.startLoading());
    try {
      const response = await axios.get('https://randomuser.me/api/?results=10');
      dispatch(userReducer.actions.getUsersSuccess(response.data.results));
    } catch (error) {
      dispatch(userReducer.actions.hasError(error));
    }
  };
}