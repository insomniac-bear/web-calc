import styles from '../styles/BtnSubmit.module.css';

export const BtnSubmit = ({ isActive, action, name }) => {
  return (
    <button
      type='submit'
      className={styles.btnSubmit}
      disabled={isActive}
      onClick={action}
    >
      {name}
    </button>
  );
}