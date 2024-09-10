'use client';

import Error404Icon from '@/assets/Error404Icon';
import Link from 'next/link';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFoundPage');
  useEffect(() => {
    toast.error('404 - Page Not Found');
  }, []);

  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="flex-grow flex flex-col items-center justify-center">
        <h2 className="my-4 text-2xl font-bold text-sky-700">{t('sorry')}</h2>
        <Link href="/">
          <Error404Icon />
        </Link>
        <p className="my-4 text-2xl font-bold text-sky-700">{t('click')}</p>
      </div>
    </main>
  );
}
