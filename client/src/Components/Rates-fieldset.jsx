// Components
import { InputField } from './Input-field';
// Styles
import styles from '../styles/Fieldset.module.css';

export const RatesFieldset = ({ fieldsetName, onSetGroupValues, valuesGroup }) => {
  return (
    <fieldset className={styles.container}>
      <legend className={styles.title}>{fieldsetName}</legend>
      <InputField
        name={'Name'}
        placeholder={'Enter name of rate'}
        value={valuesGroup.rateName}
        onChange={onSetGroupValues}
      />
      <InputField
        name={'Hoyrly rate for 2 movers CASH PAYMENT'}
        placeholder={'ex: 99'}
        value={valuesGroup.rateForTwoMoversCashPayment}
        onChange={onSetGroupValues}
      />
      <InputField
        name={'Extra hourly amount for CARD PAYMENT'}
        placeholder={'ex: 10'}
        value={valuesGroup.extraAmmountForCardPayment}
        onChange={onSetGroupValues}
      />
      <InputField
        name={'Hourly rate per extra mover'}
        placeholder={'ex: 40'}
        value={valuesGroup.ratePerExtraMover}
        onChange={onSetGroupValues}
      />
      <InputField
        name={'Hourly rate per extra truck'}
        placeholder={'ex: 50'}
        value={valuesGroup.ratePerExtraTruck}
        onChange={onSetGroupValues}
      />
    </fieldset>
  );
};