import { createSlice } from '@reduxjs/toolkit';
import {
  loadDepartment,
  saveDepartment,
  updateDepartment,
} from './department-async-thunk';


const initialState = {
  savingStatus: 'idle',
  loadingStatus: 'idle',
  department: {},
  countOfDepartments: 0,
  errors: null,
};

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    setDepartmentSavingStatus (state, action) {
      const { status } = action.payload;
      state.savingStatus = status;
    },
    setDepartmentLoadingStatus (state, action) {
      const { status } = action.payload;
      state.loadingStatus = status;
    },
  },
  extraReducers: {
    // saveDepartment extra reducer
    [saveDepartment.pending]: (state, action) => {
      state.savingStatus = 'loading';
    },
    [saveDepartment.rejected]: (state, action) => {
      state.savingStatus = 'failed';
      state.errors = action.error.message;
    },
    [saveDepartment.fulfilled]: (state, action) => {
      state.savingStatus = 'successed';
      state.department = action.payload.data;
    },

    // updateDepartmen extra reducer
    [updateDepartment.pending]: (state, action) => {
      state.savingStatus = 'loading';
    },
    [updateDepartment.rejected]: (state, action) => {
      state.savingStatus = 'failed';
      state.errors = action.error.message;
    },
    [updateDepartment.fulfilled]: (state, action) => {
      state.savingStatus = 'successed';
      state.department = action.payload.data;
    },

    // loadDepartment extra reducer
    [loadDepartment.pending]: (state, action) => {
      state.loadingStatus = 'loading';
    },
    [loadDepartment.rejected]: (state, action) => {
      state.loadingStatus = 'failed';
      state.errors = action.error.message;
    },
    [loadDepartment.fulfilled]: (state, action) => {
      state.loadingStatus = 'successed';
      state.department = action.payload.data;
    },
  },
});

export const { setDepartmentSavingStatus, setDepartmentLoadingStatus } = departmentSlice.actions;

export default departmentSlice.reducer;

export const getDepartmentSavingStatus = (state) => state.department.savingStatus;

export const getDepartmentLoadingStatus = (state) => state.department.loadingStatus;

export const getDepartment = (state) => state.department.department;
