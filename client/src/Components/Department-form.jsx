// Third party libraries
import { useState } from 'react';
import { nanoid } from 'nanoid';
import * as immutable from 'object-path-immutable';
// Components
import { Icon } from './Icon';
// Util
import { showComponent } from '../util/utils';
import { IconNames } from '../util/const';
//Styles
import styles from '../styles/DepartmentForm.module.css';

export const DepartmentForm = () => {
  const initialFormState = {
    departmentName: '',
    version: 0,
    rates: [{
      rateName0: '',
      cashPayment0: '',
      cardPayment0: '',
      extraMover0: '',
      extraTruck0: '',
    }],
    truckFee: {
      calcMethod: 'simple',
      truckReservation: '',
      truckDestionation: {
        fee: '',
        miles: '',
      },
    },
    extraOptions: {
      havyItem: '',
      shuttle: {
        charge: '',
        period: 'hourly',
      }
    },
  };

  const [formValue, setFormValue] = useState(initialFormState);
  const [isSameRate, setSameRate] = useState(false);
  const [isSameTruck, setSameTruck] = useState(false);
  const [lastTarget, setLastTarget] = useState();

  const addRateBtnClick = (index) => {
    const newRate = {
      [`rateName${index}`]: '',
      [`cashPayment${index}`]: isSameRate ? formValue.rates[0].cashPayment0 : '',
      [`cardPayment${index}`]: isSameRate ? formValue.rates[0].cardPayment0 : '',
      [`extraMover${index}`]: isSameRate ? formValue.rates[0].extraMover0 : '',
      [`extraTruck${index}`]: isSameTruck ? formValue.rates[0].extraTruck0 : '',
    };
    setFormValue(immutable.push(formValue, 'rates', newRate));
  };

  const changeFormValue = (evt) => {
    evt.preventDefault();
    setFormValue(immutable.set(formValue, `${evt.target.name}`, evt.target.value));
  };

  const setRatesValue = (evt, index) => {
    setLastTarget(evt.target.name);
    setFormValue(immutable.set(formValue, `rates.${index}.${evt.target.name}`, evt.target.value));
  };

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

  const setTruckFee = (evt) => {
    setFormValue(immutable.set(formValue, `truckFee.${evt.target.name}`, evt.target.value));
  };

  const setTruckDestination = (evt) => {
    setFormValue(immutable.set(formValue, `truckFee.truckDestionation.${evt.target.name}`, evt.target.value));
  };

  const setHavyItem = (evt) => {
    setFormValue(immutable.set(formValue, `extraOptions.havyItem`, evt.target.value));
  };

  const setShuttle = (evt) => {
    setFormValue(immutable.set(formValue, `extraOptions.shuttle.${evt.target.name}`, evt.target.value));
  };

  const clearLastTarget = () => {
    setLastTarget(undefined);
  }

  return(
    <form className={styles.form}>
      <h2 className='visually-hidden'>Form for add new department</h2>
      <fieldset className={styles.formHeader}>
        <legend className="visually-hidden">Common settings for department</legend>
        <div className={styles.fieldContainer}>
          <label htmlFor='departmentName' className={styles.fieldName}>Department name</label>
          <input
            id='departmentName'
            className={styles.departmentField}
            type='text'
            placeholder='City or Town where you have a branch'
            name='departmentName'
            value={formValue.departmentName}
            onChange={(evt) => changeFormValue(evt)}
            onFocus={clearLastTarget}
          />
        </div>
        <div>
          <label htmlFor='sameAs' className={styles.fieldName}>Same as</label>
          <select id='sameAs' className={styles.departmentField}>
            <option>None</option>
            <option>Chicago</option>
          </select>
        </div>
      </fieldset>
      <section>
        <h3 className={styles.sectionName}>Rates</h3>
        {
          formValue.rates.map((rate, index) => {
            return(
              <fieldset
                key={nanoid(10)}
                className={styles.inputGroup}
              >
                <legend className={styles.rateName}>Rate #{index + 1}</legend>
                <div className='ratesContainer'>
                  <label
                    className={styles.inputContainer}
                    htmlFor={`rate_${index + 1}_name`}
                  >
                    <p className={styles.inputName}>Name</p>
                    <input
                      id={`rate_${index + 1}_name`}
                      className={styles.input}
                      type='text'
                      placeholder='Enter name of rate'
                      name={`rateName${index}`}
                      value={rate[`rateName${index}`]}
                      onChange={(evt) => setRatesValue(evt, index)}
                      autoFocus={lastTarget === `rateName${index}`}
                    />
                  </label>
                </div>
                <div className='ratesContainer'>
                  <section className={styles.rateSection}>
                    <label
                      className={styles.inputContainer}
                      htmlFor={`${index+1}_cash_payment`}
                    >
                    <p className={styles.inputName}>Hoyrly rate for 2 movers <span className='uppercase'>cash payment</span></p>
                      <span className={styles.inputValueType}>$</span>
                      <input
                        id={`${index+1}_cash_payment`}
                        className={styles.input}
                        type='text'
                        placeholder='ex. 99'
                        name={`cashPayment${index}`}
                        value={rate[`cashPayment${index}`]}
                        onChange={(evt) => setRatesValue(evt, index)}
                        autoFocus={lastTarget === `cashPayment${index}`}
                      />
                    </label>
                    <label
                      className={styles.inputContainer}
                      htmlFor={`${index + 1}_card_payment`}
                    >
                      <p className={styles.inputName}>Extra hourly amount for <span className='uppercase'>card payment</span></p>
                      <span className={styles.inputValueType}>$</span>
                      <input
                        id={`${index + 1}_card_payment`}
                        className={styles.input}
                        type='text'
                        placeholder='ex. 10'
                        name={`cardPayment${index}`}
                        value={rate[`cardPayment${index}`]}
                        onChange={(evt) => setRatesValue(evt, index)}
                        autoFocus={lastTarget === `cardPayment${index}`}
                      />
                    </label>
                    <label
                      className={styles.inputContainer}
                      htmlFor={`${index + 1}_extra_mover`}
                    >
                      <p className={styles.inputName}>Hourly rate per extra mover</p>
                      <span className={styles.inputValueType}>$</span>
                      <input
                        id={`${index + 1}_extra_mover`}
                        className={styles.input}
                        type='text'
                        placeholder='ex. 40'
                        name={`extraMover${index}`}
                        value={rate[`extraMover${index}`]}
                        onChange={(evt) => setRatesValue(evt, index)}
                        autoFocus={lastTarget === `extraMover${index}`}
                      />
                    </label>
                    {showComponent(
                      index === 0,
                      <label className={styles.inputContainer}>
                        <p className={styles.inputName}>Same for all the rates bellow</p>
                        <p className={styles.radiobtnContainer}>
                          <input
                            type='radio'
                            value={true}
                            name='samePaymentForAll'
                            checked={isSameRate}
                            onChange={onChangeSameRate}
                          />
                          Yes<br />
                          <input
                            type='radio'
                            value={false}
                            name='samePaymentForAll'
                            checked={!isSameRate}
                            onChange={onChangeSameRate}
                          />
                          No
                        </p>
                      </label>
                    )}
                    <div className={styles.decorateLine}></div>
                  </section>
                  <section className={styles.rateSection}>
                    <label
                      className={styles.inputContainer}
                      htmlFor={`${index + 1}_extra_truck`}
                    >
                      <p className={styles.inputName}>Hourly rate per extra truck</p>
                      <span className={styles.inputValueType}>$</span>
                      <input
                        id={`${index + 1}_extra_truck`}
                        className={styles.input}
                        type='text'
                        placeholder='ex. 50'
                        name={`extraTruck${index}`}
                        value={rate[`extraTruck${index}`]}
                        onChange={(evt) => setRatesValue(evt, index)}
                        autoFocus={lastTarget === `extraTruck${index}`}
                      />
                    </label>
                    {showComponent(
                      index === 0,
                      <label className={styles.inputContainer}>
                        <p className={styles.inputName}>Same for all the rates bellow</p>
                        <p className={styles.radiobtnContainer}>
                          <input
                            type='radio'
                            value={true}
                            name='sameTruckForAll'
                            checked={isSameTruck}
                            onChange={onChangeSameTruck}
                          />
                          Yes<br />
                          <input
                            type='radio'
                            value={false}
                            name='sameTruckForAll'
                            checked={!isSameTruck}
                            onChange={onChangeSameTruck}
                          />
                          No
                        </p>
                      </label>)
                    }
                  </section>
                </div>
              </fieldset>
            )
          })
        }
        <button
          className={styles.addRateBtn}
          onClick={
            (evt) => {
              evt.preventDefault();
              addRateBtnClick(formValue.rates.length);
            }
          }
        >
          <Icon name={IconNames.PLUS}/>
          Add rate
        </button>
      </section>
      <section>
        <h3 className={styles.sectionName}>Truck fee</h3>
          <label htmlFor='calculationMethod' className={styles.fieldName}>Calculation method</label>
          <select
            id='calculationMethod'
            className={styles.feeTypeSelect}
            name='calcMethod'
            onChange={(evt) => setTruckFee(evt)}
            onFocus={clearLastTarget}
          >
            <option
              value='simple'
              selected={formValue.truckFee.calcMethod === 'simple'}
            >
              Simple calculation
            </option>
            <option
              value='different'
              selected={formValue.truckFee.calcMethod === 'different'}
            >
              Different calculation
            </option>
          </select>

          <div className={styles.rateSection}>
            <label
              className={styles.inputContainer}
              htmlFor='truckReservation'
            >
            <p className={styles.inputName}>Truck reservation fee</p>
              <span className={styles.inputValueType}>$</span>
              <input
                id='truckReservation'
                className={styles.input}
                type='text'
                placeholder='ex. 39'
                name='truckReservation'
                value={formValue.truckFee.truckReservation}
                onChange={(evt) => setTruckFee(evt)}
              />
            </label>
            <label
              className={styles.inputContainer}
              htmlFor='distinationFee'
            >
            <p className={styles.inputName}>Distination fee</p>
              <span className={styles.inputValueType}>$</span>
              <input
                id='distinationFee'
                className={styles.doubleInput}
                type='text'
                placeholder='ex. 160'
                name='fee'
                value={formValue.truckFee.truckDestionation.fee}
                onChange={(evt) => setTruckDestination(evt)}
              />
              <span>/</span>
              <span className={styles.inputValueTypeSecond}>miles</span>
              <input
                id='distinationFee'
                className={styles.doubleInputSecond}
                type='text'
                placeholder='ex. 140'
                name='miles'
                value={formValue.truckFee.truckDestionation.miles}
                onChange={(evt) => setTruckDestination(evt)}
              />
            </label>
          </div>
      </section>
      <section>
        <h3 className={styles.sectionName}>Extra options</h3>
        <div className={styles.rateSection}>
          <label
            className={styles.inputContainer}
            htmlFor='havyItem'
          >
          <p className={styles.inputName}>Havy item charge</p>
            <span className={styles.inputValueType}>$</span>
            <input
              id='havyItem'
              className={styles.input}
              type='text'
              placeholder='ex. 160'
              name='havyItem'
              value={formValue.extraOptions.havyItem}
              onChange={(evt) => setHavyItem(evt)}
            />
          </label>
          <div className={styles.shuttleContainer}>
            <label
              className={styles.inputContainer}
              htmlFor='shuttle'
            >
            <p className={styles.inputName}>Havy item charge</p>
              <span className={styles.inputValueType}>$</span>
              <input
                id='shuttle'
                className={styles.input}
                type='text'
                placeholder='ex. 160'
                name='charge'
                value={formValue.extraOptions.shuttle.charge}
                onChange={(evt) => setShuttle(evt)}
              />
            </label>
            <label className={styles.inputContainer}>
              <p className={styles.radiobtnContainer}>
                <input
                  type='radio'
                  value='hourly'
                  name='period'
                  checked={formValue.extraOptions.shuttle.period === 'hourly'}
                  onChange={(evt) => setShuttle(evt)}
                />
                Hourly<br />
                <input
                  type='radio'
                  value='daily'
                  name='period'
                  checked={formValue.extraOptions.shuttle.period === 'daily'}
                  onChange={(evt) => setShuttle(evt)}
                />
                Daily
              </p>
            </label>
          </div>
        </div>
      </section>
    </form>
  );
};