'use client';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/firebase/firebase.config';

export default function WelcomePage() {
  const [authUser, setAuthUset] = useState<User | null>(null);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUset(user);
      } else {
        setAuthUset(null);
      }
    });
    return () => {
      listen();
    };
  }, []);
  function userSignOut() {
    signOut(auth)
      .then(() => console.log('success'))
      .catch((e) => console.log(e));
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow">
        <h1 className="text-3xl my-8 bg-[#fbfd70] font-bold underline text-center">
          Welcome, Next.js!
        </h1>
        <button
          onClick={() => {
            console.log(authUser);
          }}
        >
          Log user
        </button>
        {authUser && <button onClick={userSignOut}>Sign Out</button>}
      </div>

      <Footer />
    </div>
  );
}
