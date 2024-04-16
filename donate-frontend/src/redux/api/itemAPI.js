/* eslint-disable no-undef */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken, removeToken, removeUserData } from '../../utils/Utils';
import { navigate } from 'raviger';

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

export const itemAPI = createApi({
  reducerPath: 'itemAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/items`,
    prepareHeaders: (headers) => {
      const accessToken = getToken();
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Items'],
  endpoints: (builder) => ({
    updateItem: builder.mutation({
      query({ id, item }) {
        return {
          url: `/update/${id}`,
          method: 'PUT',
          credentials: 'include',
          body: item
        };
      },
      invalidatesTags: [{ type: 'Items', id: 'LIST' }],
      transformResponse: (result) => result
    }),
    getItems: builder.query({
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
              type: 'Items',
              id
            })),
            { type: 'Items', id: 'LIST' }
          ];
        } else {
          return [{ type: 'Items', id: 'LIST' }];
        }
      },
      transformResponse(results) {
        return results.items;
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
    getItem: builder.query({
      query(id) {
        return {
          url: `/getItem/${id}`,
          credentials: 'include'
        };
      },
      providesTags: (result, error, id) => {
        return [{ type: 'Items', id }];
      },
      transformResponse(result) {
        return result;
      }
    }),
    createItem: builder.mutation({
      query(payload) {
        return {
          url: '/create',
          method: 'POST',
          credentials: 'include',
          body: payload
        };
      },
      invalidatesTags: [{ type: 'Items', id: 'LIST' }],
      transformResponse: (result) => result.item
    }),
    deleteItem: builder.mutation({
      query(id) {
        return {
          url: `/delete/${id}`,
          method: 'DELETE',
          credentials: 'include'
        };
      },
      invalidatesTags: [{ type: 'Items', id: 'LIST' }]
    }),
    uploadItemImage: builder.mutation({
      query: (imageFile) => {
        var formData = new FormData();
        formData.append('image', imageFile);
        return {
          url: '/upload/image',
          method: 'POST',
          credentials: 'include',
          body: formData
        };
      },
      invalidatesTags: [{ type: 'Items', id: 'LIST' }],
      transformResponse(result) {
        return result;
      }
    })
  })
});

export const {
  useGetItemQuery,
  useGetItemsQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useUploadItemImageMutation,
} = itemAPI;
