// Components
import { PageHeaderBtns } from './Page-header-btns';
import { PageTitle } from './Page-title';
// Styles
import styles from '../styles/PageHeader.module.css';

export const PageHeader = ({ titleIcon, title, btns }) => {
  return(
    <section className={styles.container}>
      <div className={styles.block}>
        <PageTitle iconName={titleIcon} titleText={title} />
        <PageHeaderBtns btns={btns} />
      </div>
    </section>
  );
};