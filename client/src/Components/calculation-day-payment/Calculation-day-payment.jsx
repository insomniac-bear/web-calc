// Utils
import { calculateOfMovers, numberOfTrucks, totalTrucks } from '../../util/calculation-formulas';
// Styles
import styles from './CalculationDayPayment.module.css';

export const CalculationDayPayment = ({ calculationData }) => {
  const commonValues = { ...calculationData.commonValues };
  const localValues = { ...calculationData.dayPackingNoPacking }

  return(
    <div>
      {
        calculationData.department?.rates?.rateType &&
        calculationData.department?.rates?.rateType === 'extra' &&
        <p>{calculateOfMovers(commonValues, localValues)} movers and {numberOfTrucks(commonValues, localValues)} trucks for:</p>
      }
    </div>

  );
};
