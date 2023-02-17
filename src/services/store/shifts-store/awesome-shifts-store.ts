import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { findIndexById } from '../../../utils/common-helpers';
import Api, { Shifts } from '../../api';
import { findRootShifts, getRecruitmentState } from './lib';

interface ShiftsStore {
  shifts: Shifts.IShift[];
  isIdle: boolean;
  isFetching: boolean;
  isMutating: boolean;
  isSuccess: boolean;
  isFetchError: boolean;
  isMutateError: boolean;
  fetch: () => void;
  createShift: (props: Shifts.CreateShiftProps) => void;
  update: (props: Shifts.UpdateShiftProps) => void;
  finish: (shiftId: string) => void;
}

const core = create<ShiftsStore>()(
  immer((set, get) => ({
    shifts: [],
    isIdle: true,
    isFetching: false,
    isSuccess: false,
    isMutating: false,
    isFetchError: false,
    isMutateError: false,
    async fetch() {
      set((state) => {
        state.isIdle = false;
        state.isFetchError = false;
        state.isFetching = true;
      });

      try {
        const shifts = await Api.getShifts();

        set((state) => {
          state.shifts = shifts;
          state.isSuccess = true;
        });
      } catch (error) {
        set((state) => {
          state.isFetchError = true;
        });
      } finally {
        set((state) => {
          state.isIdle = true;
          state.isFetching = false;
        });
      }
    },

    async createShift(payload) {
      set((state) => {
        state.isIdle = false;
        state.isMutateError = false;
        state.isMutating = true;
      });

      try {
        await Api.createNewShift(payload);
        try {
          const shifts = await Api.getShifts();
          set((state) => {
            state.shifts = shifts;
          });
        } catch (error) {
          set((state) => {
            state.isFetchError = true;
          });
        }
      } catch (error) {
        return set((state) => {
          state.isMutateError = true;
        });
      } finally {
        set((state) => {
          state.isIdle = true;
          state.isMutating = false;
        });
      }
    },

    async update(payload) {
      set((state) => {
        state.isIdle = false;
        state.isMutateError = false;
        state.isMutating = true;
      });

      try {
        const data = await Api.updateShiftSettings(payload);

        set((state) => {
          const index = findIndexById(get().shifts, 'id', payload.shiftId);
          if (index !== null) {
            state.shifts[index] = { ...state.shifts[index], ...data };
          }
        });
      } catch (error) {
        set((state) => {
          state.isMutateError = true;
        });
      } finally {
        set((state) => {
          state.isIdle = true;
          state.isMutating = false;
        });
      }
    },

    async finish(shiftId) {
      set((state) => {
        state.isIdle = false;
        state.isMutateError = false;
        state.isMutating = true;
      });

      try {
        await Api.finishShift(shiftId);

        try {
          const shifts = Api.getShifts();

          set((state) => {
            state.shifts = shifts;
          });
        } catch (error) {
          set((state) => {
            state.isFetchError = true;
          });
        }
      } catch (error) {
        set((state) => {
          state.isMutateError = true;
        });
      } finally {
        set((state) => {
          state.isIdle = true;
          state.isMutating = false;
        });
      }
    },
  })),
);

function selectRootShifts(state: ShiftsStore) {
  const rootShifts = findRootShifts(state.shifts);

  const { preparing, started } = rootShifts;

  const recruitment = getRecruitmentState(
    preparing?.id,
    started?.id,
    started?.started_at,
  );

  return {
    ...state,
    rootShifts,
    recruitment,
  };
}

export function useShiftsStore() {
  return core(selectRootShifts);
}
