//Third party libraries
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// Components
import { DepartmentForm } from '../department-form/Department-form';
import { Loading } from '../loading/Loading';
// Functions for work with store
import {
  getDepartment,
  getDepartmentLoadingStatus,
} from '../../clientStore/departmentSlice/department-slice';
import { loadDepartment } from '../../clientStore/departmentSlice/department-async-thunk';
import { showComponent } from '../../util/utils';

export const DepartmentEdit = () => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(getDepartmentLoadingStatus);
  const department = useSelector(getDepartment);
  const params = useParams();

  const id = params.departmentId;

  useEffect(() => {
    if (loadingStatus === 'idle') {
      dispatch(loadDepartment(id));
    }
  }, [ dispatch, id, loadingStatus ]);

  return(
    <React.Fragment>
      {showComponent(loadingStatus !== 'successed', <Loading />)}
      {showComponent(loadingStatus === 'successed', <DepartmentForm departmentData={ department } formType={'edit'} departmentId={id} />)}
    </React.Fragment>
  );
}