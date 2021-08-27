// Third party libraries
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import * as immutable from 'object-path-immutable';
// Components
import { CalculationCommonValues } from '../calculation-common-values/Calculation-common-values';
import { CalculationDayResult } from '../calculation-day-result/Calculation-day-result';
import { CalculationTabDayValues } from '../calculation-tab-day-values/Calculation-tab-day-values';
import { CalculationTabs } from '../calculation-tabs/Calculatuon-tabs'
import { FormContainer } from '../form-container/Form-container';
// Local State Functions
import { loadDepartments } from '../../clientStore/departmentsSlice/departments-async-thunk';
import { getDepartments, getProcessDepartmentsLoading } from '../../clientStore/departmentsSlice/departments-slice';
// Data model
import { calculatorDataModel } from '../../models/calculator.js';
// Util
import { fetchedData } from '../../util/utils';
// Styles
import styles from './CalculationForm.module.css';

export const CalculationForm = () => {
  const dispatch = useDispatch();
  const loadingDepartmentsStatus = useSelector(getProcessDepartmentsLoading);
  const departments = useSelector(getDepartments);

  const [ calculationForm, setCalculationFormValue ] = useState(calculatorDataModel);

  const [rates, setRates] = useState([]);

  useEffect(() => {
    if (loadingDepartmentsStatus === 'idle') {
      dispatch(loadDepartments());
    }
  }, [dispatch, loadingDepartmentsStatus]);

  const onFormValueChange = (path, method, value) => {
    setCalculationFormValue(immutable[method](calculationForm, path, value));
  };

  const tabs = [
    {
      name: 'Day - Packing / No packing',
      action: () => {},
      isActive: true,
    },
    {
      name: '2 days - Packing',
      action: () => {},
      isActive: false,
    },
    {
      name: 'LONG - 1 day - Packing / No packing',
      action: () => {},
      isActive: false,
    },
    {
      name: 'LONG - 2 Days - Packing',
      action: () => {},
      isActive: false,
    },
  ];

  const onChangeDepartmentSelect = async (evt) => {
    if (evt.target.value === 'None') {
      setCalculationFormValue(immutable.set(calculationForm, 'dayPackingNoPacking.rate', 'none'));
      setRates([]);
      onFormValueChange('department', 'del');
      setCalculationFormValue({...calculationForm, department: undefined});
      return;
    }
    const selectedDepartment = await fetchedData('department/getDepartment', 'POST', {id: evt.target.value});
    if (selectedDepartment.status === 200) {
      setCalculationFormValue(immutable.set(calculationForm, 'department', { ...selectedDepartment.data }));
      setRates(selectedDepartment.data.rates.ratesList);
    }
  }

  return(
    <FormContainer>
      <form className={styles.form}>
        <header className={styles.header}>
          <h2 className='visually-hidden'>Form for calculate</h2>
          <fieldset className={styles.fieldset}>
            <label className={styles.label}>
              Calculation number
              <input
                className={styles.input}
                name={'calculationNumber'}
                value={calculationForm.name}
                onChange={
                  (evt) => {
                    onFormValueChange(evt.target.name, 'set', evt.target.value)
                  }
                }
                placeholder={'000000000000'}
              />
            </label>
            <label className={styles.label}>
              Department
              <select 
                className={styles.select}
                value={calculationForm.department !== undefined ? calculationForm.department._id : 'None'}
                onChange={onChangeDepartmentSelect}
              >
                <option value={undefined}>None</option>
                {
                  departments.map((department) => {
                    return(
                      <option key={nanoid(departments.length)} value={department._id}>{department.departmentName}</option>
                    );
                  })
                }
              </select>
            </label>
          </fieldset>
          <section className={styles.greedContainer}>
            <CalculationTabs tabList={tabs}/>
            <CalculationCommonValues 
              commonValues={calculationForm.commonValues}
              onFormChange={onFormValueChange}
            />
            <CalculationTabDayValues
              rates={rates ? rates : []}
              formData={calculationForm}
              formChange={onFormValueChange}
            />
            <CalculationDayResult calculationData={calculationForm}/>
          </section>
        </header>
      </form>
    </FormContainer>
  );
};
