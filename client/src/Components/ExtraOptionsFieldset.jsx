// Components
import { InputField } from './Input-field';
// Styles
import styles from '../styles/Fieldset.module.css';

export const ExtraOptionsFieldset = ({ fieldsetName, onSetGroupValues, valuesGroup }) => {
  return (
    <fieldset className={styles.container}>
      <legend className={styles.title}>{fieldsetName}</legend>
      <InputField
        name={'Havy item charge'}
        placeholder={'ex: 39'}
        value={valuesGroup.havyItemCharge}
        onChange={onSetGroupValues}
      />
      <InputField
        name={'Shuttle charge'}
        placeholder={'ex: 20'}
        value={valuesGroup.shuttleCharge}
        onChange={onSetGroupValues}
      />
    </fieldset>
  );
};
