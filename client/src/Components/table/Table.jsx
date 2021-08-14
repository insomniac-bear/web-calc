// Styles
import styles from './Table.module.css';

export const Table = ({children}) => {
  return(
    <section className={styles.container}>
      {children}
    </section>
  );
}