// Third party libraries
import { useSelector } from 'react-redux';
// Components
import { Footer } from '../Components/Footer';
import { Promo } from '../Components/Promo';
import { LoginPopup } from '../Components/Login-popup.jsx';
// // Methods for work with client store
import { getAuthenticatedStatus } from '../clientStore/authSlice/auth-sliice';
// Util functions
import { showComponent } from '../util/utils';

export default function Authorization () {
  return (
    <div className='container'>
      <main className='authMain'>
        <Promo />
        <section className='auth'>
          <LoginPopup />
        </section>
      </main>
      <Footer />
    </div>
  )
};
