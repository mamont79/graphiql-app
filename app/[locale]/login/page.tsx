import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import LoginForm from '@/components/auth/LoginForm';

export default function WelcomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
}
