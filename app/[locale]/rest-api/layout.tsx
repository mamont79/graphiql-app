'use client';

import { Loader } from '@/components/loader/Loader';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RestapiLayout({ children }: { children: React.ReactNode }) {
  const { authUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (authUser === null) {
      router.push('/login');
    }
  }, [authUser, router]);
  return authUser ? (
    <section className="flex-1 justify-center items-center">{children}</section>
  ) : (
    <section className="flex-1 flex justify-center items-center">
      <Loader />
    </section>
  );
}
