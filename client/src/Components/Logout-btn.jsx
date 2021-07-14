import { useDispatch } from 'react-redux';
// Components
import { Icon } from './Icon';
// State functions
import { logoutUser } from '../clientStore/authSlice/auth-sliice';
// Constants
import { IconNames } from '../util/const';
// Styles
import styles from '../styles/LoginBtn.module.css';

export const LogoutBtn = () => {
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logoutUser());
  };
  return(
    <button
      className={styles.link}
      onClick={onLogoutClick}
    >
      <Icon name={ IconNames.LOGOUT }/>
      Logout
    </button>
  );
};
