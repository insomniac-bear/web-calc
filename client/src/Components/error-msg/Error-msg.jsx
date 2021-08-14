// Styles
import styles from './ErrorMessage.module.css';

export const ErrorMessage = ({ errMessage }) => {
  return(
    <p className={styles.error}>{errMessage}</p>
  );
}