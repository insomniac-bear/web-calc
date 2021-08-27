// Third party libraries
import PropTypes from 'prop-types';
// Styles
import styles from './CalculationCommonLabel.module.css';

export const CalculationCommonLabel = (props) => {
  const {
    title,
    value,
    placeholder,
    inputName,
    changeValue,
    isFocused = false,
  } = props;
  return(
    <label className={styles.commonLabel}>
      <span className={styles.commonTxt}>{title}</span>
      <input
        className={styles.commonInput}
        placeholder={placeholder}
        value={value}
        name={inputName}
        onChange={changeValue}
        autoFocus={isFocused}
      />
    </label>
  );
};

CalculationCommonLabel.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  placeholder: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
};
