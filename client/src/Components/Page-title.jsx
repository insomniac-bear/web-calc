// Components
import { Icon } from './Icon';
// Styles
import styles from '../styles/PageTitle.module.css';

export const PageTitle = ({ iconName, titleText }) => {
  return(
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <Icon name={iconName}/>
      </div>
      <p className={styles.userName}>{titleText}</p>
    </div>
  );
};