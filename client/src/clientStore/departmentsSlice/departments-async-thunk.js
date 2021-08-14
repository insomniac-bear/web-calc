import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchedData } from '../../util/utils';

export const loadDepartments = createAsyncThunk(
  'departmentList/getDepartments',
  async () => await fetchedData('department/departments', 'GET')
);

export const getCountOfDepartments = createAsyncThunk(
  'departmentList/getCount',
  async () => await fetchedData('department/count', 'GET')
);
