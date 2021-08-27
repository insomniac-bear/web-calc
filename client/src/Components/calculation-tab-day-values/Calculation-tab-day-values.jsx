// Third party libraries
import { nanoid } from 'nanoid';
// Styles
import styles from './CalculationTabDayValues.module.css';

export const CalculationTabDayValues = ({ rates, formData, formChange }) => {

  const onValueChange = (evt) => {
    formChange(`dayPackingNoPacking.${evt.target.name}`, 'set', evt.target.value)
  }

  const checkboxValueChange = (evt) => {

    switch (evt.target.value) {
      case 'true':
        return formChange(`dayPackingNoPacking.${evt.target.name}`, 'set', false);
      case 'false':
        return formChange(`dayPackingNoPacking.${evt.target.name}`, 'set', true);
      default:
        break;
    }
  };

  return(
    <section className={styles.container}>
      { rates.length === 0 && <p className={styles.worning}>Select Department!</p> }
      {rates.length > 0 &&
        <label>
          Rate:
          <select
            className={styles.select}
            value={formData.dayPackingNoPacking.rate}
            onChange={(evt) => formChange('dayPackingNoPacking.rate', 'set', evt.target.value)}
          >
            <option value={''}>None</option>
            {
              rates.map((rate, index) => {
                return(
                  <option key={nanoid(rates.length)} value={rate[`rateName${index}`]}>{rate[`rateName${index}`]}</option>
                );
              })
            }
          </select>
        </label>
      }
      <fieldset className={styles.groupInput}>
        <label className={styles.inputContainer}>
          Add Movers:
          <input
            type='text'
            name={'addMovers'}
            value={formData.dayPackingNoPacking.addMovers}
            placeholder={'ex: 2'}
            onChange={onValueChange}
          />
        </label>
        <label className={styles.inputContainer}>
          Remove Movers:
          <input
            type='text'
            name={'removeMovers'}
            value={formData.dayPackingNoPacking.removeMovers}
            placeholder={'ex: 2'}
            onChange={onValueChange}
          />
        </label>
        <label className={styles.inputContainer}>
          Remove Trucks:
          <input
            type='text'
            name={'removeTrucks'}
            value={formData.dayPackingNoPacking.removeTrucks}
            placeholder={'ex: 2'}
            onChange={onValueChange}
          />
        </label>
        <label>
          NO 2 TRIPS
          <input
            type='checkbox'
            name={'noTwoTrips'}
            value={formData.dayPackingNoPacking.noTwoTrips}
            onChange={checkboxValueChange}
          />
        </label>
        <div className={styles.decorateContainer}>
          <label className={styles.inputContainer}>
            Movers to Load:
            <input
              type='text'
              name={'moversToLoad'}
              value={formData.dayPackingNoPacking.moversToLoad}
              placeholder={'ex: 2'}
              onChange={onValueChange}
            />
          </label>
          <label className={styles.inputContainer}>
            Movers to drives and unload:
            <input
              type='text'
              name={'moversToDrivesAndUnload'}
              value={formData.dayPackingNoPacking.moversToDrivesAndUnload}
              placeholder={'ex: 2'}
              onChange={onValueChange}
            />
          </label>
        </div>
      </fieldset>
    </section>
  );
};