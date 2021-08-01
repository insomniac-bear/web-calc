// Third party libraries
import { nanoid } from 'nanoid';
// Styles
import styles from '../styles/PageHeaderBtns.module.css';

export const PageHeaderBtns = ({ btns }) => {
  return(
    <div className={styles.container}>
      {
        btns.length === 1 ?
          <button
            className={styles.btn}
          >
            {btns[0].name}
          </button> :
          btns.map((btn) => {
            return <button
              key={nanoid(btns.length)}
              className={styles.btn}
              onClick={(evt) => btn.onClick(evt)}
            >
              {btn.name}
            </button>
          })
      }
    </div>
  )
};