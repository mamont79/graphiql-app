'use client';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function WelcomePage() {
  const { authUser } = useAuth();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {!authUser && (
        <div className="flex-grow">
          <h1 className="text-3xl my-8 bg-[#fbfd70] font-bold underline text-center">
            Welcome!
          </h1>
          <div className="flex justify-center items-center">
            <Link
              href={'/register'}
              className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded"
            >
              SignUp
            </Link>
            <Link
              href={'/login'}
              className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded ml-4"
            >
              SignIn
            </Link>
          </div>
        </div>
      )}
      {authUser && (
        <div className="flex-grow">
          <h1 className="text-3xl my-8 bg-[#fbfd70] font-bold underline text-center">
            {`Welcome, ${authUser.email?.split('@')[0]}!`}
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
