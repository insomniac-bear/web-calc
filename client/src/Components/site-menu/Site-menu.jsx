// Third party libraries
import { Link } from 'react-router-dom';
// Components
import { LogoutBtn } from '../logout-btn/Logout-btn';
import { showComponent } from '../../util/utils';
// Styles
import styles from './SiteMenu.module.css';

export const SiteMenu = (props) => {
  const { isMobileOpen, onBtnClick, isLoginBtnShowed } = props;
  const mobileMenuClass = isMobileOpen ? styles.containerOn : styles.container;

  return(
    <div className={mobileMenuClass}>
      <ul className={styles.list}>
        {
          showComponent(
            isLoginBtnShowed,
            <li className={styles.item}>
              <Link to='/login' className={styles.link}>
                Login
              </Link>
            </li>
          )
        }
        {
          showComponent(
            !isLoginBtnShowed,
            <li className={styles.item}>
              <LogoutBtn />
            </li>
          )
        }
        <li className={styles.item}><a href='/' className={styles.link}>Home</a></li>
        <li className={styles.item}><a href='/' className={styles.link}>Contacts</a></li>
      </ul>
      <button
        className={styles.btnClose}
        onClick={() => onBtnClick(false)}
      ></button>
    </div>
  );
};