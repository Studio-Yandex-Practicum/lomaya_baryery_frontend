import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { api } from '../api';
import type { ITask } from '../api/models';

const initialState: ITask[] = [];

const tasksSliderlSlice = createSlice({
  name: 'tasksSlider',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getTasksUnderReview.matchFulfilled, (state, { payload }) => payload)
      .addMatcher(api.endpoints.approveTask.matchFulfilled, (state, { payload }) =>
        state.filter((task) => task.report_id !== payload.report_id)
      )
      .addMatcher(api.endpoints.declineTask.matchFulfilled, (state, { payload }) =>
        state.filter((task) => task.report_id !== payload.report_id)
      );
  },
});

export const tasksSliderReducer = tasksSliderlSlice.reducer;
export const selectTasks = (state: RootState) => state.tasks;
