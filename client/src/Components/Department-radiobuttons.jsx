// Third party libraries
import PropTypes from 'prop-types';
// Styles
import styles from '../styles/DepartmentRadiobuttons.module.css';

export const DepartmentRadiobuttons = (props) => {
  const { title, name, isChecked, onChangeValue, firstValue, secondValue } = props;
  return(
    <label className={styles.inputContainer}>
      <p className={styles.inputName}>{title}</p>
      <p className={styles.radiobtnContainer}>
        <input
          type='radio'
          value={true}
          name={name}
          checked={isChecked}
          onChange={onChangeValue}
        />
        {firstValue}<br />
        <input
          type='radio'
          value={false}
          name={name}
          checked={!isChecked}
          onChange={onChangeValue}
        />
        {secondValue}
      </p>
    </label>
  );
};

DepartmentRadiobuttons.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  firstValue: PropTypes.string.isRequired,
  secondValue: PropTypes.string.isRequired,
}
