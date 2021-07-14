import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../util/const';

export const loadUsers = createAsyncThunk(
  'users/getUsers',
  async (companyId) => {
    const body = JSON.stringify({ companyId });
    console.log(body);
    const response = await fetch(`${API_URL}/user/users`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body
    });
    const data = await response.json();
    return {
      status: response.status,
      data,
    }
  }
);

const initialState = {
  status: 'idle',
  userList: [],
  errors: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
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
    }
  },
});
//
export default usersSlice.reducer;

export const getProcessUsersLoading = (state) => state.users.status;
export const getUsersError = (state) => state.users.errors;
export const getUsers = (state) => state.users.userList;
