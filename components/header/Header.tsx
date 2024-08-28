import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header = () => {
  const t = useTranslations('Header');

  return (
    <header className="flex flex-row justify-around sticky bg-[#1da1f2] top-0 left-0 w-full h-[80px]">
      <div className="content-center">Team Logo</div>
      <div className="content-center">
        {t('lang')}: <LanguageSwitcher />
      </div>
      <div className="content-center">Sign in / out</div>
    </header>
  );
};
