// Third party libraries
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
// Components
import Authorization from './pages/authorization';
import Main from './pages/main';
import { Departments } from './pages/departments';
import { Calculations } from './pages/calculations';
import { Users } from './pages/users';
// Store function
import { checkAuth, getUserName } from './clientStore/authSlice/auth-sliice';
// Util functions
import { PrivateRoute } from './util/private-route';
import { RoleRoute } from './util/role-route';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [ dispatch ]);

  const userName = useSelector(getUserName);

  return (
    <div className="container">
      <Router>
        <Switch>
{/**
* ---------- Public routing in the App ----------
*/}
          <Route
            exact
            path='/'
            component={Main}
          />
          <Route
            exact
            path='/login'
            component={Authorization}
          >
          </Route>
{/**
* ---------- Private routing in the App ----------
*/}
          <PrivateRoute
            path='/departments'
          >
            <Departments userName={userName} />    
          </PrivateRoute>
          <PrivateRoute
            path='/calculations'
          >
            <Calculations userName={userName} />    
          </PrivateRoute>
          <RoleRoute
            path='/users'
          >
            <Users userName={userName} />    
          </RoleRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
