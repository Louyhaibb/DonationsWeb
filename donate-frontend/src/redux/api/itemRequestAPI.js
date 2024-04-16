/* eslint-disable no-undef */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken, removeToken, removeUserData } from '../../utils/Utils';
import { navigate } from 'raviger';

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

export const itemRequestAPI = createApi({
  reducerPath: 'itemRequestAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/itemRequests`,
    prepareHeaders: (headers) => {
      const accessToken = getToken();
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    }
  }),
  tagTypes: ['ItemRequests'],
  endpoints: (builder) => ({
    updateItemRequest: builder.mutation({
      query({ id, item }) {
        return {
          url: `/update/${id}`,
          method: 'PUT',
          credentials: 'include',
          body: item
        };
      },
      invalidatesTags: [{ type: 'ItemRequests', id: 'LIST' }],
      transformResponse: (result) => result
    }),
    getNeedyItemRequests: builder.query({
      query: (args) => {
        return {
          url: '/needy-itemRequests',
          params: { ...args },
          credentials: 'include'
        };
      },
      providesTags(result) {
        if (result) {
          return [
            ...result.map(({ id }) => ({
              type: 'ItemRequests',
              id
            })),
            { type: 'ItemRequests', id: 'LIST' }
          ];
        } else {
          return [{ type: 'ItemRequests', id: 'LIST' }];
        }
      },
      transformResponse(results) {
        return results.itemRequests;
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
    getDonatorItemRequests: builder.query({
      query: (args) => {
        return {
          url: '/donator-itemRequests',
          params: { ...args },
          credentials: 'include'
        };
      },
      providesTags(result) {
        if (result) {
          return [
            ...result.map(({ id }) => ({
              type: 'ItemRequests',
              id
            })),
            { type: 'ItemRequests', id: 'LIST' }
          ];
        } else {
          return [{ type: 'ItemRequests', id: 'LIST' }];
        }
      },
      transformResponse(results) {
        return results.itemRequests;
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
    getItemRequest: builder.query({
      query(id) {
        return {
          url: `/getItem/${id}`,
          credentials: 'include'
        };
      },
      providesTags: (result, error, id) => {
        return [{ type: 'ItemRequests', id }];
      },
      transformResponse(result) {
        return result;
      }
    }),
    createItemRequest: builder.mutation({
      query(payload) {
        return {
          url: '/create',
          method: 'POST',
          credentials: 'include',
          body: payload
        };
      },
      invalidatesTags: [{ type: 'ItemRequests', id: 'LIST' }],
      transformResponse: (result) => result
    }),
    manageStatusItemRequest: builder.mutation({
      query({ id, status }) {
        return {
          url: `/manageStatus/${id}`,
          method: 'PUT',
          credentials: 'include',
          body: status
        };
      },
      invalidatesTags: [{ type: 'ItemRequests', id: 'LIST' }],
      transformResponse: (result) => result
    }),
    deleteItemRequest: builder.mutation({
      query(id) {
        return {
          url: `/delete/${id}`,
          method: 'DELETE',
          credentials: 'include'
        };
      },
      invalidatesTags: [{ type: 'ItemRequests', id: 'LIST' }]
    }),
  })
});

export const {
  useCreateItemRequestMutation,
  useGetItemRequestQuery,
  useGetNeedyItemRequestsQuery,
  useGetDonatorItemRequestsQuery,
  useManageStatusItemRequestMutation
} = itemRequestAPI;
