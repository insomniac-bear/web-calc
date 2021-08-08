// Third party libraries
import { useSelector } from 'react-redux';
import {
//  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom';
// Components
// import { Calculations } from '../Components/Calculations';
import { DepartmentEdit } from '../Components/Department-edit';
import { DepartmentForm } from '../Components/department-form/Department-form';
import { DepartmentsMain } from '../Components/departments-main/Departments-main';
import { Footer } from '../Components/Footer';
import { Header } from '../Components/Header';
import { PageHeader } from '../Components/Page-header';
import { PageMenu } from '../Components/page-menu/Page-menu';
// import { Users } from '../Components/Users';
// Functions for work with state
import { getUserRole } from '../clientStore/authSlice/auth-sliice';
//Utils functions
import { IconNames } from '../util/utils';
import { PrivateRoute } from '../util/private-route';


export default function Departments({ userName }) {
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
  ]

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