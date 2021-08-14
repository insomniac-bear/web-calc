// Styles
import styles from './Promo.module.css';

export const Promo = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Moving estimates</h2>
      <p className={styles.text}>Professional moving estimates solution</p>
      <a href='/' className={styles.link} >Learn more</a>
    </section>
  );
};