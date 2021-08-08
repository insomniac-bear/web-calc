// Third paty libraries
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//Components
import { DepartmentForm } from '../Components/Department-form';
import { Footer } from '../Components/Footer';
import { Header } from '../Components/Header'
import { LoginPopup } from '../Components/Login-popup';
import { PageHeader } from '../Components/Page-header';
// Functions for work with local state
import { getUserId, getCompanyId } from '../clientStore/authSlice/auth-sliice';
import { saveDepartment, getDepartmentStatus, setDepartmentStatus } from '../clientStore/newDepartmentSlice/newDepartment-slice';
// DataModel
import { departmentDataModel } from '../models/department';
//Utils functions
import { IconNames, showComponent } from '../util/utils';

export default function DepartmentAdd () {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(getUserId);
  const companyId = useSelector(getCompanyId);
  const savedStatus = useSelector(getDepartmentStatus);

  const [formValue, setFormValue] = useState({
    ...departmentDataModel,
    authorId: userId,
    companyId,
  });
 
  const [isLoginPopup, loginPopupToggle] = useState(false);

  const formSubmit = (evt) => {
    evt.preventDefault();
    dispatch(saveDepartment(formValue));
    setFormValue({
      ...departmentDataModel,
      authorId: userId,
      companyId,
    });
  };

  const settingsHeaderBtns = [
    {
      name: 'Save',
      onClick: formSubmit,
    },
    {
      name: 'Cancel',
      onClick: () => {history.replace('/settings')}
    }
  ];

  useEffect(() => {
    if (savedStatus === 'successed') {
      dispatch(setDepartmentStatus({ status: 'idle' }));
      history.replace('/settings');
    }
  }, [ savedStatus, history, dispatch ]);

  return(
    // <div className='container'>
    //   {showComponent(isLoginPopup, <LoginPopup onBtnCloseClick={loginPopupToggle}/>)}
    //   <Header
    //     onLoginClick={loginPopupToggle}
    //     isLoginBtnShow={false}
    //   />
    //   <main className='main'>
    //     <PageHeader
    //       titleIcon={IconNames.PENCIL}
    //       title={'Add department'}
    //       btns={settingsHeaderBtns}
    //     />
        <DepartmentForm
          formValue={formValue}
          setFormValue={setFormValue}
        />
    //   </main>
    //   <Footer />
    // </div>
  );
};