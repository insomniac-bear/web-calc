// Third party libraries
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
// Components
import { CalculationList } from './Calculation-list';
import { CreateUserPopup } from './Create-user-popup';
import { Loading } from './Loading';
import { LoadMoreBtn } from './LoadMore-btn';
import { OutDataMessage } from './OutData-message';
import { Popup } from './Popup';
import { SettingsContainer } from './Settings-container';
import { SettingsHeader } from "./Settings-header";
import { SettingsTitle } from './Settings-title';
// Functions for work with local state
import { getCompanyId } from '../clientStore/authSlice/auth-sliice';
import { loadUsers, getUsers, getProcessUsersLoading } from '../clientStore/usersSlice/user-slice';
// Util functions
import { showComponent } from '../util/utils';

export const Users = () => {
  const dispatch = useDispatch();
  const [isPopup, togglePopup] = useState(false);
  const companyId = useSelector(getCompanyId);
  // const userRole = useState(getUserRole);
  useEffect(() => {
    dispatch(loadUsers(companyId));
  }, [ dispatch, companyId ]);
  const users = useSelector(getUsers);
  const loadingProcess = useSelector(getProcessUsersLoading);

  return(
    <SettingsContainer>
      {showComponent(isPopup, <Popup content={<CreateUserPopup />} onBtnCloseClick={togglePopup}/>)}
      <SettingsHeader
        btnType={'button'}
        handler={togglePopup}
        addBtnName={'user'}
        searchPlaceholder={'username'}
      />
      <SettingsTitle titleName={'users'} />
      {loadingProcess === 'loading' ?
        <Loading /> :
        users.length > 0 ? <CalculationList calculationData={users} /> :
        <OutDataMessage dataName={'Users'}/>
      }
      {showComponent(users.length > 0, <LoadMoreBtn />)}
    </SettingsContainer>
  );
};