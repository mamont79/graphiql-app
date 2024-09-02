import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import RegisterForm from './RegisterForm';

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

describe('RegisterForm', () => {
  const mockPush = vi.fn();
  const mockSignUp = vi.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseAuth = useAuth as jest.Mock;
  const mockUseTranslations = useTranslations as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: mockPush });
    mockUseAuth.mockReturnValue({ authUser: null, signUp: mockSignUp });
    mockUseTranslations.mockReturnValue((key: string) => key);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form and handles registration', async () => {
    render(<RegisterForm />);

    // Verify form is rendered
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pswd/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pswdRepeat/i)).toBeInTheDocument();
    expect(screen.getByText(/logupbtn/i)).toBeInTheDocument();

    // Fill out and submit the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/pswd/i), {
      target: { value: 'Password123!' },
    });
    fireEvent.change(screen.getByLabelText(/pswdRepeat/i), {
      target: { value: 'Password123!' },
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: 'logupbtn' }));
    });

    // Verify signUp is called and router pushes to MAIN_PAGE
    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith('test@example.com', 'Password123!');
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('displays an error message on failed registration', async () => {
    mockSignUp.mockRejectedValueOnce(new Error('Registration failed'));

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/pswd/i), {
      target: { value: 'Password123!' },
    });
    fireEvent.change(screen.getByLabelText(/pswdRepeat/i), {
      target: { value: 'Password123!' },
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: 'logupbtn' }));
    });

    await waitFor(() => {
      expect(screen.getByText(/responseError/i)).toBeInTheDocument();
    });
  });
});
