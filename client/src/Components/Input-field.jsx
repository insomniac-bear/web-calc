// Styles
import styles from '../styles/InputField.module.css';

export const InputField = (props) => {
  const { name, placeholder, value, changeValue } = props;
  return (
    <label className={styles.container}>
      <p className={styles.name}>{name}</p>
      <input
        className={styles.inputText}
        type="text"
        value={value}
        onChange={changeValue}
        placeholder={placeholder}
      />
    </label>
  );
};
