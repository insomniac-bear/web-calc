// Third party libraries
import { useSelector } from 'react-redux';
// Components
import { Estimates } from '../Components/Estimates';
import { Footer } from '../Components/Footer';
import { Header } from '../Components/Header';
import { Promo } from '../Components/Promo';
// Methods for work with client store
import { getAuthenticatedStatus } from '../clientStore/authSlice/auth-sliice';

export default function Main () {
  return (
    <div className='container'>
      <Header
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
