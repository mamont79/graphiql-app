import { render, screen } from '@testing-library/react';
import SignInPage from './page';
import { vi } from 'vitest';
import { useAuth } from '@/context/AuthContext';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

// Mock necessary hooks
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));

describe('SignInPage', () => {
  const mockPush = vi.fn();
  const mockLogIn = vi.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseAuth = useAuth as jest.Mock;
  const mockUseTranslations = useTranslations as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: mockPush });
    mockUseAuth.mockReturnValue({ authUser: null, logIn: mockLogIn });
    mockUseTranslations.mockReturnValue((key: string) => key);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders LoginForm component', () => {
    render(<SignInPage />);

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('flex-1 flex items-center justify-center');
  });
});
