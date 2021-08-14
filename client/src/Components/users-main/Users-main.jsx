// Third party libraries
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom';
// Components
import { AddBtn } from '../add-btn/Add-btn';
import { Loading } from '../loading/Loading';
import { OutDataMessage } from '../outdata-message/OutData-message';
import { SettingsContainer } from '../settings-container/Settings-container';
import { SettingsTitle } from '../settings-title/Settings-title';
import { UsersList } from '../users-list/Users-list';
// Functions for work with local state
import { getCompanyId } from '../../clientStore/authSlice/auth-sliice';
import {
  getUsers,
  getProcessUsersLoading,
} from '../../clientStore/usersSlice/user-slice';
import { loadUsers } from '../../clientStore/usersSlice/users-async-thunk';

export const UsersMain = () => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const companyId = useSelector(getCompanyId);
  const users = useSelector(getUsers);
  const loadingProcess = useSelector(getProcessUsersLoading);

  useEffect(() => {
    if (loadingProcess === 'idle') {
      dispatch(loadUsers(companyId));
    }
  }, [ dispatch, companyId, loadingProcess ]);


  return(
    <SettingsContainer>
      <AddBtn
        name={'user'}
        linkUrl={`${url}/add`}
      />
      <SettingsTitle titleName={'users'} />
      { loadingProcess === 'loading' && <Loading /> }
      { loadingProcess === 'successed' && users.length > 0 && <UsersList users={users} /> }
      { loadingProcess === 'successed' && users.length === 0 && <OutDataMessage dataName={'Users'} /> }
    </SettingsContainer>
  );
};