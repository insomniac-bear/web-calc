// Third party libraries
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// State functions
import { loadCompany, getCompany } from '../clientStore/companySlice/company-slice';
import { getCompanyId } from '../clientStore/authSlice/auth-sliice';
import { saveUser } from '../clientStore/usersSlice/user-slice';
// Util functions
import { onChangeFormValue } from '../util/utils';
// Styles
import styles from '../styles/CreateUserPopup.module.css';

export const CreateUserPopup = () => {
  const dispatch = useDispatch();

  const companyId = useSelector(getCompanyId);

  useEffect(() => {
    dispatch(loadCompany(companyId));
  }, [dispatch, companyId]);

  const companyName = useSelector(getCompany);
  const [user, setUserForm] = useState({
    login: '',
    password: '',
    role: 'user',
    companyId
  });

  const onSaveUserBtnClick = (evt, userData) => {
    evt.preventDefault();
    dispatch(saveUser(userData));
    setUserForm({
      login: '',
      password: '',
      role: 'user',
      companyId
    });
  };

  return(
    <form className={styles.form}>
      <label className='visually-hidden' htmlFor='user_name'>
        User name
      </label>
      <input
        type='text'
        id='user_name'
        className={styles.field}
        name='login'
        value={user.login}
        placeholder='User loogin'
        onChange={(evt) => onChangeFormValue(evt, user, setUserForm)}
        required
      />
      <label className='visually-hidden' htmlFor='user_password'>
        User password
      </label>
      <input
        type='password'
        id='user_password'
        className={styles.field}
        name='password'
        value={user.password}
        placeholder='Password'
        onChange={(evt) => onChangeFormValue(evt, user, setUserForm)}
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
          <option>user</option>
          <option>admin</option>
        </select>
      </label>
      <button className={styles.btnSubmit} onClick={(evt) => onSaveUserBtnClick(evt, user)}>Save</button>
    </form>
  );
};