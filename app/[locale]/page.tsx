import { AppRoutes } from '@/constants/routes.enum';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function WelcomePage() {
  const t = useTranslations('HomePage');
  return (
    <>
      <section className="wrapper m-auto mt-8 text-text flex justify-center gap-10">
        <Link href={AppRoutes.REST_API_PAGE} className="btn btn-accent-secondary">
          Rest API
        </Link>
        <Link href={AppRoutes.GRAPH_QL_PAGE} className="btn btn-accent-secondary">
          GraphQL
        </Link>
        <Link href={AppRoutes.HISTORY_PAGE} className="btn btn-accent-secondary">
          {t('history')}
        </Link>
      </section>
      <section className="wrapper m-auto mt-8 text-text">
        <div className="bg-primary/40 w-full rounded-xl p-5">
          <h1 className="text-2xl font-bold">GraphQL/REST Api’s {t('playground')}</h1>
        </div>
      </section>
    </>
  );
}
