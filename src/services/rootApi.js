/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rootApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }), // fetchBaseQuery is a function that returns a baseQuery object
  endpoints: (builder) => {
    return {
      //mutation: phương thức POST, gửi dữ liệu lên server
      //query: chỉ đọc dữ liệu
      register: builder.mutation({
        query: ({ fullName, email, password }) => {
          return {
            url: '/signup',
            body: { fullName, email, password },
            method: 'POST',
          };
        },
      }),
      login: builder.mutation({
        query: ({ email, password }) => {
          return {
            url: '/login',
            body: { email, password },
            method: 'POST',
          };
        },
      }),
    };
  },
});

export const { useRegisterMutation, useLoginMutation } = rootApi;
