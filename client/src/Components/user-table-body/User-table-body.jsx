// Third party libraries
import { Link, useRouteMatch } from 'react-router-dom';
// Styles
import styles from './UserTableBody.module.css';

export const UserTableBody = ({ tableData }) => {
  const { url } = useRouteMatch();

  return(
    <ul className={styles.list}>
      {tableData.map((data, index) => {
        return(
          <li className={styles.listItem} key={data._id}>
            <Link to={`${url}/${data._id}`} className={styles.link}>
              <span className={styles.txt}>{index + 1}</span>
              <span className={styles.txt}>{data.login}</span>
              <span className={styles.txt}>{data.role}</span>
              <span className={styles.txt}>{new Date(data.createdAt).toDateString()}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};