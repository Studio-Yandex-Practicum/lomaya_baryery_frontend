/* eslint-disable @typescript-eslint/no-namespace */
export namespace Shifts {
  export type TShiftStatus = 'started' | 'finished' | 'preparing' | 'cancelled';

  export interface IShift {
    id: string;
    sequence_number: number;
    status: TShiftStatus;
    title: string;
    final_message: string;
    started_at: string;
    finished_at: string;
    total_users: number;
  }

  export interface ShiftWithParticipantsRes {
    shift: Omit<IShift, 'total_users' | 'sequence_number'>;
    members: Array<{
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
    }>;
  }

  export type GetShiftsRes = IShift[];

  export interface CreateShiftProps {
    title: string;
    startedAt: string;
    finishedAt: string;
  }

  export interface CreateShiftReq {
    title: string;
    started_at: string;
    finished_at: string;
  }

  export type CreateShiftRes = IShift;

  export interface UpdateShiftProps {
    shiftId: string;
    title: string;
    startedAt: string;
    finishedAt: string;
    message: string;
  }

  export interface UpdateShiftReq {
    title: string;
    started_at: string;
    finished_at: string;
    final_message: string;
  }

  export type UpdateShiftRes = Omit<IShift, 'total_users' | 'sequence_number'>;

  export type FinishShiftRes = Omit<IShift, 'total_users' | 'sequence_number'>;
}

export namespace Users {
  export type TUserStatus = 'verified' | 'declined' | 'pending';
}

export namespace Requests {
  type TRequestStatus = 'pending' | 'approved' | 'declined';

  interface IRequest {
    request_id: string;
    user_id: string;
    name: string;
    surname: string;
    date_of_birth: string;
    city: string;
    phone_number: string;
    request_status: TRequestStatus;
    user_status: Extract<Users.TUserStatus, 'verified'>;
  }

  export type GetRequestsRes = IRequest[];

  export type GetPendingRequestsRes = Array<
    Omit<IRequest, 'request_status'> & {
      request_status: Extract<TRequestStatus, 'pending'>;
    }
  >;

  export type ApproveRequestRes = Omit<IRequest, 'request_status'> & {
    request_status: Extract<TRequestStatus, 'approved'>;
  };

  export type DeclineRequestReq = {
    message: string;
  };
  export type DeclineRequestRes = Omit<IRequest, 'request_status'> & {
    request_status: Extract<TRequestStatus, 'declined'>;
  };
}

export namespace Reports {
  type TReportStatus = 'reviewing' | 'approved' | 'declined' | 'waiting';

  interface IReport {
    shift_id: string;
    shift_status: Shifts.TShiftStatus;
    shift_started_at: string;
    report_id: string;
    report_status: TReportStatus;
    report_created_at: string;
    user_name: string;
    user_surname: string;
    task_id: string;
    task_description: string;
    task_url: string;
    photo_url: string;
  }

  export type GetReviewingReportsRes = Array<
    Omit<IReport, 'report_status'> & {
      report_status: Extract<TReportStatus, 'reviewing'>;
    }
  >;

  export type GetReportRes = IReport[];

  export type ApproveReportRes = Omit<IReport, 'report_status'> & {
    report_status: Extract<TReportStatus, 'approved'>;
  };

  export type DeclineReportRes = Omit<IReport, 'report_status'> & {
    report_status: Extract<TReportStatus, 'declined'>;
  };
}
