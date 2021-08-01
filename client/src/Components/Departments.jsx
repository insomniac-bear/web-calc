// Third party libraries
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import { AddBtn } from './Add-btn';
import { DepatrmentList } from './Department-list';
import { Loading } from './Loading';
import { LoadMoreBtn } from './LoadMore-btn';
import { OutDataMessage } from './OutData-message';
import { SettingsContainer } from './Settings-container';
import { SettingsTitle } from './Settings-title';
// Functions for work with local state
import { getDepartments, getProcessDepartmentsLoading, loadDepartments } from '../clientStore/departmentsSlice/departments-slice';
// Util functions
import { showComponent } from '../util/utils';

export const Departments = ({ data }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDepartments());
  }, [dispatch]);
  const departments = useSelector(getDepartments);
  const loadingProcess = useSelector(getProcessDepartmentsLoading);

  return(
    <SettingsContainer>
      <AddBtn
        name={'department'}
        linkUrl={'/departmentadd'}
      />
      <SettingsTitle titleName={'departments'} />
      {
        showComponent(loadingProcess === 'loading', <Loading />)
      }
      {
        showComponent(loadingProcess === 'successed' && departments.length > 0, <DepatrmentList departments={departments}/>)
      }
      {
        showComponent(loadingProcess === 'successed' && departments.length === 0, 
        <OutDataMessage dataName={'Departments'}/>)
      }
      {showComponent(data.length > 0, <LoadMoreBtn />)}
    </SettingsContainer>
  );
};