// Third paty libraries
import { useState } from 'react';
//Components
import { DepartmentForm } from '../Components/Department-form';
import { Footer } from '../Components/Footer';
import { Header } from '../Components/Header'
import { LoginPopup } from '../Components/Login-popup';
import { PageHeader } from '../Components/Page-header';
//Utils functions
import { IconNames, showComponent } from '../util/utils';

export default function DepartmentAdd () {
  const [isLoginPopup, loginPopupToggle] = useState(false);

  const settingsHeaderBtns = [
    {
      name: 'Save'
    },
    {
      name: 'Cancel'
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
        <DepartmentForm />
      </main>
      <Footer />
    </div>
  );
};