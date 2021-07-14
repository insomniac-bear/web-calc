// Components
import { Icon } from './Icon';
// Util functions
import { IconNames } from '../util/utils';
// Styles
import styles from '../styles/Search.module.css';

export const Search = ({ searchName }) => {
  return(
    <form className={styles.container}>
      <label>
        <span className='visually-hidden'>Input {searchName} </span>
        <input
          className={styles.input}
          name='searchquery'
          id='search'
          placeholder={searchName}
        />
      </label>
      <button className={styles.submitBtn}>
        <Icon name={IconNames.SEARCH}/>
      </button>
    </form>
  );
};