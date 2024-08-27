'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { LanguageSwitcher } from './LanguageSwitcher';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Header = () => {
  const t = useTranslations('Header');
  const [isSticky, setIsSticky] = useState(false);

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
          ? 'shadow-md shadow-accentSecondary sticky top-0 left-0 z-50'
          : 'border-b-2'
      } bg-white text-text transition-border duration-300 flex flex-row justify-around w-full h-[80px] `}
    >
      <div className="content-center">
        <Link href="/" className="flex gap-2 items-center">
          <Image src="/app-logo.svg" alt="App Logo" width={40} height={40} />
          <p className="font-medium">REST/GraphiQL Client</p>
        </Link>
      </div>
      <div className="content-center">
        {t('lang')}: <LanguageSwitcher />
      </div>
      <div className="content-center">Sign in / out</div>
    </header>
  );
};
