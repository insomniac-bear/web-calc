// Third party libraries
import { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
// Components
import { Loading } from './Loading';
// Methods for work with client store
import { loginUser, getAuthenticatedStatus, getProcessAuthStatus, getAuthError } from '../clientStore/authSlice/auth-sliice';
// Util functions
import { onChangeFormValue, showComponent } from '../util/utils';
// Styles
import styles from '../styles/LoginPopup.module.css';
import { ErrorMessage } from './Error-msg';

export const LoginPopup = ({ popupClose }) => {
  const dispatch = useDispatch();
  const authStatus = useSelector(getAuthenticatedStatus);
  const history = useHistory();
  const location = useLocation();
  const [loginForm, setLoginForm] = useState({
    login: '',
    password: '',
  });

  const onLoginClick = async (evt) => {
    evt.preventDefault();
    dispatch(loginUser(loginForm));
    setLoginForm({
      login: '',
      password: '',
    });
    let { from } = location.state || { from: { pathname: "/" } };
    history.replace(from);
  };

  const authProcess = useSelector(getProcessAuthStatus);
  const errMessage = useSelector(getAuthError);

  const activeSubmitBtn = !Boolean(loginForm.email) && !Boolean(loginForm.password) && (!authStatus);

  useEffect(() => {
    if (authStatus) {
      popupClose(false);
    }
  }, [ authStatus, popupClose ]);

  return(
    <div>
      <h3 className='visually-hidden'>Modal popup for login user</h3>
      <p className={styles.title}>Please login</p>
      <form className={styles.form}>
        <label className='visually-hidden' htmlFor='login-input'>Input login</label>
        <input
          id='login-input'
          className={styles.field}
          type='text'
          placeholder='Login'
          name='login'
          value={loginForm.login}
          onChange={(evt) => onChangeFormValue(evt, loginForm, setLoginForm)}
          required
        />
        <label className='visually-hidden' htmlFor='password-input'>Input login</label>
        <input
          id='password-input'
          className={styles.field}
          type='password'
          placeholder='Password'
          name='password'
          value={loginForm.password}
          onChange={(evt) => onChangeFormValue(evt, loginForm, setLoginForm)}
          required
        />

        {
          authProcess === 'loading' ? 
            <Loading /> : 
            ''
        }

        {
          authProcess === 'failed' ?
            <ErrorMessage errMessage={errMessage} /> :
            ''
        }

        {
          showComponent(
            authProcess !== 'loading',
            <button
              type='submit'
              className={styles.btnSubmit}
              onClick={onLoginClick}
              disabled={activeSubmitBtn}
            >
              Log In
            </button>
          )
        }
        
      </form>
    </div>
  );
};
