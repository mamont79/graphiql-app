'use client';
import { auth } from '@/firebase/firebase.config';
import {
  createUserWithEmailAndPassword,
  getIdTokenResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  authUser: User | null | undefined;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);
        checkTokenExpiration(user);
      } else {
        setAuthUser(null);
      }
    });

    const interval = setInterval(() => {
      if (authUser) {
        checkTokenExpiration(authUser);
      }
    }, 1000);

    return () => {
      listen();
      clearInterval(interval);
    };
  }, [authUser]);

  const checkTokenExpiration = async (user: User) => {
    try {
      const tokenResult = await getIdTokenResult(user);
      const tokenExpirationTime = new Date(tokenResult.expirationTime);
      const timeLeft = tokenExpirationTime.getTime() - Date.now();

      if (timeLeft < 300000) {
        logOut();
        router.push('/');
      }
    } catch (error) {
      console.log('Error checking token expiration:', error);
    }
  };

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setAuthUser(null);
    return await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ authUser, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
