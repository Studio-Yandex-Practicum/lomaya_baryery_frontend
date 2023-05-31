export type MemberStatus = 'verified' | 'declined' | 'pending';

export type Member<T extends MemberStatus = MemberStatus> = {
  id: string;
  name: string;
  surname: string;
  date_of_birth: string;
  city: string;
  phone_number: string;
  shifts_count: number;
  is_in_active_shift: boolean;
  status: T;
};

export type ShiftsByMember = {
  id: string;
  title: string;
  started_at: string;
  finished_at: string;
  numbers_lombaryers: number;
  total_approved: number;
  total_declined: number;
  total_skipped: number;
  reports: Array<{
    task_id: string;
    status:
      | 'not_participate'
      | 'waiting'
      | 'skipped'
      | 'reviewing'
      | 'approved'
      | 'declined';
    task_date: string;
  }>;
};

export type MemberById = {
  id: string;
  name: string;
  surname: string;
  date_of_birth: string;
  city: string;
  phone_number: string;
  shifts: ShiftsByMember[];
};
