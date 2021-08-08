// Third party libraries
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
// Components
import { Icon } from '../Icon';
// Styles
import styles from './PageMenu.module.css';

export const PageMenu = ({ menuItems }) => {
  const items = []
  for(let key in menuItems) {
    items.push(
      <li className={styles.item} key={nanoid(10)}>
        <Link
          className={styles.btn}
          to={`/${key.toLowerCase()}`}
        >
          <div className={styles.iconContainer}>
            <Icon name={menuItems[key]} />
          </div>
          {menuItems[key]}
        </Link>
      </li>
    );
  };
  return(
    <div className={styles.container}>
      <ul className={styles.list}>
        {items.map((it) => it)}
      </ul>
    </div>
  );
};