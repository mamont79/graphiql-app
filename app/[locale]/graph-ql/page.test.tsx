import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import GraphiQL from '@/app/[locale]/graph-ql/page';
import { AppRoutes } from '@/constants/routes.enum';

vi.mock('@/components/graphiQL/GraphiQL', () => ({
  GraphiQL: () => <div data-testid="mock-graphiql">Mocked GraphiQL Component</div>,
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    if (key === 'history') {
      return 'History';
    }
    return key;
  },
}));

describe('GraphQlPage', () => {
  it('should render the heading with correct text and styles', () => {
    render(<GraphiQL />);

    const heading = screen.getByRole('heading', { name: 'GraphQl' });
    expect(heading).toBeInTheDocument();
  });

  it('should render the GraphiQL component', () => {
    render(<GraphiQL />);

    const graphiqlComponent = screen.getByTestId('mock-graphiql');
    expect(graphiqlComponent).toBeInTheDocument();
  });

  it('should render links with correct routes', () => {
    render(<GraphiQL />);

    const restApiLink = screen.getByRole('link', { name: 'Rest API' });
    expect(restApiLink).toHaveAttribute('href', AppRoutes.REST_API_PAGE);

    const graphQlLink = screen.getByRole('link', { name: 'GraphQL' });
    expect(graphQlLink).toHaveAttribute('href', AppRoutes.GRAPH_QL_PAGE);

    const historyLink = screen.getByRole('link', { name: 'History' });
    expect(historyLink).toHaveAttribute('href', AppRoutes.HISTORY_PAGE);
  });
});
