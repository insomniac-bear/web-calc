import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  newDepartment: {
    version: 0,
    departmentName: '',
    rates: [{}],
  },
  errors: null,
};

const newDepartmentSlice = createSlice({
  name: 'newDepartment',
  initialState,
  reducers: {
    addNewRate: {
      reducer(state, action) {
        state.newDepartment.rates.push(action.payload);
      },
      prepare() {
        return {
          payload: {}
        }
      },
    },
    changeRateName(state, action) {
      console.log(action);
      state.newDepartment.rates[action.payload.index] = action.payload.value;
    },
  },
});

export const { addNewRate, changeRateName } = newDepartmentSlice.actions;

export default newDepartmentSlice.reducer;

export const getRates = (state) => state.newDepartment.newDepartment.rates;
export const getFirstRate = (state) => state.newDepartment.newDepartment.rates[0];
