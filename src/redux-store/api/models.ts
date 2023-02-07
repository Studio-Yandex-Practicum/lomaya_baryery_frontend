export type TShiftStatus = 'started' | 'finished' | 'preparing' | 'cancelled';

export interface IShift {
  id: string;
  sequence_number: number;
  status: Exclude<TShiftStatus, 'candelled'>;
  title: string;
  final_message: string;
  started_at: string;
  finished_at: string;
  total_users: number;
}

export interface ICreateShift {
  title: string;
  started_at: string;
  finished_at: string;
}

export interface IUser {
  id: string;
  name: string;
  surname: string;
  date_of_birth: string;
  city: string;
  phone_number: string;
}

export interface IUserTask {
  task_id: string;
  status: 'reviewing' | 'approved' | 'declined';
  task_date: string;
}

export interface IShiftUsers {
  shift: Omit<IShift, 'total_users' | 'sequence_number'>;
  members: {
    id: string;
    status: string;
    reports: IUserTask[];
    user: IUser;
  }[];
}

export type TUpdateShiftSettings = ICreateShift & {
  shift_id: string;
  final_message: string;
};

export type TRequestStatus = 'pending' | 'approved' | 'declined';

export interface IRequest extends Omit<IUser, 'id'> {
  user_id: string;
  request_id: string;
  request_status: TRequestStatus;
}

export interface IReport {
  shift_id: string;
  shift_status: TShiftStatus;
  shift_started_at: string;
  report_id: string;
  report_status: IUserTask['status'];
  report_created_at: string;
  user_name: string;
  user_surname: string;
  task_id: string;
  task_description: string;
  task_url: string;
  photo_url: string;
}
