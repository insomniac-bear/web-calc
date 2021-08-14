// Third party libraries
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Switch,
  useRouteMatch
} from 'react-router-dom';
// Components
import { CreateUserForm } from '../Components/create-user-form/Create-user-form';
import { Footer } from '../Components/footer/Footer'
import { Header } from '../Components/header/Header';
import { PageHeader } from '../Components/page-header/Page-header';
import { PageMenu } from '../Components/page-menu/Page-menu';
import { UsersMain } from '../Components/users-main/Users-main';
import { UserEdit } from '../Components/user-edit/User-edit';
// Functions for work with state
import { getUserRole, checkAuth } from '../clientStore/authSlice/auth-sliice';
// Utils function
import { IconNames } from '../util/utils';
import { RoleRoute } from '../util/role-route';

export const Users = ({ userName }) => {
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
          <RoleRoute exact path={path}>
            <UsersMain />
          </RoleRoute>
          <RoleRoute path={`${path}/add`}>
            <CreateUserForm />
          </RoleRoute>
          <RoleRoute path={`${path}/:userId`}>
            <UserEdit />
          </RoleRoute>
        </Switch>
      </main>
      <Footer />
    </div>
  );
};
