// Third party libraries
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
// Components
import { DepartmentRadiobuttons } from '../department-radiobuttons/Department-radiobuttons';
import { DepartmentLabel } from '../department-label/Department-label';
// Utils
import { showComponent, showAlterComponent } from '../../util/utils';
// Styles
import styles from './RateFieldset.module.css';

export const RateFieldset = (props) => {
  const {
    rate,
    rateType,
    index,
    isSameRate,
    isSameTruck,
    setSameRate,
    setSameTruck,
    setRatesValue,
    lastTarget,
  } = props;

  const onChangeSameRate = (evt) => {
    switch (evt.target.value) {
      case 'true':
        setSameRate(true);
        break;
      case 'false':
        setSameRate(false);
        break;
      default:
        break
    }
  };

  const onChangeSameTruck = (evt) => {
    switch (evt.target.value) {
      case 'true':
        setSameTruck(true);
        break;
      case 'false':
        setSameTruck(false);
        break;
      default:
        break
    }
  };

  return (
    <fieldset
      key={nanoid(10)}
      className={styles.rateGroup}
    >
      <legend className={styles.rateName}>Rate #{index + 1}</legend>
      <div>
        <DepartmentLabel
          inputId={`rate_${index + 1}_name`}
          index={index}
          name={`rateName${index}`}
          title={'Name'}
          placeholder={'Name of rate'}
          value={rate[`rateName${index}`]}
          changeValue={(evt) => setRatesValue(evt, index)}
          isFocused={lastTarget === `rateName${index}`}
        />
      </div>
      <div>
        <section className={styles.rateSection}>
          {
            showAlterComponent(
              rateType === 'discount',
              <DepartmentLabel
                inputId={`${index+1}_hourly_rate`}
                name={`hourlyRate${index}`}
                title={'Hoyrly rate for 2 movers'}
                placeholder={'ex. 99'}
                value={rate[`hourlyRate${index}`]}
                changeValue={(evt) => setRatesValue(evt, index)}
                valueType={'$'}
                isFocused={lastTarget === `hourlyRate${index}`}
              />,
              <DepartmentLabel
                inputId={`${index+1}_cash_payment`}
                name={`cashPayment${index}`}
                title={'Hoyrly rate for 2 movers CASH PAYMENT'}
                placeholder={'ex. 99'}
                value={rate[`cashPayment${index}`]}
                changeValue={(evt) => setRatesValue(evt, index)}
                valueType={'$'}
                isFocused={lastTarget === `cashPayment${index}`}
              />
            )
          }
          {
            showAlterComponent(
              rateType === 'discount',
              <DepartmentLabel
                inputId={`${index + 1}_cash_discount`}
                index={index}
                name={`cashDiscount${index}`}
                title={'Discount for CASH PAYMENT'}
                placeholder={'ex. 10'}
                value={rate[`cashDiscount${index}`]}
                changeValue={(evt) => setRatesValue(evt, index)}
                valueType={'$'}
                isFocused={lastTarget === `cashDiscount${index}`}
              />,
              <DepartmentLabel
                inputId={`${index + 1}_card_payment`}
                index={index}
                name={`cardPayment${index}`}
                title={'Extra hourly amount for CARD PAYMENT'}
                placeholder={'ex. 10'}
                value={rate[`cardPayment${index}`]}
                changeValue={(evt) => setRatesValue(evt, index)}
                valueType={'$'}
                isFocused={lastTarget === `cardPayment${index}`}
              />
            )
          }
          <DepartmentLabel
            inputId={`${index + 1}_extra_mover`}
            index={index}
            name={`extraMover${index}`}
            title={'Hourly rate per extra mover'}
            placeholder={'ex. 40'}
            value={rate[`extraMover${index}`]}
            changeValue={(evt) => setRatesValue(evt, index)}
            valueType={'$'}
            isFocused={lastTarget === `extraMover${index}`}
          />
          {showComponent(
            index === 0,
            <DepartmentRadiobuttons
              title='Same for all the rates bellow'
              name='samePaymentForAll'
              isChecked={isSameRate}
              onChangeValue={onChangeSameRate}
              firstValue='Yes'
              secondValue='No'
            />
          )}
          <div className={styles.decorateLine}></div>
        </section>
        <section className={styles.rateSection}>
          <DepartmentLabel
            inputId={`${index + 1}_extra_truck`}
            index={index}
            name={`extraTruck${index}`}
            title={'Hourly rate per extra truck'}
            placeholder={'ex. 50'}
            value={rate[`extraTruck${index}`]}
            changeValue={(evt) => setRatesValue(evt, index)}
            valueType={'$'}
            isFocused={lastTarget === `extraTruck${index}`}
          />
          {showComponent(
            index === 0,
            <DepartmentRadiobuttons
              title={'Same for all the rates bellow'}
              name={'sameTruckForAll'}
              isChecked={isSameTruck}
              onChangeValue={onChangeSameTruck}
              firstValue='Yes'
              secondValue='No'
            />
          )}
        </section>
      </div>
    </fieldset>
  );
};

RateFieldset.propTypes ={
  rate: PropTypes.object.isRequired,
  rateType: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isSameRate: PropTypes.bool.isRequired,
  isSameTruck: PropTypes.bool.isRequired,
  setSameRate: PropTypes.func.isRequired,
  setSameTruck: PropTypes.func.isRequired,
  setRatesValue: PropTypes.func.isRequired,
  lastTarget: PropTypes.string,
};
