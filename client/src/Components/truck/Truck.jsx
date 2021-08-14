// Third party libraries
import PropTypes from 'prop-types';
// Components
import { DepartmentDoubleInput } from '../department-double-input/Department-double-input';
import { DepartmentLabel } from '../department-label/Department-label';
import { DepartmentTitle } from '../department-title/Department-title';
// Styles
import styles from './Truck.module.css';

export const Truck = (props) => {
  const {
    truckFee,
    changeTruckValue,
    clearLastTarget,
  } = props;

  const setTruckFee = (evt) => {
    changeTruckValue(`truckFee.${evt.target.name}`, 'set', evt.target.value);
  }

  const setTruckFeeDestination = (evt) => {
    changeTruckValue(`truckFee.truckDestionation.${evt.target.name}`, 'set', evt.target.value);
  };

  return(
    <section
      onFocus={clearLastTarget}
    >
      <DepartmentTitle title={'Truck fee'} />
      <label
        htmlFor='calculationMethod'
        className={styles.fieldName}
      >
        Calculation method
      </label>
      <select
        id='calculationMethod'
        className={styles.feeTypeSelect}
        name='calcMethod'
        onChange={(evt) => setTruckFee(evt)}
        value={truckFee.calcMethod}
      >
        <option
          value='simple'
        >
          Miles X Factorn
        </option>
        <option
          value='different'
        >
          Mile range
        </option>
      </select>

      <div className={styles.container}>
        <DepartmentLabel
          inputId={'truckReservation'}
          name={'truckReservation'}
          valueType={'$'}
          placeholder={'ex. 39'}
          value={truckFee.truckReservation}
          title={'Truck reservation fee'}
          changeValue={(evt) => setTruckFee(evt)}
        />
        <DepartmentDoubleInput
          values={truckFee.truckDestionation}
          changeValues={setTruckFeeDestination}
        />
      </div>
    </section>
  );
};

Truck.propTypes = {
  truckFee: PropTypes.object.isRequired,
  changeTruckValue: PropTypes.func.isRequired,
}
