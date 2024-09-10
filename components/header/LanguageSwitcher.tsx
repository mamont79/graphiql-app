'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocale] = useState<string>('en');

  useEffect(() => {
    const currentLocale = pathname.split('/')[1];
    setLocale(currentLocale);
  }, [pathname]);

  const changeLanguage = (newLocale: string) => {
    if (newLocale !== locale) {
      const newPathname = `/${newLocale}${pathname.replace(/^\/(en|ru)/, '')}`;
      router.push(newPathname);
    }
  };

  return (
    <select
      value={locale}
      onChange={(e) => changeLanguage(e.target.value)}
      className="rounded-xl border border-accentSecondary text-black h-[30px] w-[60px] focus:border-accentSecondary focus:outline-none"
    >
      <option value="en">EN</option>
      <option value="ru">RU</option>
    </select>
  );
};
