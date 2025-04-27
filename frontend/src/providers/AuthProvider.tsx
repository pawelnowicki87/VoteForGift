'use client'

import { ReactNode, useEffect } from 'react';
import { useLazyRefreshQuery } from '@/store/api/authApi';
import { useAppDispatch } from '@/store/store/hooks';
import { setUser, logout } from '@/store/store/slices/authSlice';
import { useRouter } from 'next/navigation';

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [triggerRefresh] = useLazyRefreshQuery();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await triggerRefresh().unwrap(); // wywołujemy odświeżenie sesji
        dispatch(setUser(res.user));
        console.log("udało się pomyslnie zrobić fetchUser w authProvider", res);
      } catch (error) {
        console.error('❌ Nie udało się odświeżyć sesji:', error);
        dispatch(logout());
        router.push('/login');
      }
    };

    fetchUser();
  }, [dispatch, router, triggerRefresh]);

  return children;
};
