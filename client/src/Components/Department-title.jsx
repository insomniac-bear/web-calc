// Styles
import styles from '../styles/DepartmentTitle.module.css';

export const DepartmentTitle = ({title}) => {
  return <h3 className={styles.title}>{title}</h3>;
}