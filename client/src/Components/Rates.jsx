// Third party libraries
import { nanoid } from 'nanoid';
import { useState } from 'react';
// Components
import { Icon } from './Icon';
import { RateFieldset } from './Rate-fieldset';
// Utils
import { IconNames } from '../util/const';
//Styles
import styles from '../styles/DepartmentForm.module.css';

export const Rates = ({ onAddRateBtnClick, rates, onChangeRateValue }) => {
  const [isSameRate, setSameRate] = useState(false);
  const [isSameTruck, setSameTruck] = useState(false);

  return (
    <section>
      <h3 className={styles.sectionName}>Rates</h3>
      {
        rates.map((rate, index) => {
          return <RateFieldset
            rate={rate}
            rateIndex={index}
            isSameRate={isSameRate}
            isSameTruck={isSameTruck}
            setSameRate={setSameRate}
            setSameTruck={setSameTruck}
            setRatesValue={onChangeRateValue}
            key={nanoid(rates.length)}
          />
        })
      }
      <button
        className={styles.addRateBtn}
        onClick={
          (evt) => {
            evt.preventDefault();
            onAddRateBtnClick()
          }
        }
      >
        <Icon name={IconNames.PLUS}/>
        Add rate
      </button>
    </section>
  );
};
