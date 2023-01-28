import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getTodayDate, getUsersRequestsDeadline } from './lib';
import { api } from '../api';
import { IShift } from '../api/models';

export interface IRootShiftsState {
  started: IShift | null;
  preparing: IShift | null;
}

const initialState: IRootShiftsState = {
  started: null,
  preparing: null,
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
        state.preparing = preparingShift;
      } else {
        state.preparing = null;
      }

      if (startedShift) {
        state.started = startedShift;
      } else {
        state.started = null;
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
      shiftType: 'preparing' | 'started' | null;
    }

    const publicAPI: IpublicAPI = {
      id: null,
      shiftType: null,
    };

    if (preparing) {
      publicAPI.id = preparing.id;
      publicAPI.shiftType = 'preparing';
    }

    if (started) {
      const today = getTodayDate();
      const requestsDeadline = getUsersRequestsDeadline(started.started_at);

      if (today <= requestsDeadline) {
        publicAPI.id = started.id;
        publicAPI.shiftType = 'started';
      }
    }

    return publicAPI;
  }
);
