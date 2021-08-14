// Third party libraries
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom';
// Components
import { DepartmentEdit } from '../Components/department-edit/Department-edit';
import { DepartmentForm } from '../Components/department-form/Department-form';
import { DepartmentsMain } from '../Components/departments-main/Departments-main';
import { Footer } from '../Components/footer/Footer';
import { Header } from '../Components/header/Header';
import { PageHeader } from '../Components/page-header/Page-header';
import { PageMenu } from '../Components/page-menu/Page-menu';
// Functions for work with state
import { getUserRole, checkAuth } from '../clientStore/authSlice/auth-sliice';
//Utils functions
import { IconNames } from '../util/utils';
import { PrivateRoute } from '../util/private-route';


export const Departments = ({ userName }) => {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const userRole = useSelector(getUserRole);
  const SectionNames = (userRole === 'admin') ? {
    departments: 'Departments',
    calculations: 'Calculations',
    users: 'Users'
  } : {
    departments: 'Departments',
    calculations: 'Calculations',
  };

  const settingsHeaderBtn = [
    {
      name: 'Change password'
    }
  ];

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [ dispatch ]);

  return(
    <div className='container'>
      <Header
        isLoginBtnShow={false}
      />
      <main className='main'>
        <PageHeader
          titleIcon={IconNames.USER}
          title={userName}
          btns={settingsHeaderBtn}
        />
        <PageMenu
          menuItems={SectionNames}
        />

        <Switch>
          <Route exact path={path}>
            <DepartmentsMain />
          </Route>
          <PrivateRoute path={`${path}/add`}>
            <DepartmentForm formType={'new'} />
          </PrivateRoute>
          <PrivateRoute path={`${path}/:departmentId`}>
            <DepartmentEdit />
          </PrivateRoute>
        </Switch>
      </main>
      <Footer />
    </div>
  );
};