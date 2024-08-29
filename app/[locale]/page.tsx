'use client';
import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';
import { useAuth } from '@/context/AuthContext';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function WelcomePage() {
  const t = useTranslations('HomePage');
  const { authUser } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {!authUser && (
        <div className="flex-grow">
          <h1 className="text-3xl my-8 font-bold underline text-center">
            {t('welcome')}, my dear!
          </h1>
          <div className="flex justify-center items-center">
            <Link
              href={'/register'}
              className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded"
            >
              {t('signUp')}
            </Link>
            <Link
              href={'/login'}
              className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded ml-4"
            >
              {t('signIn')}
            </Link>
          </div>
        </div>
      )}
      {authUser && (
        <div className="flex-grow">
          <h1 className="text-3xl my-8 font-bold underline text-center">
            {t('welcome')}, {`${authUser.email?.split('@')[0]}!`}
          </h1>
          <div className="flex justify-center items-center">
            <Link
              href={'/'}
              className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded"
            >
              REST Client
            </Link>
            <Link
              href={'/'}
              className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded ml-4"
            >
              GraphiQL Client
            </Link>
            <Link
              href={'/'}
              className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded ml-4"
            >
              History
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
