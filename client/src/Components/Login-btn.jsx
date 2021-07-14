// Components
import { Icon } from './Icon';
// Constants
import { IconNames } from '../util/const';
// Styles
import styles from '../styles/LoginBtn.module.css';

export const LoginBtn = ({ onLoginClick }) => {
  return(
    <button
      className={styles.link}
      onClick={onLoginClick}
    >
      <Icon name={ IconNames.USER }/>
      Login
    </button>
  );
};
