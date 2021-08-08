import { Link } from 'react-router-dom';
// Components
import { Icon } from './Icon';
// Styles
import styles from '../styles/MainLink.module.css';

export const MainLink = ({ linkData }) => {
  const iconName = linkData.name === 'Calculator' ? 'Calculations' : `Settings`;
  return(
    <Link to={linkData.link} className={styles.link}>
      <div className={styles.decorateBlock}>
        <Icon name={iconName}/>
      </div>
      <h3 className={styles.title}>{linkData.name}</h3>
      <p className={styles.text}>{linkData.description}</p>
    </Link>
  );
};