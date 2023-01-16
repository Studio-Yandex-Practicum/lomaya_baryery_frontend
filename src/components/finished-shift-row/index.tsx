import React from 'react';
import { IUser, IUserTask } from '../../redux-store/api/models';
import { StartedShiftRow } from '../started-shift-row';

interface IFinishedShiftRowProps {
  shiftStart: string;
  shiftFinish: string;
  userData: IUser;
  tasksData: IUserTask[];
  cellsClassName: string;
}

export const FinishedShiftRow: React.FC<IFinishedShiftRowProps> = (props) => (
  <StartedShiftRow {...props} />
);
