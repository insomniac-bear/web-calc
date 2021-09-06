// Utils
import {
  calculateOfMovers,
  totalCubicFt,
  totalBoxes,
} from '../../util/calculation-formulas';
import { boxesKey } from '../../util/const';
// Styles
import styles from './CalculationDayResult.module.css';

export const CalculationDayResult = (props) => {
  const { calculationData } = props;
  const commonValues = { ...calculationData.commonValues };
  const localValues = { ...calculationData.dayPackingNoPacking }

  return(
    <section className={styles.container}>
      <h2 className={styles.title}>Calculation</h2>
      {calculationData &&
        <div className={styles.selectedInfo}>
          {calculationData.department && <p className={styles.departmentName}>{calculationData.department.departmentName}</p>}
          {calculationData.dayPackingNoPacking.rate && <p className={styles.rateName}>{calculationData.dayPackingNoPacking.rate}</p>}
        </div>
      }
      <ul className={styles.paramsSection}>
        <li className={styles.paramsItem}>
          <p className={styles.paramsName}>Total Cubic:</p>
          <span className={styles.paramsDecor}></span>
          <p className={styles.paramsValue}>{totalCubicFt(commonValues)} ft.</p>
        </li>
        <li className={styles.paramsItem}>
          <p className={styles.paramsName}>Small boxes:</p>
          <span className={styles.paramsDecor}></span>
          <p className={styles.paramsValue}>{totalBoxes(commonValues, boxesKey.SMALL)}</p>
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
       </ul>
    </section>
  );
};
