'use client'

import { ReactNode, useEffect } from 'react';
import { useLazyRefreshQuery } from '@/store/api/authApi';
import { useAppDispatch } from '@/store/store/hooks';
import { setUser, logout } from '@/store/store/slices/authSlice';
import { useRouter, usePathname } from 'next/navigation';

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname(); // <--- patrzymy jaka strona

  const [triggerRefresh] = useLazyRefreshQuery();

  useEffect(() => {
    // Jeśli jesteśmy na stronach publicznych — NIE próbujemy refresh
    const publicPaths = ['/login', '/register', '/activation'];
    const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

    if (isPublicPath) {
      return; // Jeśli publiczna strona, nie robimy refresh
    }

    // Jeśli prywatna strona, robimy refresh
    const fetchUser = async () => {
      try {
        const res = await triggerRefresh({}).unwrap();
        dispatch(setUser(res));
      } catch (error) {
        console.error('❌ Nie udało się odświeżyć sesji:', error);
        dispatch(logout());
        router.push('/login');
      }
    };

    fetchUser();
  }, [dispatch, router, pathname, triggerRefresh]);

  return children;
};
