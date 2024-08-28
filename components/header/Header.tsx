'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { LanguageSwitcher } from './LanguageSwitcher';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AppRoutes } from '@/constants/routes.enum';

export const Header = () => {
  const t = useTranslations('Header');
  const [isSticky, setIsSticky] = useState(false);
  const isLoggedIn = false;

  const handleScroll = () => {
    const minScrollHeigth = 0;
    if (window.scrollY > minScrollHeigth) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        isSticky
          ? 'shadow-md shadow-accentSecondary sticky top-0 left-0 z-50 h-[70px]'
          : 'border-b-2'
      } bg-white text-text transition-border duration-300 h-[80px] flex justify-center items-center`}
    >
      <div className="wrapper flex justify-between items-center w-full">
        <div className="content-center">
          <Link href={AppRoutes.MAIN_PAGE} className="flex gap-2 items-center">
            <Image src="/app-logo.svg" alt="App Logo" width={40} height={40} />
            <p className="font-medium">REST/GraphiQL Client</p>
          </Link>
        </div>
        <div className="content-center">
          {t('lang')}: <LanguageSwitcher />
        </div>
        <div className="flex gap-2">
          <Link href={AppRoutes.LOGIN_PAGE} className="btn btn-accent-secondary">
            {t('signIn')}
          </Link>
          <Link href={AppRoutes.REGISTER_PAGE} className="btn">
            {t('signUp')}
          </Link>
          {isLoggedIn && <button className="btn">{t('logout')}</button>}
        </div>
      </div>
    </header>
  );
};
