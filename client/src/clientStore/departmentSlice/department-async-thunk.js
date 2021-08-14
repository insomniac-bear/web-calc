import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchedData } from '../../util/utils';

export const saveDepartment = createAsyncThunk(
  'department/save',
  async (newDepartmentData) => await fetchedData('department/department', 'POST', { ...newDepartmentData })
);

export const updateDepartment = createAsyncThunk(
  'department/update',
  async (updateDepartment) => await fetchedData('/department/update', 'POST', updateDepartment)
);

export const loadDepartment = createAsyncThunk(
  'department/getDepartment',
  async (id) => await fetchedData('department/getDepartment', 'POST', { id })
);
