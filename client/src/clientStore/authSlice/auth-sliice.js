import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../util/const';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData) => {
    const body = JSON.stringify(loginData);
    const response = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
    const data = await response.json();
    return {
      status: response.status,
      data,
    };
  }
);

export const logoutUser = createAsyncThunk(
  `auth/logoutUser`,
  async () => {
    const response = await fetch(`${API_URL}/user/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return {
      status: response.status,
      data
    };
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async () => {
    const response = await fetch(`${API_URL}/user/refresh`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return {
      status: response.status,
      data,
    };
  }
);

const initialState = {
  isAuthenticated: false,
  status: 'idle',
  token: '',
  user: {},
  errors: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    // Login extra reduser
    [loginUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [loginUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.errors = action.error.message;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = 'successed';
      state.user = action.payload.data.user;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.data.accessToken);
    },

    // Logout extra reducer
    [logoutUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [logoutUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.errors = action.error.message;
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.status = 'successed';
      state.user = {};
      state.status = 'idle';
      state.isAuthenticated = false;
      state.errors = null;
      localStorage.removeItem('token');
    },
    // CheckAuth extra reducer
    [checkAuth.pending]: (state, action) => {
      state.status = 'loading';
    },
    [checkAuth.rejected]: (state, action) => {
      state.status = 'failed';
      state.errors = action.error.message;
    },
    [checkAuth.fulfilled]: (state, action) => {
      state.status = 'successed';
      if (action.payload.status === 200) {
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.data.accessToken);
      } else {
        state.user = {};
        state.status = 'idle';
        state.isAuthenticated = false;
        state.errors = null;
        localStorage.removeItem('token');
      }
    },
  },
});

export default authSlice.reducer;

export const getAuthenticatedStatus = (state) => state.auth.isAuthenticated;
export const getProcessAuthStatus = (state) => state.auth.status;
export const getAuthError = (state) => state.auth.errors;
export const getCompanyId = (state) => state.auth.user.companyId;
export const getUserId = (state) => state.auth.user.id;
export const getUserRole = (state) => state.auth.user.role;
export const getUserName = (state) => state.auth.user.login;
