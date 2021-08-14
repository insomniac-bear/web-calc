import { createSlice } from '@reduxjs/toolkit';
import { loadUsers, saveUser } from './users-async-thunk';

const initialState = {
  status: 'idle',
  userList: [],
  errors: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersLoadingProcess (state, action) {
      const { status } = action.payload;
      state.status = status;
    },
  },
  extraReducers: {
    // getUsers extra reducer
    [loadUsers.pending]: (state, action) => {
      state.status = 'loading';
    },
    [loadUsers.rejected]: (state, action) => {
      state.status = 'failed';
      state.errors = action.error.message;
    },
    [loadUsers.fulfilled]: (state, action) => {
      state.status = 'successed';
      state.userList = action.payload.data;
    },
    // saveUser extra reducer
    [saveUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [saveUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.errors = action.error.message;
    },
    [saveUser.fulfilled]: (state, action) => {
      state.status = 'successed';
      state.errors = action.payload;
    },
  },
});

export const { setUsersLoadingProcess } = usersSlice.actions;

export default usersSlice.reducer;

export const getProcessUsersLoading = (state) => state.users.status;
export const getUsersError = (state) => state.users.errors;
export const getUsers = (state) => state.users.userList;
