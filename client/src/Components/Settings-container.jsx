import styles from '../styles/SettingsContainer.module.css';

export const SettingsContainer = ({ children }) => {
  return <section className={styles.container}>
    {children}
  </section>
};
