// Third party libraries
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Components
import { Loading } from '../Components/loading/Loading';
// Functions for work with local state
import { getAuthenticatedStatus, getProcessAuthStatus } from "../clientStore/authSlice/auth-sliice"

export const PrivateRoute = ({ children, ...rest }) => {
  const isAuth = useSelector(getAuthenticatedStatus);
  const authStatus = useSelector(getProcessAuthStatus);
  return (
    <Route
      { ...rest }
      render = {
        ({ location }) => ( isAuth ) ? (
          children
        ) : (!isAuth || authStatus === 'failed') ? (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        ) : (<Loading />)
      }
    />
  );
}