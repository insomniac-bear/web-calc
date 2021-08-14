// Third party libraries
import { nanoid } from 'nanoid'
// Components
import { MainLink } from '../main-link/Main-link';
// Styles
import styles from './Estimates.module.css';

const ESTIMATES_LINKS = [
  {
    name: 'settings',
    description: 'Parameters settings',
    link: '/departments',
  },
  {
    name: 'Calculator',
    description: 'Customizable calculator',
    link: '/calculator',
  }
];

export const Estimates = () => {
  return(
    <section className={styles.container}>
      <h2 className={styles.title}>Estimates</h2>
      <ul className={styles.list}>
        {ESTIMATES_LINKS.map((item) => {
          return (
            <li className={styles.item} key={nanoid(ESTIMATES_LINKS.length)}>
              <MainLink
                linkData={item}
              />
            </li>
        )})}
      </ul>
    </section>
  );
}