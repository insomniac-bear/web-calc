// Components
import { PageHeaderBtns } from '../page-header-btns/Page-header-btns';
import { PageTitle } from '../page-title/Page-title';
// Styles
import styles from './PageHeader.module.css';

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