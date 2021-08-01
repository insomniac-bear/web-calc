// Third paty libraries
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Components
import { DepartmentForm } from '../Components/Department-form';
import { Footer } from '../Components/Footer';
import { Header } from '../Components/Header'
import { LoginPopup } from '../Components/Login-popup';
import { PageHeader } from '../Components/Page-header';
// Functions for work with local state
import { getUserId, getCompanyId } from '../clientStore/authSlice/auth-sliice';
import { saveDepartment } from '../clientStore/newDepartmentSlice/newDepartment-slice';
// DataModel
import { departmentDataModel } from '../models/department';
//Utils functions
import { IconNames, showComponent } from '../util/utils';

export default function DepartmentAdd () {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const companyId = useSelector(getCompanyId);

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
      onClick: () => {console.log('Click on Cancel btn')}
    }
  ];
  return(
    <div className='container'>
      {showComponent(isLoginPopup, <LoginPopup onBtnCloseClick={loginPopupToggle}/>)}
      <Header
        onLoginClick={loginPopupToggle}
        isLoginBtnShow={false}
      />
      <main className='main'>
        <PageHeader
          titleIcon={IconNames.PENCIL}
          title={'Add department'}
          btns={settingsHeaderBtns}
        />
        <DepartmentForm
          formValue={formValue}
          setFormValue={setFormValue}
        />
      </main>
      <Footer />
    </div>
  );
};