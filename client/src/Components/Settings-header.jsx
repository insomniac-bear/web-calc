// Components
import { AddBtn } from './Add-btn';
import { Search } from './Search';
// Styles
import styles from '../styles/SettingsHeader.module.css';

export const SettingsHeader = ({ addBtnName, btnType='link', handler=undefined, searchPlaceholder }) => {
  return (
    <div className={styles.block}>
      <AddBtn
        btnType={btnType}
        handler={handler}
        name={addBtnName}
      />
      <Search searchName={searchPlaceholder}/>
    </div>
  );
};