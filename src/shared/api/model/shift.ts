export type ShiftStatus =
  | 'preparing'
  | 'started'
  | 'ready_for_complete'
  | 'finished'
  | 'cancelled';

export type Shift<T extends ShiftStatus = ShiftStatus> = {
  id: string;
  sequence_number: number;
  status: T;
  title: string;
  final_message: string;
  started_at: string;
  finished_at: string;
  total_users: number;
};
