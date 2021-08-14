// Third party libraries
import { Link, useRouteMatch } from 'react-router-dom';
// Styles
import styles from './DepartmentTableBody.module.css';

export const DepartmentTableBody = ({ tableData }) => {
  const { url } = useRouteMatch();

  return(
    <ul className={styles.list}>
      {tableData.map((data) => {
        return(
          <li className={styles.listItem} key={data._id}>
            <Link to={`${url}/${data._id}`} className={styles.link}>
              <span className={styles.txt}>{data.departmentName}</span>
              <span className={styles.txt}>{data.authorId.login}</span>
              <span className={styles.txt}>{new Date(data.createdAt).toDateString()}</span>
              <span className={styles.txt}>{new Date(data.updatedAt).toDateString()}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};