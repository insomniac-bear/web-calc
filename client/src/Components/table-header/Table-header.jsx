// Third party libraries
import { nanoid } from 'nanoid';
// Components
import { Icon } from '../Icon';
// Utils
import { IconNames } from '../../util/const';
// Styles
import styles from './TableHeader.module.css';

export const TableHeader = ({ headerTitles }) => {
  const titles = Object.values(headerTitles);
  return(
    <header className={styles.header}>      
      <ul className={styles.titles}>
        {titles.map((it) => {
          return(
            <li
              className={styles.titleItem}
              key={nanoid(titles.length)}
            >
              {it}
              <button
                className={styles.sortBtn}
              >
                <Icon name={IconNames.TRIANGLE}/>
              </button>
            </li>
          );
        })}
      </ul>
    </header>
  );
};
