import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice/auth-sliice';
import companyReducer from './companySlice/company-slice';
import departmentListReducer from './departmentsSlice/departments-slice';
import departmentReducer from './departmentSlice/department-slice'
import usersReducer from './usersSlice/user-slice';

export default configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    departmentList: departmentListReducer,
    department: departmentReducer,
    users: usersReducer,
  }
});
