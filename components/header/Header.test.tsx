import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuth } from '@/context/AuthContext';
import { useTranslations } from 'next-intl';
import { Header } from './Header';
import { vi } from 'vitest';
import { usePathname, useRouter } from 'next/navigation';

// Mock necessary hooks
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));

describe('Header', () => {
  const mockPush = vi.fn();
  const mockLogOut = vi.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUsePathname = usePathname as jest.Mock;
  const mockUseAuth = useAuth as jest.Mock;
  const mockUseTranslations = useTranslations as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: mockPush });
    mockUseAuth.mockReturnValue({ authUser: null, logOut: mockLogOut });
    mockUsePathname.mockReturnValue('/en/page');
    mockUseTranslations.mockReturnValue((key: string) => key);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the logo and LanguageSwitcher', () => {
    render(<Header />);

    expect(screen.getByAltText('App Logo')).toBeInTheDocument();
    expect(screen.getByText('lang:')).toBeInTheDocument();
  });

  it('renders sign in and sign up links when user is not authenticated', () => {
    render(<Header />);

    expect(screen.getByText('signIn')).toBeInTheDocument();
    expect(screen.getByText('signUp')).toBeInTheDocument();
  });

  it('adds sticky class to header on scroll', () => {
    render(<Header />);

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('sticky');
  });

  it('renders main page link and logout button when user is authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      authUser: { email: 'test@example.com' },
      logOut: mockLogOut,
    });

    render(<Header />);

    expect(screen.getByText('main page')).toBeInTheDocument();
    expect(screen.getByText('logout')).toBeInTheDocument();
  });

  it('calls logOut when logout button is clicked', () => {
    (useAuth as jest.Mock).mockReturnValue({
      authUser: { email: 'test@example.com' },
      logOut: mockLogOut,
    });

    render(<Header />);

    const logoutButton = screen.getByText('logout');
    fireEvent.click(logoutButton);

    expect(mockLogOut).toHaveBeenCalledTimes(1);
  });
});
