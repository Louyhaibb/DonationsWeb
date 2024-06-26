/* eslint-disable no-undef */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken, removeToken, removeUserData } from '../../utils/Utils';
import { navigate } from 'raviger';

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/users`,
    prepareHeaders: (headers) => {
      const accessToken = getToken();
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query({ id, user }) {
        return {
          url: `/update/${id}`,
          method: 'PUT',
          credentials: 'include',
          body: user
        };
      },
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
      transformResponse: (result) => result.user
    }),
    createUser: builder.mutation({
      query(payload) {
        return {
          url: '/create',
          method: 'POST',
          credentials: 'include',
          body: payload
        };
      },
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
      transformResponse: (result) => result.user
    }),
    getUsers: builder.query({
      query: (args) => {
        return {
          url: '/',
          params: { ...args },
          credentials: 'include'
        };
      },
      providesTags(result) {
        if (result) {
          return [
            ...result.map(({ id }) => ({
              type: 'Users',
              id
            })),
            { type: 'Users', id: 'LIST' }
          ];
        } else {
          return [{ type: 'Users', id: 'LIST' }];
        }
      },
      transformResponse(results) {
        return results.users;
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          return result;
        } catch (error) {
          if (error.error.originalStatus === 401) {
            removeToken();
            removeUserData();
            navigate('/sign-in');
          }
        }
      }
    }),
    getUser: builder.query({
      query(id) {
        return {
          url: `/getUser/${id}`,
          credentials: 'include'
        };
      },
      providesTags: (result, error, id) => {
        return [{ type: 'Users', id }];
      },
      transformResponse(result) {
        return result;
      }
    }),
    manageStatusUser: builder.mutation({
      query({ id, status }) {
        return {
          url: `/manageStatus/${id}`,
          method: 'PUT',
          credentials: 'include',
          body: status
        };
      },
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
      transformResponse: (result) => result
    }),
    deleteUser: builder.mutation({
      query(id) {
        return {
          url: `/delete/${id}`,
          method: 'DELETE',
          credentials: 'include'
        };
      },
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),
  })
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useManageStatusUserMutation,
  useCreateUserMutation,
} = userAPI;
