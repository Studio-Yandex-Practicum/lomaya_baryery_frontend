import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { api } from '../api';
import type { IReport } from '../api/models';

const initialState: IReport[] = [];

const reportsSliderlSlice = createSlice({
  name: 'reportSlider',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getReportsReviewing.matchFulfilled, (state, { payload }) => payload)
      .addMatcher(
        api.endpoints.approveReport.matchFulfilled,
        (
          state,
          { payload } // recieved null
        ) => state.filter((report) => report.report_id !== payload.report_id)
      )
      .addMatcher(api.endpoints.declineReport.matchFulfilled, (state, { payload }) =>
        state.filter((report) => report.report_id !== payload.report_id)
      );
  },
});

export const reportsSliderReducer = reportsSliderlSlice.reducer;
export const selectTasks = (state: RootState) => state.reports;
