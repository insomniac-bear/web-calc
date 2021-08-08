// Third party libraries
import { useState } from 'react';
// Components
import { SiteMenu } from '../Components/Site-menu';
// Styles
import styles from '../styles/Header.module.css';

export const Header = ({ isLoginBtnShow }) => {
  const [isMenu, toggleMenu] = useState(false);

  return(
    <header className={styles.container}>
      <SiteMenu
        isMobileOpen={isMenu}
        onBtnClick={toggleMenu}
        isLoginBtnShowed={isLoginBtnShow}
      />
      <h1 className={styles.title}> Estimates calculator</h1>
      <button
        className={styles.mobileBtn}
        onClick={() => toggleMenu(true)}
      >
        <span className="visually-hidden">site menu button</span>
      </button>
    </header>
  );
}