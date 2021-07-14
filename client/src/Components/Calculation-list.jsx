//Components
import { Icon } from './Icon';

// Util functions
import { IconNames } from '../util/utils';

// Styles
import styles from '../styles/CalculationList.module.css';

export const CalculationList = ({ calculationData }) => {
  return(
    <div className={styles.container}>
      <header className={styles.header}>
        <ul className={styles.titles}>
          <li className={styles.titleItem}>
            N of users
            <button
              className={styles.sortBtn}
            >
              <Icon name={IconNames.TRIANGLE}/>
            </button>
          </li>
          <li className={styles.titleItem}>
            Username
            <button
              className={styles.sortBtn}
            >
              <Icon name={IconNames.TRIANGLE}/>
            </button>
          </li>
          <li className={styles.titleItem}>
            Created date
            <button
              className={styles.sortBtn}
            >
              <Icon name={IconNames.TRIANGLE}/>
            </button>
          </li>
        </ul>
      </header>
      <ul className={styles.list}>
        {calculationData.map((data, index) => {
          return(
            <li className={styles.listItem} key={data._id}>
              <a href='/' className={styles.link}>
                <span className={styles.txt}>#{index + 1}</span>
                <span className={styles.txt}>{data.login}</span>
                <span className={styles.txt}>{new Date(data.createdAt).toDateString()}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}