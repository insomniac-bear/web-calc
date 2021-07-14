import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice/auth-sliice';
import companyReducer from './companySlice/company-slice';
import usersReducer from './usersSlice/user-slice';

export default configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    users: usersReducer,
  }
});
