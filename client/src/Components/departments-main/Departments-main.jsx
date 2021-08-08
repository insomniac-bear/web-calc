// Third party libraries
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
// Components
import { AddBtn } from '../add-btn/Add-btn';
import { DepatrmentList } from '../Department-list';
import { Loading } from '../Loading';
import { OutDataMessage } from '../OutData-message';
import { SettingsContainer } from '../Settings-container';
import { SettingsTitle } from '../Settings-title';
// State functions
import {
  getProcessDepartmentsLoading,
  getDepartments,
} from '../../clientStore/departmentsSlice/departments-slice';
import { loadDepartments } from '../../clientStore/departmentsSlice/departments-async-thunk';
import {
  getDepartmentLoadingStatus,
  getDepartmentSavingStatus,
  setDepartmentLoadingStatus,
  setDepartmentSavingStatus,
} from '../../clientStore/departmentSlice/department-slice';

export const DepartmentsMain = () => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();

  const departments = useSelector(getDepartments);
  const loadingProcess = useSelector(getProcessDepartmentsLoading);
  const departmentIsLoading = useSelector(getDepartmentLoadingStatus);
  const departmentIsSaving = useSelector(getDepartmentSavingStatus);

  useEffect(() => {
    if (loadingProcess === 'idle') {
      dispatch(loadDepartments());
    }
    if (departmentIsLoading !== 'idle') {
      dispatch(setDepartmentLoadingStatus({status: 'idle'}));
    }
    if (departmentIsSaving !== 'idle') {
      dispatch(setDepartmentSavingStatus({status: 'idle'}));
    }
  }, [ dispatch, loadingProcess, departmentIsLoading, departmentIsSaving ]);

  return(
    <SettingsContainer>
      <AddBtn
        name={'department'}
        linkUrl={`${url}/add`}
        btnType={'link'}
      />
      <SettingsTitle titleName={'departments'} />
      { loadingProcess === 'loading' && <Loading /> }
      { loadingProcess === 'successed' && departments.length > 0 && <DepatrmentList departments={departments} /> }
      { loadingProcess === 'successed' && departments.length === 0 && <OutDataMessage dataName={'Departments'} /> }
    </SettingsContainer>
  );
};