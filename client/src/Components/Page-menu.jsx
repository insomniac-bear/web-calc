// Third party libraries
import { nanoid } from 'nanoid';
// Components
import { Icon } from './Icon';
// Styles
import styles from '../styles/PageMenu.module.css';

export const PageMenu = ({ activeItem, menuItems, toggleMenu }) => {
  const items = []
  for(let key in menuItems) {
    items.push(
      <li className={styles.item} key={nanoid(10)}>
        <button
          className={menuItems[key] === activeItem ? styles.activeBtn : styles.btn}
          disabled={menuItems[key] === activeItem}
          onClick={() => toggleMenu(menuItems[key])}
        >
          <div className={styles.iconContainer}>
            <Icon name={menuItems[key]} />
          </div>
          {menuItems[key]}
        </button>
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