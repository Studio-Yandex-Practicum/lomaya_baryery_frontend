import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ICreateShift,
  IRequest,
  IShift,
  IShiftUsers,
  IReport,
  IUserTask,
  TShiftStatus,
  TUpdateShiftSettings,
} from './models';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://lombaryery.tk' }),
  tagTypes: ['shifts'],
  endpoints: (builder) => ({
    getAllShifts: builder.query<IShift[], void>({
      query: () => '/shifts/',
      transformResponse: (response: (Omit<IShift, 'status'> & { status: TShiftStatus })[]) => {
        const transformedResponse = response.filter((shift) => shift.status !== 'cancelled');
        return transformedResponse;
      },
      providesTags: ['shifts'],
    }),
    createNewShift: builder.mutation<Omit<IShift, 'total_users'>, ICreateShift>({
      query: (body) => ({
        url: '/shifts/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'shifts' }],
    }),
    getShiftUsers: builder.query<IShiftUsers, string>({
      query: (shiftID) => `/shifts/${shiftID}/users`,
      providesTags: [{ type: 'shifts', id: 'preparing' }],
    }),
    updateShiftSettings: builder.mutation<
      Omit<IShift, 'total_users' | 'sequence_number'>,
      TUpdateShiftSettings
    >({
      query: ({ shift_id: id, ...body }) => ({
        url: `/shifts/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'shifts' }],
    }),
    finishShift: builder.mutation<Omit<IShift, 'total_users'>, string>({
      query: (shiftID) => ({
        url: `/shifts/${shiftID}/finish`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'shifts' }],
    }),
    getPendingRequests: builder.query<IRequest[], string>({
      query: (shiftID) => `/shifts/${shiftID}/requests?status=pending`,
    }),
    getConsideredRequests: builder.query<IRequest[], string>({
      query: (shiftID) => `/shifts/${shiftID}/requests`,
      transformResponse: (response: IRequest[]) => {
        const filteredResponse = response.filter((request) => request.request_status !== 'pending');
        return filteredResponse;
      },
    }),
    approveRequest: builder.mutation<IRequest, { requestId: string; shiftID: string }>({
      query: ({ requestId, shiftID }) => ({
        url: `/requests/${requestId}/approve`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'shifts' }],
      async onQueryStarted({ requestId, shiftID }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedRequest } = await queryFulfilled;

          if (updatedRequest.request_status === 'approved') {
            dispatch(
              api.util.updateQueryData('getPendingRequests', shiftID, (draft) => {
                const modifedRequest = draft.find((request) => request.request_id === requestId);
                if (modifedRequest) {
                  modifedRequest.request_status = 'approved';
                }
              })
            );
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
    declineRequest: builder.mutation<
      IRequest,
      { requestId: string; shiftID: string; message: string }
    >({
      query: ({ requestId, shiftID, message }) => ({
        url: `/requests/${requestId}/decline`,
        method: 'PATCH',
        body: { message },
      }),
      async onQueryStarted({ requestId, shiftID }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedRequest } = await queryFulfilled;

          if (updatedRequest.request_status === 'declined') {
            dispatch(
              api.util.updateQueryData('getPendingRequests', shiftID, (draft) => {
                const modifedRequest = draft.find((request) => request.request_id === requestId);
                if (modifedRequest) {
                  modifedRequest.request_status = 'declined';
                }
              })
            );
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getReportsReviewing: builder.query<IReport[], string>({
      query: (shiftId) => `/reports/?shift_id=${shiftId}&status=reviewing`,
    }),
    approveReport: builder.mutation<
      IReport,
      { reportId: string; shiftId: string; patch: { report_status: IUserTask['status'] } }
    >({
      query: ({ reportId, patch, ...rest }) => ({
        url: `/reports/${reportId}/approve`,
        method: 'PATCH',
        body: patch, // delete before production
      }),
      async onQueryStarted({ reportId, shiftId, patch }, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled; // while develop
          dispatch(
            api.util.updateQueryData('getReportsReviewing', shiftId, (draft) => {
              // refactor before production
              const reports = draft.map((report) =>
                report.report_id === reportId ? { ...report, ...patch } : report
              );
              return reports;
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
    declineReport: builder.mutation<
      IReport,
      {
        reportId: string;
        shiftId: string;
        patch: {
          report_status: IUserTask['status'];
        };
      }
    >({
      query: ({ reportId, patch, ...rest }) => ({
        url: `/reports/${reportId}/decline`,
        method: 'PATCH',
        body: patch, // delete before production
      }),
      async onQueryStarted({ reportId, shiftId, patch }, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled; // while develop
          dispatch(
            api.util.updateQueryData('getReportsReviewing', shiftId, (draft) => {
              // refactor before production
              const reports = draft.map((report) =>
                report.report_id === reportId ? { ...report, ...patch } : report
              );
              return reports;
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getReportsRealized: builder.query<IReport[], string>({
      query: (shiftId) => `/reports/?shift_id=${shiftId}`,
      transformResponse(response: IReport[]) {
        return response.filter(
          (report) => report.report_status === 'approved' || report.report_status === 'declined'
        );
      },
    }),
    getReportsDeclined: builder.query<IReport[], string>({
      query: (shiftId) => `/reports/?shift_id=${shiftId}&status=declined`,
    }),
  }),
});

export const {
  useGetAllShiftsQuery,
  useCreateNewShiftMutation,
  useGetShiftUsersQuery,
  useUpdateShiftSettingsMutation,
  useFinishShiftMutation,
  useGetPendingRequestsQuery,
  useGetConsideredRequestsQuery,
  useApproveRequestMutation,
  useDeclineRequestMutation,
  useGetReportsReviewingQuery,
  useApproveReportMutation,
  useDeclineReportMutation,
  useGetReportsRealizedQuery,
  useGetReportsDeclinedQuery,
} = api;
