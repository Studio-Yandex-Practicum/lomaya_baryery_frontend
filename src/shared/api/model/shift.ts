export type ShiftStatus = 'started' | 'finished' | 'preparing' | 'cancelled';

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
