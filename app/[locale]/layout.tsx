import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ErrorBoundary from '@/components/errorBoundary/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GraphiQl APP',
  description: 'Graph + REST',
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ErrorBoundary>
            {children}
            <ToastContainer />
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
