// Utils
import { showComponent } from '../util/utils';
// Styles
import styles from '../styles/RateFieldset.module.css';

export const RateFieldset = (props) => {
  const { rate, rateIndex, isSameRate, isSameTruck, setSameRate, setSameTruck, setRatesValue } = props;

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
      className={styles.inputGroup}
    >
      <legend className={styles.rateName}>Rate #{rateIndex + 1}</legend>
      <div className='ratesContainer'>
        <label
          className={styles.inputContainer}
          htmlFor={`rate_${rateIndex + 1}_name`}
        >
          <p className={styles.inputName}>Name</p>
          <input
            id={`rate_${rateIndex + 1}_name`}
            className={styles.input}
            type='text'
            placeholder='Enter name of rate'
            name='rateName'
            value={rate.name}
            onChange={(evt) => setRatesValue(evt, rateIndex)}
          />
        </label>
      </div>
      <div className='ratesContainer'>
        <section className={styles.rateSection}>
          <label
            className={styles.inputContainer}
            htmlFor={`${rateIndex+1}_cash_payment`}
          >
          <p className={styles.inputName}>Hoyrly rate for 2 movers <span className='uppercase'>cash payment</span></p>
            <span className={styles.inputValueType}>$</span>
            <input
              id={`${rateIndex+1}_cash_payment`}
              className={styles.input}
              type='text'
              placeholder='ex. 99'
              name='cashPayment'
              value={rate.cashPayment}
              onChange={(evt) => setRatesValue(evt, rateIndex)}
            />
          </label>
          <label
            className={styles.inputContainer}
            htmlFor={`${rateIndex + 1}_card_payment`}
          >
            <p className={styles.inputName}>Extra hourly amount for <span className='uppercase'>card payment</span></p>
            <span className={styles.inputValueType}>$</span>
            <input
              id={`${rateIndex + 1}_card_payment`}
              className={styles.input}
              type='text'
              placeholder='ex. 10'
              name='cardPayment'
              value={rate.cardPayment}
              onChange={(evt) => setRatesValue(evt, rateIndex)}
            />
          </label>
          <label
            className={styles.inputContainer}
            htmlFor={`${rateIndex + 1}_extra_mover`}
          >
            <p className={styles.inputName}>Hourly rate per extra mover</p>
            <span className={styles.inputValueType}>$</span>
            <input
              id={`${rateIndex + 1}_extra_mover`}
              className={styles.input}
              type='text'
              placeholder='ex. 40'
              name='extraMover'
              value={rate.extraMover}
              onChange={(evt) => setRatesValue(evt, rateIndex)}
            />
          </label>
          {showComponent(
            rateIndex === 0,
            <label className={styles.inputContainer}>
              <p className={styles.inputName}>Same for all the rates bellow</p>
              <p>
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
            htmlFor={`${rateIndex + 1}_extra_truck`}
          >
            <p className={styles.inputName}>Hourly rate per extra truck</p>
            <span className={styles.inputValueType}>$</span>
            <input
              id={`${rateIndex + 1}_extra_truck`}
              className={styles.input}
              type='text'
              placeholder='ex. 50'
              name='extraTruck'
              value={rate.extraTruck}
              onChange={(evt) => setRatesValue(evt, rateIndex)}
            />
          </label>
          {showComponent(
            rateIndex === 0,
            <label className={styles.inputContainer}>
              <p className={styles.inputName}>Same for all the rates bellow</p>
              <p>
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
  );
};
