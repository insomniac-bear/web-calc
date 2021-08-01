// Components
import { Icon } from './Icon';
import { IconNames } from '../util/utils';
// Styles
import styles from '../styles/DepartmentsList.module.css';

export const DepatrmentList = ({departments}) => {
  return(
    <ul className={styles.container}>
      {departments.map((it) => {
        return(
          <li className={styles.item} key={it.id}>
            <a href='/' className={styles.departmentLink}>
              <div className={styles.iconContainer}>
                <Icon name={IconNames.DEPARTMENTS}/>
              </div>
              {it.departmentName}
            </a>
          </li>
        );
      })}
    </ul>
  );
};