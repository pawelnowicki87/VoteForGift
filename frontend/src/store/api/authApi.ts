import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    register: builder.mutation({
      query: (newUser: { firstName: string; lastName: string; email: string; password: string }) => ({
        url: '/register',
        method: 'POST',
        body: newUser,
      }),
    }),

    activate: builder.query({
      query: (activationToken: string) => ({
        url: `/activation/${activationToken}`,
        method: 'GET',
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
        credentials: 'include'
      })
    }),

    refresh: builder.query<{ 
      user: {
        email: string; 
        firstName: string; 
        lastName: string }}, 
        void
        >({
      query: () => ({
        url: '/refresh',
        method: 'GET',
        credentials: 'include',
      }),
    }),

  }),
})

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useActivateQuery,
  useLogoutMutation,
  useRefreshQuery,
  useLazyRefreshQuery
} = authApi;
