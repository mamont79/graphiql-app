import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import RegisterForm from '@/components/auth/RegisterForm';

export default function WelcomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <RegisterForm />
      <Footer />
    </div>
  );
}
