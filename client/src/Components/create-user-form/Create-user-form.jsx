// Third party libraries
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// Components
import { ErrorMessage } from '../error-msg/Error-msg';
// State functions
import { loadCompany, getCompany } from '../../clientStore/companySlice/company-slice';
import { getCompanyId } from '../../clientStore/authSlice/auth-sliice';
import { setUsersLoadingProcess } from '../../clientStore/usersSlice/user-slice';
// Util functions
import { onChangeFormValue, fetchedData } from '../../util/utils';
import { HttpCode, Role } from '../../util/const';
// Styles
import styles from './CreateUserForm.module.css';

export const CreateUserForm = ({login = '', role = 'user' }) => {
  const [ isFetchError, setFetchError ] = useState({
    isError: false,
    message: '',
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const companyId = useSelector(getCompanyId);

  useEffect(() => {
    dispatch(loadCompany(companyId));
  }, [dispatch, companyId]);

  const companyName = useSelector(getCompany);

  const [validateUserForm , setValidateUserForm] = useState({
    loginValidate: 'idle',
    passwordValidate: 'idle',
  });

  const [user, setUserForm] = useState({
    login,
    password: '',
    role,
    companyId
  });

  const onSaveUserBtnClick = async (evt, userData) => {
    evt.preventDefault();

    if (!user.login || !user.password) {
      setFetchError({
        isError: true,
        message: 'Please input all fields'
      });
    }

    if (!isFetchError.isError) {
      const savedUser = await fetchedData('user/registration', 'POST', { ...userData });

      switch (savedUser.status) {
        case HttpCode.FAILED:
          setFetchError({
            isError: true,
            message: savedUser.data.status,
          });
          break;
        case HttpCode.OK:
          setUserForm({
            login: '',
            password: '',
            role: 'user',
            companyId
          });
          dispatch(setUsersLoadingProcess({ status: 'idle' }))
          history.replace('/users');
          break;
        default:
          setFetchError({
            isError: true,
            message: 'Shit happenes. Sorry',
          });
          break;
      }
    }
  };

  return(
    <form className={styles.form}>
      <h2 className={styles.title}>Create new user</h2>
      <label className='visually-hidden' htmlFor='user_name'>
        User name
      </label>
      <input
        type='text'
        id='user_name'
        className={validateUserForm.loginValidate === 'error' ? styles.errorField : styles.field}
        name='login'
        value={user.login}
        placeholder={validateUserForm.loginValidate === 'error' ? 'Please enter login' : 'User login'}
        onChange={(evt) => onChangeFormValue(evt, user, setUserForm)}
        onBlur={() => {
          if (!user.login) {
            setValidateUserForm({ ...validateUserForm, loginValidate: 'error'});
          } else {
            setValidateUserForm({ ...validateUserForm, loginValidate: 'success'});
          }
        }}
        required
      />
      <label className='visually-hidden' htmlFor='user_password'>
        User password
      </label>
      <input
        type='password'
        id='user_password'
        className={validateUserForm.passwordValidate === 'error' ? styles.errorField : styles.field}
        name='password'
        value={user.password}
        placeholder={validateUserForm.passwordValidate === 'error' ? 'Please enter password' : 'Password'}
        onChange={(evt) => onChangeFormValue(evt, user, setUserForm)}
        onBlur={() => {
          if (!user.password) {
            setValidateUserForm({ ...validateUserForm, passwordValidate: 'error'});
          } else {
            setValidateUserForm({ ...validateUserForm, passwordValidate: 'success'});
          }
        }}
        required
      />
      <label htmlFor="company_select" className={styles.label}>
        <span className={styles.labelTxt}>Company</span> 
        <input
          id='company_select'
          className={styles.select}
          type='text'
          name='company'
          value={companyName}
          disabled
          required
        />
      </label>
      <label className="label">
        <span className={styles.labelTxt}>Choose user role</span> 
        <select
          className={styles.select}
          value={user.role}
          name='role'
          required
          onChange={(evt) => onChangeFormValue(evt, user, setUserForm)}
        >
          <option>{ Role.USER }</option>
          <option>{ Role.MODERATOR }</option>
        </select>
      </label>
      {isFetchError.isError && <ErrorMessage errMessage={isFetchError.message} />}
      <button
        className={styles.btnSubmit}
        onClick={(evt) => onSaveUserBtnClick(evt, user)}
        disabled={!user.login || !user.password}
      >
        Save
      </button>
    </form>
  );
};
