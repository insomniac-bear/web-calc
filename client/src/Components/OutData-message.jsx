// Styles
import styles from '../styles/OutDataMessage.module.css';

export const OutDataMessage = ({ dataName }) => {
  return <p className={styles.text}>{dataName} isn't created</p>
};