// Components
import { Footer } from '../Components/Footer';
import { Promo } from '../Components/Promo';
import { LoginForm } from '../Components/login-form/Login-form';

export default function Authorization () {
  return (
    <div className='container'>
      <main className='authMain'>
        <Promo />
        <section className='auth'>
          <LoginForm />
        </section>
      </main>
      <Footer />
    </div>
  )
};
