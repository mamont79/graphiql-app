import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import NotFound from './not-found';
import { toast } from 'react-toastify';
import mockRouter from 'next-router-mock';
import * as nextNavigation from 'next/navigation';

vi.mock('next/navigation', async () => {
  const originalModule = await vi.importActual<typeof nextNavigation>('next/navigation');
  return {
    ...originalModule,
    useRouter: () => ({
      push: vi.fn(),
      prefetch: vi.fn(),
    }),
    usePathname: () => '/en',
  };
});

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    key === 'sorry' ? 'Sorry, the page not found' : '',
}));

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

test('NotFound page renders correctly', () => {
  mockRouter.setCurrentUrl('/en');

  const toastErrorSpy = vi.spyOn(toast, 'error');

  render(<NotFound />);

  expect(
    screen.getByRole('heading', { level: 2, name: 'Sorry, the page not found' })
  ).toBeInTheDocument();

  expect(screen.getByRole('link')).toBeInTheDocument();

  expect(toastErrorSpy).toHaveBeenCalledWith('404 - Page Not Found');

  toastErrorSpy.mockRestore();
});