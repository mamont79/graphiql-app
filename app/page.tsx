'use client';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import { getIdTokenResult, signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase.config';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function WelcomePage() {
  const { authUser } = useAuth();
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
          onClick={async () => {
            console.log(authUser);
            const tokenResult = await getIdTokenResult(authUser);
            console.log(tokenResult);
            const tokenExpirationTime = new Date(tokenResult.expirationTime);
            const timeLeft = tokenExpirationTime.getTime() - Date.now();
            console.log(`Token expires in ${timeLeft / 1000} seconds`);
          }}
        >
          Log user
        </button>
        <Link href={'/register'}>SignUp</Link>
        <Link href={'/login'}>SingIn</Link>
        {authUser && <button onClick={userSignOut}>Sign Out</button>}
      </div>

      <Footer />
    </div>
  );
}
