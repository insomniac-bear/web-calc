// Styles
import styles from './DepartmentTitle.module.css';

export const DepartmentTitle = ({title}) => {
  return <h3 className={styles.title}>{title}</h3>;
}