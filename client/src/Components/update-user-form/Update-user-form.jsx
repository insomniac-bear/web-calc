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
import styles from './UpdateUserForm.module.css';

export const UpdateUserForm = ({login = '', role = 'user', id = '' }) => {
  const [ isFetchError, setFetchError ] = useState({
    isError: false,
    message: '',
  });
  const [ isPasswordChange, setPasswordChange ] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const companyId = useSelector(getCompanyId);

  useEffect(() => {
    dispatch(loadCompany(companyId));
  }, [dispatch, companyId]);

  const companyName = useSelector(getCompany);
  const [user, setUserForm] = useState({
    login,
    password: '',
    role,
    companyId
  });

  const [changedData, setChangedData] = useState({});

  const onUpdateUserBtnClick = async (evt, userData) => {
    evt.preventDefault();

    if (!isFetchError.isError) {
      const updatedUser = await fetchedData('user/user', 'PATCH', { id,  ...userData });

      switch (updatedUser.status) {
        case HttpCode.FAILED:
          setFetchError({
            isError: true,
            message: updatedUser.data.status,
          });
          break;
        case HttpCode.OK:
          setUserForm({
            login: '',
            password: '',
            role: 'user',
            companyId
          });
          dispatch(setUsersLoadingProcess({ status: 'idle' }));
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

  const onUserDataUpdate = (evt) => {
    onChangeFormValue(evt, user, setUserForm);
    setChangedData({
      ...changedData,
      [evt.target.name]: evt.target.value,
    });
  }

  const onDeleteUserBtnClick = async (evt, userId) => {
    evt.preventDefault();
    const deletedUser = await fetchedData('user/user', 'DELETE', { userId });
    if (deletedUser.status === HttpCode.OK) {
      dispatch(setUsersLoadingProcess({ status: 'idle' }));
      history.replace('/users');
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
        className={user.loginValidate === 'error' ? styles.errorField : styles.field}
        name='login'
        value={user.login}
        placeholder={'User login'}
        onChange={(evt) => onUserDataUpdate(evt)}
        required
      />
      {
        !isPasswordChange &&
        <button
          className={styles.changePasswordBtn}
          onClick={() => setPasswordChange(true)}
        >
          Change Password
        </button>
      }
      {
        isPasswordChange &&
        <div>
          <label className='visually-hidden' htmlFor='user_password'>
            User password
          </label>
          <input
            type='password'
            id='user_password'
            className={user.passwordValidate === 'error' ? styles.errorField : styles.field}
            name='password'
            value={user.password}
            placeholder={'Password'}
            onChange={(evt) => onUserDataUpdate(evt)}
            required
          />
        </div>
      }
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
          onChange={(evt) => onUserDataUpdate(evt)}
        >
          <option>{ Role.USER }</option>
          <option>{ Role.MODERATOR }</option>
        </select>
      </label>
      {isFetchError.isError && <ErrorMessage errMessage={isFetchError.message} />}
      <button
        className={styles.btnSubmit}
        onClick={(evt) => onUpdateUserBtnClick(evt, changedData)}
      >
        Update
      </button>
      <button
        className={styles.btnSubmit}
        onClick={(evt) => onDeleteUserBtnClick(evt, id)}
      >
        Delete
      </button>
    </form>
  );
};