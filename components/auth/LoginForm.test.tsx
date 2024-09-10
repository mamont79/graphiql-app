import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import LoginForm from './LoginForm';

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

describe('LoginForm', () => {
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

  it('renders the form and handles login', async () => {
    render(<LoginForm />);

    // Verify form is rendered
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pswd/i)).toBeInTheDocument();
    expect(screen.getByText(/loginbtn/i)).toBeInTheDocument();

    // Fill out and submit the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/pswd/i), {
      target: { value: 'Password123!' },
    });
    fireEvent.click(screen.getByText(/loginbtn/i));

    // Verify logIn is called and router pushes to MAIN_PAGE
    await waitFor(() => {
      expect(mockLogIn).toHaveBeenCalledWith('test@example.com', 'Password123!');
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('displays an error message on failed login', async () => {
    mockLogIn.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/pswd/i), {
      target: { value: 'Password123!' },
    });
    fireEvent.click(screen.getByText(/loginbtn/i));

    await waitFor(() => {
      expect(screen.getByText(/responseError/i)).toBeInTheDocument();
    });
  });
});
