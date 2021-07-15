import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../util/const';

export const loadCompany = createAsyncThunk(
  'company/loadCompany',
  async (companyId) => {
    const body = JSON.stringify({ companyId });
    const response = await fetch(`${API_URL}/companies/company`, {
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
)

const initialState = {
  status: 'idle',
  companyName: '',
  errors: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  extraReducers: {
    // loadCompany extra reducer
    [loadCompany.pending]: (state, action) => {
      state.status = 'loading';
    },
    [loadCompany.rejected]: (state, action) => {
      state.status = 'failed';
      state.errors = action.error.message;
    },
    [loadCompany.fulfilled]: (state, action) => {
      state.status = 'successed';
      state.companyName = action.payload.data[0].companyName;
    },
  },
});

export default companySlice.reducer;

export const getCompany = (state) => state.company.companyName;
