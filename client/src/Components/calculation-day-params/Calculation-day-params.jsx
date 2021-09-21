// Calc util functions
import { calculateOfMovers, numberOfTrucks, totalBoxes, totalCubicFt } from '../../util/calculation-formulas';
import { boxesKey } from '../../util/const';
// Styles
import styles from './CalculationDayParams.module.css';

export const CalculationDayParams = ({commonValues, localValues}) => {
  return (
    <ul className={styles.paramsSection}>
      <li className={styles.paramsItem}>
        <p className={styles.paramsName}>Total Cubic:</p>
        <span className={styles.paramsDecor}></span>
        <p className={styles.paramsValue}>{totalCubicFt(commonValues)} ft.</p>
      </li>
      <li className={styles.paramsItem}>
        <p className={styles.paramsName}>Small boxes:</p>
        <span className={styles.paramsDecor}></span>
        <p className={styles.paramsValue}>{totalBoxes(commonValues, boxesKey.SMALL) }</p>
      </li>
      <li className={styles.paramsItem}>
        <p className={styles.paramsName}>Medium boxes:</p>
        <span className={styles.paramsDecor}></span>
        <p className={styles.paramsValue}>{totalBoxes(commonValues, boxesKey.MEDIUM)}</p>
      </li>
      <li className={styles.paramsItem}>
        <p className={styles.paramsName}>Fragile boxes:</p>
        <span className={styles.paramsDecor}></span>
        <p className={styles.paramsValue}>{totalBoxes(commonValues, boxesKey.FRAGILE)}</p>
      </li>
      <li className={styles.paramsItem}>
        <p className={styles.paramsName}>Movers:</p>
        <span className={styles.paramsDecor}></span>
        <p className={styles.paramsValue}>{calculateOfMovers(commonValues, localValues)}</p>
      </li>
      <li className={styles.paramsItem}>
        <p className={styles.paramsName}>Trucks:</p>
        <span className={styles.paramsDecor}></span>
        <p className={styles.paramsValue}>{numberOfTrucks(commonValues, localValues)}</p>
      </li>
    </ul>
  );
}