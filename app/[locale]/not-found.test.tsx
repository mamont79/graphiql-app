import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import NotFound from './not-found';
import { toast } from 'react-toastify';
import mockRouter from 'next-router-mock';
import * as nextNavigation from 'next/navigation';
import { AuthContextProvider } from '@/context/AuthContext';

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
  default: ({ children }: { children: React.ReactNode }) => <a href="/">{children}</a>,
}));

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
  getApps: vi.fn(() => []),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: null,
    signInWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
  })),
  onAuthStateChanged: vi.fn((auth, callback) => {
    const unsubscribe = vi.fn();
    callback(null);
    return unsubscribe;
  }),
}));

test('NotFound page renders correctly', () => {
  mockRouter.setCurrentUrl('/en');

  const toastErrorSpy = vi.spyOn(toast, 'error');

  render(
    <AuthContextProvider>
      <NotFound />
    </AuthContextProvider>
  );

  expect(
    screen.getByRole('heading', { level: 2, name: 'Sorry, the page not found' })
  ).toBeInTheDocument();

  expect(screen.getByRole('link')).toBeInTheDocument();

  expect(toastErrorSpy).toHaveBeenCalledWith('404 - Page Not Found');

  toastErrorSpy.mockRestore();
});
