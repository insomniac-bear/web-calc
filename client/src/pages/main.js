// Third party libraries
import { useState } from 'react';
import { useSelector } from 'react-redux';
// Components
import { Estimates } from '../Components/Estimates';
import { Footer } from '../Components/Footer';
import { Header } from '../Components/Header';
import { Popup } from '../Components/Popup';
import { Promo } from '../Components/Promo';
import { LoginPopup } from '../Components/Login-popup.jsx';
// Methods for work with client store
import { getAuthenticatedStatus } from '../clientStore/authSlice/auth-sliice';
// Util functions
import { showComponent } from '../util/utils';

export default function Main () {
  const [ isOpenLogin, loginToggler ] = useState(false);
  return (
    <div className='container'>
      {showComponent(
        isOpenLogin,
        <Popup
          onBtnCloseClick={loginToggler}
          content={<LoginPopup isPopup={true} popupClose={loginToggler}/>}
        />
      )}
      <Header
        onLoginClick={loginToggler}
        isLoginBtnShow={!useSelector(getAuthenticatedStatus)}
      />
      <main className='main'>
        <Promo />
        <Estimates />
      </main>
      <Footer />
    </div>
  )
};
