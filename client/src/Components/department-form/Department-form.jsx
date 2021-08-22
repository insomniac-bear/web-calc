// Third party libraries
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { nanoid } from 'nanoid';
import * as immutable from 'object-path-immutable';
// Components
import { BtnSubmit } from '../btn-submit/Btn-submit';
import { ExtraOptions } from '../extra-options/Extra-options';
import { FormContainer } from '../form-container/Form-container';
import { LongDistance } from '../long-distance/Long-distance';
import { Packing } from '../packing/Packing';
import { DepartmentRates } from '../department-rates/Department-rates';
import { Truck } from '../truck/Truck';
// Local State Functions
import { getUserId, getCompanyId } from '../../clientStore/authSlice/auth-sliice';
import {
  getDepartmentSavingStatus,
  setDepartmentSavingStatus,
  setDepartmentLoadingStatus,
} from '../../clientStore/departmentSlice/department-slice';
import {
  saveDepartment,
  updateDepartment,
} from '../../clientStore/departmentSlice/department-async-thunk';
import { 
  getDepartments,
  setDepartmentsLoadingStatus,
} from '../../clientStore/departmentsSlice/departments-slice';
// DataModel
import { departmentDataModel } from '../../models/department';
// Utils
import { fetchedData } from '../../util/utils';
//Styles
import styles from './DepartmentForm.module.css';

export const DepartmentForm = ({ departmentData, formType = 'new', departmentId = undefined }) => {
 
  const [lastTarget, setLastTarget] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(getUserId);
  const companyId = useSelector(getCompanyId);
  const savedStatus = useSelector(getDepartmentSavingStatus);
  const departments = useSelector(getDepartments);

  const department = departmentData ? departmentData : departmentDataModel;

  const [formValue, setFormValue] = useState({
    ...department,
    authorId: userId,
    version: department.version + 1,
    companyId,
  });

  const renderDepartmentsOptions = (departments) => {
    if (departments.length > 0) {
      return(
        departments.map((department) => {
          return(
            <option value={department._id} key={nanoid(departments.length)}>
              {department.departmentName}
            </option>
          );
        })
      );
    }
    return('');
  };

  const onChangeSameAsSelect = async (evt) => {
    const copiedDepartment = await fetchedData('department/getDepartment', 'POST', {id: evt.target.value});
    if (copiedDepartment.status === 200) {
      setFormValue({
        ...copiedDepartment.data,
        _id: department._id ? department._id : undefined,
        authorId: userId,
        version: department.version + 1,
        companyId,
        departmentName: department.departmentName,
      });
    }
  }

  const formSubmit = (evt) => {
    evt.preventDefault();

    switch (formType) {
      case 'new':
        dispatch(saveDepartment(formValue));
        break;
      case 'edit':
        dispatch(updateDepartment(formValue, departmentId));
        break;
      default:
        throw new Error ('Invalid form type');
    }

    setFormValue({
      ...departmentDataModel,
      authorId: userId,
      companyId,
    });
  };

  useEffect(() => {
    if (savedStatus === 'successed') {
      dispatch(setDepartmentSavingStatus({ status: 'idle' }));
      dispatch(setDepartmentLoadingStatus({ status: 'idle' }));
      dispatch(setDepartmentsLoadingStatus({status: 'idle'}));
      history.replace('/departments');
    }
  }, [ savedStatus, history, dispatch ]);

  const onFormValueChange = (path, method, value) => {
    setFormValue(immutable[method](formValue, path, value));
  };

  const clearLastTarget = () => {
    if (lastTarget) {
      setLastTarget(undefined);
    }
  }

  return(
    <FormContainer>
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
              required
            />
          </div>
          <div>
            <label htmlFor='sameAs' className={styles.fieldName}>Same as</label>
            <select
              id='sameAs'
              className={styles.departmentField}
              onFocus={clearLastTarget}
              onChange={onChangeSameAsSelect}
            >
              <option>None</option>
              {renderDepartmentsOptions(departments)}
            </select>
          </div>
        </fieldset>
        <DepartmentRates
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
        <BtnSubmit
          isActive={true}
          action={formSubmit}
          name={'Save'}
        />
      </form>
    </FormContainer>
  );
};
