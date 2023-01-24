import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getTodayDate, getUsersRequestsDeadline } from '../../utils/common-helpers';
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
      const preparingShift = payload.find((shift) => shift.status === 'preparing') || null;
      const startedShift = payload.find((shift) => shift.status === 'started') || null;

      state.preparing = preparingShift;
      state.started = startedShift;
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

    if (started) {
      const today = getTodayDate();
      const requestsDeadline = getUsersRequestsDeadline(started.started_at);

      if (today <= requestsDeadline) {
        publicAPI.id = started.id;
        publicAPI.inform = null;
      }
    }

    return publicAPI;
  }
);
