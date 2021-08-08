import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchedData } from '../../util/utils';
import { API_URL } from '../../util/const';

export const saveDepartment = createAsyncThunk(
  'department/save',
  async (newDepartmentData) => await fetchedData('department/department', 'POST', { ...newDepartmentData })
);

export const updateDepartment = createAsyncThunk(
  'department/update',
  async (updateDepartment) => {
    const body = JSON.stringify(updateDepartment);
    const response = await fetch(`${API_URL}/department/update`, {
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

export const loadDepartment = createAsyncThunk(
  'department/getDepartment',
  async (id) => {
    const body = JSON.stringify({ id });
    const response = await fetch(`${API_URL}/department/getDepartment`, {
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
