import { createAsyncThunk } from '@reduxjs/toolkit';
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

export const getCountOfDepartments = createAsyncThunk(
  'departmentList/getCount',
  async () => {
    const response = await fetch(`${API_URL}/department/count`, {
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
      data,
    };
  }
);
