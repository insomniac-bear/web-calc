// Third party libraries
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { useState } from 'react';
// Components
import { DepartmentRadiobuttons } from '../department-radiobuttons/Department-radiobuttons';
import { DepartmentTitle } from '../department-title/Department-title';
import { Icon } from '../Icon';
import { RateFieldset } from '../rate-fieldset/Rate-fieldset';
// Utils
import { IconNames } from '../../util/const';
//Styles
import styles from './DepartmentRates.module.css';

export const DepartmentRates = (props) => {
  const {
    rates,
    setDepartmentFormValue,
    lastTarget,
    setLastTarget,
  } = props;

  const [isSameRate, setSameRate] = useState(false);
  const [isSameTruck, setSameTruck] = useState(false);

  const addRateBtnClick = (index, typeRate, isSameRate, isSameTruck) => {
    const newRate = typeRate === 'extra' ? {
      [`rateName${index}`]: '',
      [`cardPayment${index}`]: isSameRate ? rates.ratesList[0].cardPayment0 : '',
      [`deductPayment${index}`]: isSameRate ? rates.ratesList[0].deductPayment0 : '',
      [`extraMover${index}`]: isSameRate ? rates.ratesList[0].extraMover0 : '',
      [`extraTruck${index}`]: isSameTruck ? rates.ratesList[0].extraTruck0 : '',
    } :
    {
      [`rateName${index}`]: '',
      [`hourlyRate${index}`]: isSameRate ? rates.ratesList[0].hourlyRate0 : '',
      [`cashDiscount${index}`]: isSameRate ? rates.ratesList[0].cashDiscount0 : '',
      [`extraMover${index}`]: isSameRate ? rates.ratesList[0].extraMover0 : '',
      [`extraTruck${index}`]: isSameTruck ? rates.ratesList[0].extraTruck0 : '',
    };
    setDepartmentFormValue('rates.ratesList', 'push', newRate);
  };

  const onChangeRateType = (evt) => {
    const typeValue = evt.target.value === 'true' ? 'discount' : 'extra';

    setDepartmentFormValue('rates.rateType', 'set', typeValue);
    if (lastTarget) {
      setLastTarget(undefined);
    }
  };

  const setRatesValue = (evt, index) => {
    setLastTarget(evt.target.name);
    setDepartmentFormValue(`rates.ratesList.${index}.${evt.target.name}`, 'set', evt.target.value);
  };

  return (
    <section>
      <DepartmentTitle title={'Rates'}/>
      <DepartmentRadiobuttons
        title={'Select type of rates calculation method'}
        name={'rateType'}
        isChecked={rates.rateType === 'discount'}
        onChangeValue={onChangeRateType}
        firstValue={'cash discount %'}
        secondValue={'extra $/hr for card payment'}
      />
      {
        rates.ratesList.map((rate, index) => {
          return <RateFieldset
            key={nanoid(10)}
            rate={rate}
            rateType={rates.rateType}
            index={index}
            isSameRate={isSameRate}
            isSameTruck={isSameTruck}
            setSameRate={setSameRate}
            setSameTruck={setSameTruck}
            setRatesValue={setRatesValue}
            lastTarget={lastTarget}
          />
        })
      }
      <button
        className={styles.addRateBtn}
        onClick={
          (evt) => {
            evt.preventDefault();
            addRateBtnClick(rates.ratesList.length, rates.rateType, isSameRate, isSameTruck);
          }
        }
      >
        <Icon name={IconNames.PLUS}/>
        Add rate
      </button>
    </section>
  );
};

DepartmentRates.propTypes = {
  rates: PropTypes.object.isRequired,
  setDepartmentFormValue: PropTypes.func.isRequired,
  lastTarget: PropTypes.string,
  setLastTarget: PropTypes.func.isRequired,
};
