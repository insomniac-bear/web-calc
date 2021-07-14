// Third party libraries
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
// Components
import Authorization from './pages/authorization';
import DepartmentAdd from './pages/departmentadd';
import Main from './pages/main';
import Settings from './pages/settings';
// Store function
import { checkAuth } from './clientStore/authSlice/auth-sliice';
// Util functions
import { PrivateRoute } from './util/private-route';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [ dispatch ]);

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
            exact
            path='/settings'
          >
            <Settings />    
          </PrivateRoute>
          <PrivateRoute
            exact
            path='/departmentadd'
          >
            <DepartmentAdd />
          </PrivateRoute>
          <Redirect to='/'/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
