import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthContextProvider, useAuth } from './AuthContext';
import { auth } from '@/firebase/firebase.config';
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { vi } from 'vitest';

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  getAuth: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const TestComponent = () => {
  const { authUser, signUp, logIn, logOut } = useAuth();

  return (
    <div>
      <p>User: {authUser ? authUser.email : 'No user'}</p>
      <button onClick={() => signUp('test@example.com', 'password123')}>Sign Up</button>
      <button onClick={() => logIn('test@example.com', 'password123')}>Log In</button>
      <button onClick={() => logOut()}>Log Out</button>
    </div>
  );
};

describe('AuthContextProvider', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing and display "No user" initially', () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(null);
      return vi.fn();
    });

    render(
      <AuthContextProvider>
        <TestComponent />
      </AuthContextProvider>
    );

    expect(screen.getByText('User: No user')).toBeInTheDocument();
  });

  it('should set authUser when onAuthStateChanged is triggered with a user', async () => {
    const mockUser = { email: 'test@example.com' };
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return vi.fn();
    });

    render(
      <AuthContextProvider>
        <TestComponent />
      </AuthContextProvider>
    );

    expect(await screen.findByText('User: test@example.com')).toBeInTheDocument();
  });

  it('should call signUp and create a user', async () => {
    const mockUserCredential = { user: { email: 'test@example.com' } };
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);

    render(
      <AuthContextProvider>
        <TestComponent />
      </AuthContextProvider>
    );

    screen.getByText('Sign Up').click();

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'test@example.com',
        'password123'
      );
    });
  });

  it('should call logIn and sign in a user', async () => {
    const mockUserCredential = { user: { email: 'test@example.com' } };
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);

    render(
      <AuthContextProvider>
        <TestComponent />
      </AuthContextProvider>
    );

    screen.getByText('Log In').click();

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'test@example.com',
        'password123'
      );
    });
  });

  it('should call logOut and sign out the user', async () => {
    render(
      <AuthContextProvider>
        <TestComponent />
      </AuthContextProvider>
    );

    screen.getByText('Log Out').click();

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
    });
  });
});
