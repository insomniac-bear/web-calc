// Third party libraries
import PropTypes from 'prop-types';
// Utils
import { showComponent } from '../../util/utils';
// Styles
import styles from './DepartmentLabel.module.css';

export const DepartmentLabel = (props) => {
  const {
    inputId,
    name,
    title,
    placeholder,
    value,
    changeValue,
    valueType,
    isFocused,
    isLong,
  } = props;

  return (
    <label
      className={styles.inputContainer}
      htmlFor={inputId}
    >
      <p className={styles.inputName}>{title}</p>
      {showComponent(
        valueType,
        <span className={styles.inputValueType}>{valueType}</span>
      )}
      <input
        id={inputId}
        className={isLong ? styles.inputLongPadding : styles.input}
        type='text'
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={changeValue}
        autoFocus={isFocused}
        required
      />
    </label>
  );
};

// Variable type settings
DepartmentLabel.propTypes = {
  inputId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  changeValue: PropTypes.func.isRequired,
  valueType: PropTypes.string,
  isFocused: PropTypes.bool,
  isLong: PropTypes.bool,
};
