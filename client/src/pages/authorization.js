// Components
import { Footer } from '../Components/Footer';
import { Promo } from '../Components/Promo';
import { LoginPopup } from '../Components/Login-popup.jsx';

export default function Authorization () {
  return (
    <div className='container'>
      <main className='authMain'>
        <Promo />
        <section className='auth'>
          <LoginPopup isPopup={false}/>
        </section>
      </main>
      <Footer />
    </div>
  )
};
