// Third paty libraries
import PropTypes from 'prop-types';
//Components
import { DepartmentLabel } from '../department-label/Department-label';
import { DepartmentRadiobuttons } from '../department-radiobuttons/Department-radiobuttons';
import { DepartmentTitle } from '../department-title/Department-title';
import { SectionTitle } from '../section-title/Section-title';
// Styles
import styles from './LongDistance.module.css';

export const LongDistance = (props) => {
  const { distance, changeDistanceValue } = props;
  const changeRoundToFull = (value) => {
    switch (value) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        throw new Error('invalid data');
    }
  };
  return(
    <section>
      <DepartmentTitle title={'Long distance'} />
      <SectionTitle title={'Salary Expenses'}/>
      <div className={styles.distanceContainer}>
        <DepartmentLabel
          inputId={'foreman'}
          name={'foreman'}
          title={'Foreman'}
          placeholder={'ex: 23'}
          value={distance.salaryExpenses.foreman}
          changeValue={(evt) => changeDistanceValue(`longDistance.salaryExpenses.foreman`, 'set', evt.target.value)}
          valueType={'$/hour'}
          isLong={true}
        />
        <DepartmentLabel
          inputId={'helper'}
          name={'helper'}
          title={'Helper'}
          placeholder={'ex: 23'}
          value={distance.salaryExpenses.helper}
          changeValue={(evt) => changeDistanceValue(`longDistance.salaryExpenses.helper`, 'set', evt.target.value)}
          valueType={'$/hour'}
          isLong={true}
        />
        <DepartmentLabel
          inputId={'helperPlusCar'}
          name={'helperPlusCar'}
          title={'Helper + Car'}
          placeholder={'ex: 23'}
          value={distance.salaryExpenses.helperPlusCar}
          changeValue={(evt) => changeDistanceValue(`longDistance.salaryExpenses.helperPlusCar`, 'set', evt.target.value)}
          valueType={'$/hour'}
          isLong={true}
        />
      </div>
      <SectionTitle title={'Fuel Expenses'}/>
      <div className={styles.distanceContainer}>
        <DepartmentLabel
          inputId={'fuelPerGalon'}
          name={'fuelPerGalon'}
          title={'Fuel $ per galon'}
          placeholder={'ex: 23'}
          value={distance.fuelExpenses.fuelPerGalon}
          changeValue={(evt) => changeDistanceValue(`longDistance.fuelExpenses.fuelPerGalon`, 'set', evt.target.value)}
          valueType={'$'}
        />
        <DepartmentLabel
          inputId={'mielsPerGalon'}
          name={'mielsPerGalon'}
          title={'Miels per galon'}
          placeholder={'ex: 23'}
          value={distance.fuelExpenses.mielsPerGalon}
          changeValue={(evt) => changeDistanceValue(`longDistance.fuelExpenses.mielsPerGalon`, 'set', evt.target.value)}
          valueType={'$'}
        />
        <DepartmentLabel
          inputId={'extraAmountPerJob'}
          name={'extraAmountPerJob'}
          title={'Extra amount (one time per job)'}
          placeholder={'ex: 23'}
          value={distance.fuelExpenses.extraAmountPerJob}
          changeValue={(evt) => changeDistanceValue(`longDistance.fuelExpenses.extraAmountPerJob`, 'set', evt.target.value)}
          valueType={'$'}
        />
        <DepartmentLabel
          inputId={'extraAmountPerTruck'}
          name={'extraAmountPerTruck'}
          title={'Extra amount per truck'}
          placeholder={'ex: 23'}
          value={distance.fuelExpenses.extraAmountPerTruck}
          changeValue={(evt) => changeDistanceValue(`longDistance.fuelExpenses.extraAmountPerTruck`, 'set', evt.target.value)}
          valueType={'$'}
        />
        <div className={styles.distanceWrapper}>
          <DepartmentLabel
            inputId={'extraAmount'}
            placeholder={'ex. 20'}
            title={'Extra $ for each rate (depends on the number of rates created in the other setings form)'}
            name={'extraAmount'}
            value={distance.fuelExpenses.extraForEachRate.extraAmount}
            changeValue={(evt) => changeDistanceValue(`longDistance.fuelExpenses.extraForEachRate.extraAmount`, 'set', evt.target.value)}
            valueType={'$'}
          />
          <label className={styles.optionsContainer}>
            <p className={styles.radiobtnContainer}>
              <input
                type='radio'
                value='job'
                name='type'
                checked={distance.fuelExpenses.extraForEachRate.type === 'job'}
                onChange={(evt) => changeDistanceValue(`longDistance.fuelExpenses.extraForEachRate.type`, 'set', evt.target.value)}
              />
              Per job<br />
              <input
                type='radio'
                value='truck'
                name='type'
                checked={distance.fuelExpenses.extraForEachRate.type === 'truck'}
                onChange={(evt) => changeDistanceValue(`longDistance.fuelExpenses.extraForEachRate.type`, 'set', evt.target.value)}
              />
              Per truck
            </p>
          </label>
        </div>
      </div>
      <SectionTitle title={'Drive Time Round Up'}/>
        <div className={styles.distanceContainer}>
          <DepartmentLabel
            inputId={'smallDistance'}
            placeholder={'ex. 23'}
            title={'240-415 miles'}
            name={'smallDistance'}
            value={distance.driveTime.smallDistance}
            changeValue={(evt) => changeDistanceValue(`longDistance.driveTime.smallDistance`, 'set', evt.target.value)}
            valueType={'$'}
          />
          <DepartmentLabel
            inputId={'mediumDistance'}
            placeholder={'ex. 23'}
            title={'415-450 miles'}
            name={'mediumDistance'}
            value={distance.driveTime.mediumDistance}
            changeValue={(evt) => changeDistanceValue(`longDistance.driveTime.mediumDistance`, 'set', evt.target.value)}
            valueType={'$'}
          />
          <DepartmentLabel
            inputId={'largeDistance'}
            placeholder={'ex. 23'}
            title={'450-520 miles'}
            name={'largeDistance'}
            value={distance.driveTime.largeDistance}
            changeValue={(evt) => changeDistanceValue(`longDistance.driveTime.largeDistance`, 'set', evt.target.value)}
            valueType={'$'}
          />
        </div>
      <SectionTitle title={'Trucks Round Up'}/>
      <div className={styles.distanceContainer}>
        <DepartmentRadiobuttons
          title='Same for all the rates bellow'
          name='roundToFull'
          isChecked={distance.roundToFull}
          onChangeValue={(evt) => changeDistanceValue(`longDistance.roundToFull`, 'set', changeRoundToFull(evt.target.value))}
          firstValue='Yes'
          secondValue='No'
        />
      </div>

    </section>
  );
};

LongDistance.propTypes = {
  distance: PropTypes.object.isRequired,
  changeDistanceValue: PropTypes.func.isRequired,
}
