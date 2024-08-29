'use client';

import { AppRoutes } from '@/constants/routes.enum';
import { useAuth } from '@/context/AuthContext';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function WelcomePage() {
  const t = useTranslations('HomePage');
  const { authUser } = useAuth();

  return (
    <>
      <section className="wrapper m-auto mt-8 text-text flex justify-center gap-10">
        {authUser ? (
          <>
            <Link href={AppRoutes.REST_API_PAGE} className="btn btn-accent-secondary">
              Rest API
            </Link>
            <Link href={AppRoutes.GRAPH_QL_PAGE} className="btn btn-accent-secondary">
              GraphQL
            </Link>
            <Link href={AppRoutes.HISTORY_PAGE} className="btn btn-accent-secondary">
              {t('history')}
            </Link>
          </>
        ) : (
          <>
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
          </>
        )}
      </section>
      <section className="wrapper m-auto mt-8 text-text">
        <div className="bg-primary/40 w-full rounded-xl p-5">
          <h1 className="text-xl font-bold underline text-center">
            {t('welcome')}, {authUser ? `${authUser.email?.split('@')[0]!}` : 'my dear'}
          </h1>
          <h1 className="text-2xl font-bold">GraphQL/REST Api’s {t('playground')}</h1>
        </div>
      </section>
    </>
  );
}
