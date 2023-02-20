export interface Participant {
  id: string;
  status: string;
  reports: Array<{
    task_id: string;
    status: 'reviewing' | 'approved' | 'declined';
    task_date: string;
  }>;
  user: {
    id: string;
    name: string;
    surname: string;
    date_of_birth: string;
    city: string;
    phone_number: string;
  };
}
