export type RequestStatus = 'pending' | 'approved' | 'declined';

export type Request<T extends RequestStatus = RequestStatus> = {
  request_id: string;
  user_id: string;
  name: string;
  surname: string;
  date_of_birth: string;
  city: string;
  phone_number: string;
  request_status: T;
  user_status: 'verified' | 'declined' | 'pending';
};
