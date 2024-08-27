import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';
import { useTranslations } from 'next-intl';

export default function WelcomePage() {
  const t = useTranslations('HomePage');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <h1 className="text-3xl my-8 bg-[#fbfd70] font-bold underline text-center">
          {t('welcome')}, my dear!
        </h1>
      </div>
      <Footer />
    </div>
  );
}
