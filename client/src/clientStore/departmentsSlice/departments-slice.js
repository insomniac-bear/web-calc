import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../util/const';

export const loadDepartments = createAsyncThunk(
  'departmentList/getDepartments',
  async () => {
    const response = await fetch(`${API_URL}/department/departments`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const data = await response.json();
    return {
      status: response.status,
      data
    }
  }
);

const initialState = {
  status: 'idle',
  departments: [],
  errors: null,
};

const departmentListSlice = createSlice({
  name: 'departmentList',
  initialState,
  extraReducers: {
    // getDepartments extra reducer
    [loadDepartments.pending]: (state, action) => {
      state.status = 'loading';
    },
    [loadDepartments.rejected]: (state, action) => {
      state.status = 'failed';
      state.errors = action.error.message;
    },
    [loadDepartments.fulfilled]: (state, action) => {
      state.status = 'successed';
      state.departments = action.payload.data;
    },
    },
  },
);

export default departmentListSlice.reducer;

export const getProcessDepartmentsLoading = (state) => state.departmentList.status;
export const getDepartments = (state) => state.departmentList.departments;
