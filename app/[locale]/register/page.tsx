import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';

export default function WelcomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow">
        <h1 className="text-3xl my-8 bg-[#fbfd70] font-bold underline text-center">
          Register
        </h1>
      </div>

      <Footer />
    </div>
  );
}
