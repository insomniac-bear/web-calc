// Third party libraries
import { nanoid } from 'nanoid';
// Styles
import styles from './CalculationTabs.module.css';

export const CalculationTabs = ({ tabList }) => {
  return(
    <ul className={styles.tabsMenu}>
      {tabList.map((tab) => <li
        className={styles.tabsItem}
        key={nanoid(tabList.length)}
      >
        <button
          className={tab.isActive ? styles.activeTabBtn : styles.tabBtn}
          onClick={tab.action}
        >
          {tab.name}
        </button>
      </li>)}
    </ul>
  );
};