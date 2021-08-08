// Styles
import styles from './LoadMoreBtn.module.css';

export const LoadMoreBtn = ({ loadHandler }) => {
  return(
    <button
      className={styles.loadMoreBtn}
      onClick={() => loadHandler()}
    >
      Load more...
    </button>
  );
};