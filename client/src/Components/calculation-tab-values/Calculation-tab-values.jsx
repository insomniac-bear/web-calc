// Third party libraries
import { nanoid } from 'nanoid';
// Styles
import styles from './CalculationTabValues.module.css';

export const CalculationTabValues = ({ rates }) => {
  return(
    <section className={styles.container}>
      { rates.length === 0 && <p>Select Department!</p> }
      {rates.length > 0 && 
        <label>
          Rate:
          <select
            className={styles.select}
            onChange={() => {}}
          >
            <option>None</option>
            {
              rates.map((rate, index) => {
                return(
                  <option key={nanoid(rates.length)}>{rate[`rateName${index}`]}</option>
                );
              })
            }
          </select>
        </label>
      }
      <fieldset className={styles.groupInput}>
        <label className={styles.inputContainer}>
          Movers to Load:
          <input
            type='text'
            name={'moversToLoad'}
            value={0}
            placeholder={'ex: 2'}
            onChange={() => {}}
          />
        </label>
        <label className={styles.inputContainer}>
          Add Movers:
          <input
            type='text'
            name={'addMovers'}
            value={0}
            placeholder={'ex: 2'}
            onChange={() => {}}
          />
        </label>
        <label className={styles.inputContainer}>
          Remove Movers:
          <input
            type='text'
            name={'removeMovers'}
            value={0}
            placeholder={'ex: 2'}
            onChange={() => {}}
          />
        </label>
        <label className={styles.inputContainer}>
          Movers to drives and unload:
          <input
            type='text'
            name={'moversToDrivesAndUnload'}
            value={0}
            placeholder={'ex: 2'}
            onChange={() => {}}
          />
        </label>
        <label className={styles.inputContainer}>
          Remove Trucks:
          <input
            type='text'
            name={'removeTrucks'}
            value={0}
            placeholder={'ex: 2'}
            onChange={() => {}}
          />
        </label>
        <label>
          NO 2 TRIPS
          <input
            type='checkbox'
            name={'noTwoTrips'}
            value={false}
            onChange={() => {}}
          />
        </label>
      </fieldset>
    </section>
  );
};