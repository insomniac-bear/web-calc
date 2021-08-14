// Third party libraries
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Components
import { Loading } from '../Components/loading/Loading';
// Functions for work with local state
import {
  getAuthenticatedStatus,
  getProcessAuthStatus,
  getUserRole,
} from "../clientStore/authSlice/auth-sliice";
// Utils
import { Role } from '../util/const';

export const RoleRoute = ({ children, ...rest }) => {
  const isAuth = useSelector(getAuthenticatedStatus);
  const authStatus = useSelector(getProcessAuthStatus);
  const role = useSelector(getUserRole);

  return (
    <Route
      { ...rest }
      render = {
        ({ location }) => ( isAuth && ( role === Role.ADMIN || role === Role.MODERATOR )) ? (
          children
        ) : (!isAuth || authStatus === 'failed') ? (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        ) : (role !== Role.ADMIN || role !== Role.MODERATOR) ? (
          <Redirect
            to={{
              pathname: '/departments',
              state: { from: location }
            }}
          />
        ) : (<Loading />)
      }
    />
  );
}