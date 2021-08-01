import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../util/const';

export const saveDepartment = createAsyncThunk(
  'newDepartment/save',
  async (newDepartmentData) => {
    const body = JSON.stringify({...newDepartmentData});
    const response = await fetch(`${API_URL}/department/department`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body,
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
  newDepartment: {},
  errors: null,
};

const newDepartmentSlice = createSlice({
  name: 'newDepartment',
  initialState,
  reducers: {
    setDepartmentStatus (state, action) {
      const { status } = action.payload;
      state.status = status;
    },
  },
  extraReducers: {
    // saveDepartment extra reducer
    [saveDepartment.pending]: (state, action) => {
      state.status = 'loading';
    },
    [saveDepartment.rejected]: (state, action) => {
      state.status = 'failed';
      state.errors = action.error.message;
    },
    [saveDepartment.fulfilled]: (state, action) => {
      state.status = 'successed';
      state.newDepartment = action.payload.data;
    }
  },
});

export const { setDepartmentStatus } = newDepartmentSlice.actions;

export default newDepartmentSlice.reducer;

export const getDepartmentStatus = (state) => state.newDepartment.status;
