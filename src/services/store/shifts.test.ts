import { findRootShifts } from './shifts';
import type { Shifts } from '../api';

describe('find root shifts', () => {
  test('root shifts not exist', () => {
    const mockShifts: Shifts.IShift[] = [
      {
        id: '123412356',
        title: 'title',
        started_at: '2022-03-22',
        finished_at: '2022-04-22',
        final_message: 'message',
        sequence_number: 1234,
        status: 'finished',
        total_users: 100,
      },
      {
        id: '34562345',
        title: 'title',
        started_at: '2022-05-22',
        finished_at: '2022-06-22',
        final_message: 'message',
        sequence_number: 1234,
        status: 'finished',
        total_users: 100,
      },
    ];

    expect(findRootShifts(mockShifts)).toEqual({
      preparing: undefined,
      started: undefined,
    });
  });

  test('find started shift', () => {
    const mockShifts: Shifts.IShift[] = [
      {
        id: '123412356',
        title: 'title',
        started_at: '2022-03-22',
        finished_at: '2022-04-22',
        final_message: 'message',
        sequence_number: 1234,
        status: 'started',
        total_users: 100,
      },
      {
        id: '34562345',
        title: 'title',
        started_at: '2022-05-22',
        finished_at: '2022-06-22',
        final_message: 'message',
        sequence_number: 1234,
        status: 'finished',
        total_users: 100,
      },
    ];

    expect(findRootShifts(mockShifts)).toEqual({
      preparing: undefined,
      started: {
        id: '123412356',
        title: 'title',
        started_at: '2022-03-22',
        finished_at: '2022-04-22',
        final_message: 'message',
        sequence_number: 1234,
        status: 'started',
        total_users: 100,
      },
    });
  });

  test('find preparing shift', () => {
    const mockShifts: Shifts.IShift[] = [
      {
        id: '123412356',
        title: 'title',
        started_at: '2022-03-22',
        finished_at: '2022-04-22',
        final_message: 'message',
        sequence_number: 1234,
        status: 'preparing',
        total_users: 100,
      },
      {
        id: '34562345',
        title: 'title',
        started_at: '2022-05-22',
        finished_at: '2022-06-22',
        final_message: 'message',
        sequence_number: 1234,
        status: 'finished',
        total_users: 100,
      },
    ];

    expect(findRootShifts(mockShifts)).toEqual({
      preparing: {
        id: '123412356',
        title: 'title',
        started_at: '2022-03-22',
        finished_at: '2022-04-22',
        final_message: 'message',
        sequence_number: 1234,
        status: 'preparing',
        total_users: 100,
      },
      started: undefined,
    });
  });

  test('find when arg is undefind', () => {
    expect(findRootShifts(undefined)).toEqual({
      started: undefined,
      preparing: undefined,
    });
  });

  test('find when empty array', () => {
    expect(findRootShifts([])).toEqual({
      started: undefined,
      preparing: undefined,
    });
  });
});
