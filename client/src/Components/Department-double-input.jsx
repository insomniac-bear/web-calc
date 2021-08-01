// Third party libraries
import PropTypes from 'prop-types';
// Styles
import styles from '../styles/DepartmentDoubleInput.module.css';

export const DepartmentDoubleInput = (props) => {
  const {
    values,
    changeValues,

  } = props;

  return (<label
    className={styles.inputContainer}
    htmlFor='distinationFee'
  >
    <p className={styles.inputName}>Distination fee</p>
    <span className={styles.inputValueType}>$</span>
    <input
      id='distinationFee'
      className={styles.doubleInput}
      type='text'
      placeholder='ex. 160'
      name='fee'
      value={values.fee}
      onChange={(evt) => changeValues(evt)}
    />
    <span>/</span>
    <span className={styles.inputValueTypeSecond}>miles</span>
    <input
      id='distinationFee'
      className={styles.doubleInputSecond}
      type='text'
      placeholder='ex. 140'
      name='miles'
      value={values.miles}
      onChange={(evt) => changeValues(evt)}
    />
  </label>);
};

DepartmentDoubleInput.propTypes = {
  values: PropTypes.object.isRequired,
  changeValues: PropTypes.func.isRequired,
};
