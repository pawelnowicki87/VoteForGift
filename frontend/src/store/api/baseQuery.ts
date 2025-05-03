import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { setUser, logout } from '@/store/store/slices/authSlice'; // dopasuj ścieżkę

type User = {
  email: string;
  firstName: string;
  lastName: string;
};

type RefreshResponse = {
  user: User;
};

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000',
  credentials: 'include',
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      { url: '/refresh', method: 'GET' },
      api,
      extraOptions
    );

    if (refreshResult?.error) {
      api.dispatch(logout());
      return refreshResult;
    }

    const user = (refreshResult.data as RefreshResponse).user;
    if (user) {
      api.dispatch(setUser(user));
    }

    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};
