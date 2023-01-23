import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ICreateShift,
  IRequest,
  IShift,
  IShiftUsers,
  ITask,
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
      query: ({ title, startedAt, finishedAt }) => ({
        url: '/shifts/',
        method: 'POST',
        body: { title, started_at: startedAt, finished_at: finishedAt },
      }),
      invalidatesTags: [{ type: 'shifts' }],
    }),
    getShiftUsers: builder.query<IShiftUsers, string>({
      query: (shiftId) => `/shifts/${shiftId}/users`,
      providesTags: [{ type: 'shifts', id: 'preparing' }],
    }),
    updateShiftSettings: builder.mutation<
      Omit<IShift, 'total_users' | 'sequence_number'>,
      TUpdateShiftSettings
    >({
      query: ({ shiftId, ...queryData }) => ({
        url: `/shifts/${shiftId}`,
        method: 'PATCH',
        body: {
          title: queryData.title,
          started_at: queryData.startedAt,
          finished_at: queryData.finishedAt,
          final_message: queryData.finalMessage,
        },
      }),
      invalidatesTags: [{ type: 'shifts' }],
    }),
    finishShift: builder.mutation<Omit<IShift, 'total_users'>, string>({
      query: (shiftId) => ({
        url: `/shifts/${shiftId}/finish`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'shifts' }],
    }),
    getPendingRequests: builder.query<IRequest[], undefined>({
      query: () => `/requests?status=pending`,
    }),
    getConsideredRequests: builder.query<IRequest[], string>({
      query: (shift_id) => `/shifts/${shift_id}/requests`,
      transformResponse: (response: IRequest[]) => {
        const filteredResponse = response.filter((request) => request.request_status !== 'pending');
        return filteredResponse;
      },
    }),
    approveRequest: builder.mutation<IRequest, { requestId: string }>({
      query: ({ requestId }) => ({
        url: `/requests/${requestId}/approve`,
        method: 'PATCH',
      }),
      async onQueryStarted({ requestId }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedRequest } = await queryFulfilled;

          if (updatedRequest.request_status === 'approved') {
            dispatch(
              api.util.updateQueryData('getPendingRequests', undefined, (draft) => {
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
      { requestId: string; shiftId: string; message: string }
    >({
      query: ({ requestId, message }) => ({
        url: `/requests/${requestId}/decline`,
        method: 'PATCH',
        body: { message },
      }),
      async onQueryStarted({ requestId }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedRequest } = await queryFulfilled;

          if (updatedRequest.request_status === 'declined') {
            dispatch(
              api.util.updateQueryData('getPendingRequests', undefined, (draft) => {
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
    getTasksUnderReview: builder.query<ITask[], string>({
      query: (shiftId) => `/reports/?shift_id=${shiftId}&status=reviewing`,
    }),
    approveTask: builder.mutation<
      ITask,
      { taskId: string; shiftId: string; patch: { task_status: IUserTask['status'] } }
    >({
      query: ({ taskId, patch, ...rest }) => ({
        url: `/reports/${taskId}/approve`,
        method: 'PATCH',
        body: patch, // delete before production
      }),
      async onQueryStarted({ taskId, shiftId, patch }, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          debugger;
          dispatch(
            api.util.updateQueryData('getTasksUnderReview', shiftId, (draft) => {
              // refactor before production
              const tasks = draft.map((task) =>
                task.report_id === taskId ? { ...task, ...patch } : task
              );
              return tasks;
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
    declineTask: builder.mutation<
      ITask,
      {
        taskId: string;
        shiftId: string;
        patch: {
          task_status: IUserTask['status'];
        };
      }
    >({
      query: ({ taskId, patch, ...rest }) => ({
        url: `/reports/${taskId}/decline`,
        method: 'PATCH',
        body: patch, // delete before production
      }),
      async onQueryStarted({ taskId, shiftId, patch }, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          debugger;
          dispatch(
            api.util.updateQueryData('getTasksUnderReview', shiftId, (draft) => {
              // refactor before production
              const tasks = draft.map((task) =>
                task.report_id === taskId ? { ...task, ...patch } : task
              );
              return tasks;
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
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
  useGetTasksUnderReviewQuery,
  useApproveTaskMutation,
  useDeclineTaskMutation,
} = api;
