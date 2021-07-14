// Third party libraries
import { useState } from 'react';
import { useSelector } from 'react-redux'
// Components
import { Calculations } from '../Components/Calculations';
import { Departments } from '../Components/Departments';
import { Footer } from '../Components/Footer';
import { Header } from '../Components/Header';
import { LoginPopup } from '../Components/Login-popup';
import { PageHeader } from '../Components/Page-header';
import { PageMenu } from '../Components/Page-menu';
import { Users } from '../Components/Users';
// Functions for work with state
import { getUserRole } from '../clientStore/authSlice/auth-sliice';
//Utils functions
import { IconNames, showComponent } from '../util/utils';


export default function Settings() {
  const userRole = useSelector(getUserRole);
  const SectionNames = (userRole === 'admin') ? {
    departments: 'Departments',
    calculations: 'Calculations',
    users: 'User'
  } : {
    departments: 'Departments',
    calculations: 'Calculations',
  };

  const [isLoginPopup, loginPopupToggle] = useState(false);
  const [sectionName, toggleSectionName] = useState(SectionNames.departments);


  const content = (section) => {
    switch(section) {
      case SectionNames.departments:
        return <Departments data={[]} />
      case SectionNames.calculations:
        return <Calculations data={[]}/>
      case SectionNames.users:
        return <Users />
      default:
        return <></>
    }
  }

  const settingsHeaderBtn = [
    {
      name: 'Change password'
    }
  ]

  return(
    <div className='container'>
      {showComponent(isLoginPopup, <LoginPopup onBtnCloseClick={loginPopupToggle}/>)}
      <Header
        onLoginClick={loginPopupToggle}
        isLoginBtnShow={false}
      />
      <main className='main'>
        <PageHeader
          titleIcon={IconNames.USER}
          title={'Username'}
          btns={settingsHeaderBtn}
        />
        <PageMenu
          activeItem={sectionName}
          menuItems={SectionNames}
          toggleMenu={toggleSectionName}
        />
        {content(sectionName)}
      </main>
      <Footer />
    </div>
  );
};