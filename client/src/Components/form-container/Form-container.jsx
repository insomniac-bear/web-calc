import styles from './FormContainer.module.css';

export const FormContainer = ({ children }) => {
  return <section className={styles.container}>
    {children}
  </section>
};
