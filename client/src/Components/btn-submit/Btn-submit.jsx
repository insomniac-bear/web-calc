import styles from './BtnSubmit.module.css';

export const BtnSubmit = ({ isActive, action, name }) => {
  return (
    <button
      type='submit'
      className={styles.btnSubmit}
      disabled={!isActive}
      onClick={(evt) => action(evt)}
    >
      {name}
    </button>
  );
}