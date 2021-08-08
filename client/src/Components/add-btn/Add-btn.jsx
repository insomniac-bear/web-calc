// Third party libraries
import { Link } from 'react-router-dom';
// Components
import { Icon } from '../Icon';
import { IconNames } from '../../util/utils';
// Styles
import styles from './AddBtn.module.css';

export const AddBtn = ( props ) => {
  const { name, linkUrl='/', btnType="link", handler=undefined } = props;

  if (btnType === 'link') {
    return(
      <Link 
        className={styles.addDepartment}
        to={`${linkUrl}`}
      >
          <Icon name={IconNames.PLUS} />
          {`Add ${name}`}
      </Link>
    );
  }

  return(
    <button
      className={styles.addDepartment}
      onClick={() => handler(true)}
    >
      <Icon name={IconNames.PLUS} />
      {`Add ${name}`}
    </button>
  );
};