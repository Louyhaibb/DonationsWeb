/* eslint-disable no-undef */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken, removeToken, removeUserData } from '../../utils/Utils';
import { navigate } from 'raviger';

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

export const dashboardAPI = createApi({
  reducerPath: 'dashboardAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/dashboard`,
    prepareHeaders: (headers) => {
      const accessToken = getToken();
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Dashboards'],
  endpoints: (builder) => ({
    getAdminDashboards: builder.query({
      query: (args) => {
        return {
          url: '/admin-dashboard',
          params: { ...args },
          credentials: 'include'
        };
      },
      providesTags: (result, error, id) => {
        return [{ type: 'Dashboards', id }];
      },
      transformResponse(results) {
        return results;
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
    })
  })
});

export const {
  useGetAdminDashboardsQuery,
} = dashboardAPI;
