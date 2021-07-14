// Styles
import styles from '../styles/Popup.module.css';

export const Popup = ({ content, onBtnCloseClick }) => {
  return(
    <div className={styles.container}>
      <div className={styles.block}>
        <button
          className={styles.btnClose}
          onClick={() => onBtnCloseClick(false)}
        >
          <span className='visually-hidden'>Close popup</span>
        </button>
        { content }
      </div>
    </div>
  );
};
