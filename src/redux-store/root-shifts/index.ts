import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getTodayDate, getUsersRequestsDeadline } from '../../utils/common-helpers';
import { api } from '../api';

export interface IRootShiftsState {
  started: {
    id: string | null;
    title: string;
    finalMessage: string;
    startedAt: string;
    finishedAt: string;
    totalUsers: number;
  };
  preparing: {
    id: string | null;
    title: string;
    finalMessage: string;
    startedAt: string;
    finishedAt: string;
    totalUsers: number;
  };
}

const initialState: IRootShiftsState = {
  started: {
    id: null,
    title: 'empty',
    finalMessage: 'empty',
    startedAt: '1970-01-01',
    finishedAt: '1970-01-01',
    totalUsers: 0,
  },
  preparing: {
    id: null,
    title: 'empty',
    finalMessage: 'empty',
    startedAt: '1970-01-01',
    finishedAt: '1970-01-01',
    totalUsers: 0,
  },
};

const rootShiftsSlice = createSlice({
  name: 'rootShifts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.getAllShifts.matchFulfilled, (state, { payload }) => {
      const preparingShift = payload.find((shift) => shift.status === 'preparing');
      const startedShift = payload.find((shift) => shift.status === 'started');

      if (preparingShift) {
        state.preparing.id = preparingShift.id;
        state.preparing.title = preparingShift.title;
        state.preparing.finalMessage = preparingShift.final_message;
        state.preparing.startedAt = preparingShift.started_at;
        state.preparing.finishedAt = preparingShift.finished_at;
        state.preparing.totalUsers = preparingShift.total_users;
      }

      if (startedShift) {
        state.started.id = startedShift.id;
        state.started.title = startedShift.title;
        state.started.finalMessage = startedShift.final_message;
        state.started.startedAt = startedShift.started_at;
        state.started.finishedAt = startedShift.finished_at;
        state.started.totalUsers = startedShift.total_users;
      }
    });
  },
});

export const rootShiftsReducer = rootShiftsSlice.reducer;
export const selectRootShifts = (state: RootState) => state.rootShifts;
export const selectShiftForRequests = createDraftSafeSelector(
  selectRootShifts,
  ({ preparing, started }) => {
    interface IpublicAPI {
      id: null | string;
      inform: null | string;
    }

    const publicAPI: IpublicAPI = {
      id: null,
      inform: null,
    };

    if (preparing) {
      publicAPI.id = preparing.id;
    } else {
      publicAPI.inform = 'Заявки не принимаются, пока нет новой смены';
    }

    if (started.startedAt) {
      const today = getTodayDate();
      const requestsDeadline = getUsersRequestsDeadline(started.startedAt);

      if (today <= requestsDeadline) {
        publicAPI.id = started.id;
        publicAPI.inform = null;
      }
    }

    return publicAPI;
  }
);
