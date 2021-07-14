// Styles
import styles from '../styles/SettigsTitle.module.css';

export const SettingsTitle = ({titleName}) => {
  return(
    <h2 className={styles.title}>Saved {titleName}</h2>
  );
};