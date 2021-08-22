// Third party libraries
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom';
// Components
import { CalculationForm } from '../Components/calculation-form/Calculation-form';
import { CalculationsMain } from '../Components/calculations-main/Calculations-main';
import { Footer } from '../Components/footer/Footer';
import { Header } from '../Components/header/Header';
import { PageHeader } from '../Components/page-header/Page-header';
import { PageMenu } from '../Components/page-menu/Page-menu';
// Functions for work with state
import { getUserRole, checkAuth } from '../clientStore/authSlice/auth-sliice';
//Utils functions
import { IconNames } from '../util/utils';
import { PrivateRoute } from '../util/private-route';


export const Calculations = ({ userName }) => {
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
      name: 'Save'
    },
    {
      name: 'Reset form'
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
          titleIcon={IconNames.CALCULATIONS}
          title={'Calculation'}
          btns={settingsHeaderBtn}
        />
        <PageMenu
          menuItems={SectionNames}
        />

        <Switch>
          <Route exact path={path}>
            <CalculationsMain />
          </Route>
          <PrivateRoute path={`${path}/add`}>
            <CalculationForm />
          </PrivateRoute>
          <PrivateRoute path={`${path}/:calculationId`}>
          </PrivateRoute>
        </Switch>
      </main>
      <Footer />
    </div>
  );
};