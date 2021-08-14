import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchedData } from '../../util/utils';

export const loadUsers = createAsyncThunk(
  'users/getUsers',
  async (companyId) => await fetchedData('user/users', 'POST', { companyId })
);

export const saveUser = createAsyncThunk(
  'users/saveUser',
  async (newUserData) => await fetchedData('user/registration', 'POST', { ...newUserData })
);
