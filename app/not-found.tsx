'use client';

import Error404Icon from '@/assets/Error404Icon';
import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';
import Link from 'next/link';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function NotFound() {
  useEffect(() => {
    toast.error('404 - Page Not Found');
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center">
        <h2 className="my-4 text-2xl font-bold text-sky-700">
          Sorry, the page not found
        </h2>
        <Link href="/">
          <Error404Icon />
        </Link>
        <p className="my-4 text-2xl font-bold text-sky-700">
          Click `404` to go to main page
        </p>
      </div>
      <Footer />
    </div>
  );
}
