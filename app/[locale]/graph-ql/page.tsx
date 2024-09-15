'use client';

import { GraphiQL } from '@/components/graphiQL/GraphiQL';
import { AppRoutes } from '@/constants/routes.enum';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function GraphQlPage() {
  const t = useTranslations('Graph');

  return (
    <main className="flex-1">
      <h1 className="text-3xl my-8 bg-[#fbfd70] font-bold underline text-center">
        GraphQl
      </h1>
      <GraphiQL />
      <div className="flex flex-row justify-around max-w-[500px] mx-auto">
        <Link href={AppRoutes.REST_API_PAGE} className="btn btn-accent-secondary">
          Rest API
        </Link>
        <Link href={AppRoutes.GRAPH_QL_PAGE} className="btn btn-accent-secondary">
          GraphQL
        </Link>
        <Link href={AppRoutes.HISTORY_PAGE} className="btn btn-accent-secondary">
          {t('history')}
        </Link>
      </div>
    </main>
  );
}
