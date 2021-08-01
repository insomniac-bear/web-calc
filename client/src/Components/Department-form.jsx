// Third party libraries
import { useState } from 'react';
import * as immutable from 'object-path-immutable';
// Components
import { ExtraOptions } from './Extra-options';
import { LongDistance } from './Long-distance';
import { Packing } from './Packing';
import { Rates } from './Rates';
import { Truck } from './Truck';
//Styles
import styles from '../styles/DepartmentForm.module.css';

export const DepartmentForm = ({ formValue, setFormValue }) => {
 
  const [lastTarget, setLastTarget] = useState();

  const onFormValueChange = (path, method, value) => {
    setFormValue(immutable[method](formValue, path, value));
  };

  const clearLastTarget = () => {
    if (lastTarget) {
      setLastTarget(undefined);
    }
  }

  return(
    <form className={styles.form}>
      <h2 className='visually-hidden'>Form for add new department</h2>
      <fieldset className={styles.formHeader}>
        <legend className="visually-hidden">Common settings for department</legend>
        <div className={styles.fieldContainer}>
          <label htmlFor='departmentName' className={styles.fieldName}>Department name</label>
          <input
            id='departmentName'
            className={styles.departmentField}
            type='text'
            placeholder='City or Town where you have a branch'
            name='departmentName'
            value={formValue.departmentName}
            onChange={(evt) => onFormValueChange(evt.target.name, 'set', evt.target.value)}
            onFocus={clearLastTarget}
          />
        </div>
        <div>
          <label htmlFor='sameAs' className={styles.fieldName}>Same as</label>
          <select
            id='sameAs'
            className={styles.departmentField}
            onFocus={clearLastTarget}
          >
            <option>None</option>
            <option>Chicago</option>
          </select>
        </div>
      </fieldset>
      <Rates
        rates={formValue.rates}
        setDepartmentFormValue={onFormValueChange}
        lastTarget={lastTarget}
        setLastTarget={setLastTarget}
      />
      <Truck
        truckFee={formValue.truckFee}
        changeTruckValue={onFormValueChange}
        clearLastTarget={clearLastTarget}
      />
      <ExtraOptions
        extraOptions={formValue.extraOptions}
        changeExtraOptions={onFormValueChange}
      />
      <Packing
        packing={formValue.packing}
        changePackingValue={onFormValueChange}
      />
      <LongDistance
        distance={formValue.longDistance}
        changeDistanceValue={onFormValueChange}
      />
    </form>
  );
};