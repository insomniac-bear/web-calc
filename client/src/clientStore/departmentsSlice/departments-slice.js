import { createSlice } from '@reduxjs/toolkit';
import { loadDepartments, getCountOfDepartments } from './departments-async-thunk';

const initialState = {
  status: 'idle',
  departments: [],
  count: 0,
  errors: null,
};

const departmentListSlice = createSlice({
  name: 'departmentList',
  initialState,
  reducers: {
    setDepartmentsLoadingStatus (state, action) {
      const { status } = action.payload;
      state.status = status;
    },
  },
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

    // getCountOfDepartments extra reducer
    [getCountOfDepartments.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getCountOfDepartments.rejected]: (state, action) => {
      state.status = 'failed';
      state.errors = action.error.message;
    },
    [getCountOfDepartments.fulfilled]: (state, action) => {
      state.status = 'successed';
      state.count = action.payload.data;
    },
  },
});

export const { setDepartmentsLoadingStatus } = departmentListSlice.actions;

export default departmentListSlice.reducer;

export const getProcessDepartmentsLoading = (state) => state.departmentList.status;
export const getDepartments = (state) => state.departmentList.departments;
export const getDepartmentsCount = (state) => state.departmentList.count;
