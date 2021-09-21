// Components
import { CalculationDayParams } from '../calculation-day-params/Calculation-day-params';
import { CalculationDayPayment } from '../calculation-day-payment/Calculation-day-payment';
// Utils
import {
  calculateOfMovers,
  totalCubicFt,
  numberOfTrucks,
  totalTrucks
} from '../../util/calculation-formulas';
// import { boxesKey } from '../../util/const';
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
      <CalculationDayParams commonValues={commonValues} localValues={localValues} />
      <p>The total amount of items is {totalTrucks(commonValues)} TRUCKS ({totalCubicFt(commonValues)} ft)</p>
      <CalculationDayPayment calculationData={calculationData} />
    </section>
  );
};
