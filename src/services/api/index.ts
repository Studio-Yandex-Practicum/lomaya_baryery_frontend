import {
  createNewShift,
  finishShift,
  getShiftParticipants,
  getShifts,
  updateShiftSettings,
} from './shifts';

import { approveRequest, declineRequest, getPendingRequests, getRequests } from './requests';

import { approveReport, declineReport, getReports, getReviewingReports } from './reports';

import Error from './exceptions';

import config from './config';

import { Shifts } from './models';

export type { Shifts };

export default {
  createNewShift,
  finishShift,
  getShiftParticipants,
  getShifts,
  updateShiftSettings,
  approveRequest,
  declineRequest,
  getPendingRequests,
  getRequests,
  approveReport,
  declineReport,
  getReports,
  getReviewingReports,
  Error,
  config,
};
