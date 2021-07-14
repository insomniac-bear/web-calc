// Components
import { InputField } from './Input-field';
// Styles
import styles from '../styles/Fieldset.module.css';

export const TruckFieldset = ({ fieldsetName, onSetGroupValues, valuesGroup }) => {
  return (
    <fieldset className={styles.container}>
      <legend className={styles.title}>{fieldsetName}</legend>
      <InputField
        name={'Truck reservation fee'}
        placeholder={'ex: 39'}
        value={valuesGroup.truckReservation}
        onChange={onSetGroupValues}
      />
      <InputField
        name={'Distination fee'}
        placeholder={'ex: 160'}
        value={valuesGroup.distination.fee}
        onChange={onSetGroupValues}
      />
      <InputField
        name={'miles'}
        placeholder={'ex: 140'}
        value={valuesGroup.distination.miles}
        onChange={onSetGroupValues}
      />
    </fieldset>
  );
};
