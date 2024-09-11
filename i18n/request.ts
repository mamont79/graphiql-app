import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

type LocaleType = 'en' | 'ru';

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale as LocaleType)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
