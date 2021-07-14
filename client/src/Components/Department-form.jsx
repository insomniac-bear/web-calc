// Third party libraries
import { useState } from 'react';
import { useSelector } from 'react-redux';
// State functions
import { getCompanyId, getUserId } from '../clientStore/authSlice/auth-sliice';
// Components
import { ExtraOptionsFieldset } from './ExtraOptionsFieldset';
import { RatesFieldset } from './Rates-fieldset';
import { TruckFieldset } from './TruckFieldset';
//Styles
import styles from '../styles/DepartmentForm.module.css';


export const DepartmentForm = () => {
  const companyId = useSelector(getCompanyId);
  const userId = useSelector(getUserId);

  const departmentDataStructure = {
    departmentName: '',
    dataCreate: Date.now(),
    companyId,
    userId,
    departments: [],
  };

  const departmentBodyStructure = {
    rates: [],
    truckFee: {
      truckReservation: '',
      distination: {
        fee: '',
        miles: '',
      },
    },
    extraOptions: {
      havyItemCharge: '',
      shuttleCharge: '',
      typeCharge: '',
    },
    packing: {
      firstBedroomKit: '',
      secondBedroomKit: '',
      thirthBedroomKit: '',
      fourthBedroomKit: '',
      fifthBedroomKit: '',
      sixthBedroomKit: '',
      seventhBedroomKit: '',
      eighthBedroomKit: '',
      ninethBedroomKit: '',
      tenthBedroomKit: '',
      kitchenPackingKits: '',
      taxOnPacking: '',
      smallBox: '',
      mediumBox: '',
      largBox: '',
      rollOfPackingPaper: '',
      rollOfBubbleWrap: '',
    },
    longDistance: {
      salaryExpenses: {
        foreman: '',
        helper: '',
        helperAndCar: '',
      },
      fuelExpenses: {
        fuelPricePerGalon: '',
        milesPerGalon: '',
        extraAmountPerJob: '',
        extraAmountPerTruck: '',
        expraPriceForEachRate: '',
        extraPriceType: '',
      },
      driveTime: {
        shortDistance: '',
        mediumDistance: '',
        longDistance: '',
      },
    },
    truckRoundUp: false,
  };

  const rateDataStructure = {
    rateName: '',
    rateForTwoMoversCashPayment: '',
    extraAmmountForCardPayment: '',
    ratePerExtraMover: '',
    ratePerExtraTruck: '',
  };

  const [rate, setRate] = useState(rateDataStructure);

  return(
    <form className={styles.form}>
      <h2 className='visually-hidden'>Form for add new department</h2>
      <fieldset className={styles.formHeader}>
        <div className={styles.fieldContainer}>
          <label htmlFor='departmentName' className={styles.fieldName}>Department name</label>
          <input
            id='departmentName'
            className={styles.departmentField}
            type='text'
            placeholder='City or Town where you have a branch'
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
      <RatesFieldset fieldsetName={'Rates'} onSetGroupValues={setRate} valuesGroup={rate}/>
      <TruckFieldset fieldsetName={'Truck fee'} valuesGroup={departmentBodyStructure.truckFee} onSetGroupValues={setRate} />
      <ExtraOptionsFieldset fieldsetName={'Extra Options'} valuesGroup={departmentBodyStructure.extraOptions} onSetGroupValues={setRate}/>
    </form>
  );
};