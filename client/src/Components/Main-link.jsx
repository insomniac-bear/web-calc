import { Link } from 'react-router-dom';
// Components
import { Icon } from './Icon';
// Styles
import styles from '../styles/MainLink.module.css';

export const MainLink = ({name, description}) => {
  const link = `/${name}`;
  const iconName = name === 'Calculator' ? 'Calculations' : `${name[0].toUpperCase()}${name.slice(1)}`;
  return(
    <Link to={link} className={styles.link}>
      <div className={styles.decorateBlock}>
        <Icon name={iconName}/>
      </div>
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.text}>{description}</p>
    </Link>
  );
};