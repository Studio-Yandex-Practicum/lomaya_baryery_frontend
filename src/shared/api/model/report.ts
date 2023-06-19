export type ReportStatus = 'reviewing' | 'approved' | 'declined' | 'waiting';

export type Report<T extends ReportStatus = ReportStatus> = {
  shift_id: string;
  shift_status: 'started' | 'finished' | 'preparing' | 'cancelled';
  shift_started_at: string;
  report_id: string;
  report_status: T;
  report_created_at: string;
  user_name: string;
  user_surname: string;
  task_id: string;
  task_title: string;
  task_url: string;
  photo_url: string;
};
