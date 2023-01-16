import { IShiftSettingsFormProps } from '.';
import { IRootShiftsState } from '../../redux-store/root-shifts';

export function getTitle(
  shiftStatus: IShiftSettingsFormProps['shiftStatus'],
  rootShifts: IRootShiftsState
): string {
  switch (shiftStatus) {
    case 'creating':
      return '';
    case 'preparing':
      return rootShifts.preparing?.title || '';
    case 'started':
      return rootShifts.started?.title || '';
    default:
      return '';
  }
}

interface ICreateAndStartedProps {
  formType: 'creating' | 'started';
  startedStartAt: string | undefined;
  startedFinishAt: string | undefined;
}

interface IPreparingProps {
  formType: 'preparing';
  preparingStartAt: string | undefined;
  preparingFinishAt: string | undefined;
  startedStartAt: string | undefined;
  startedFinishAt: string | undefined;
}

function isPreparing(prop: ICreateAndStartedProps | IPreparingProps): prop is IPreparingProps {
  return prop.formType === 'preparing';
}

export function getStartDate(props: ICreateAndStartedProps | IPreparingProps) {
  if (isPreparing(props)) {
    const { preparingStartAt } = props;
    return preparingStartAt
      ? new Date(preparingStartAt)
      : new Date(new Date().setHours(0, 0, 0, 0));
  }

  const { formType, startedFinishAt, startedStartAt } = props;
  let startDate: Date = new Date();
  startDate.setDate(startDate.getDate() + 1);

  if (formType === 'creating' && startedFinishAt) {
    startDate = new Date(startedFinishAt);
    startDate.setDate(startDate.getDate() + 1);
  } else if (formType === 'started') {
    startDate = startedStartAt ? new Date(startedStartAt) : startDate;
  }
  startDate.setHours(0, 0, 0, 0);
  return startDate;
}

export function getFinishDate(props: ICreateAndStartedProps | IPreparingProps) {
  if (isPreparing(props)) {
    const { preparingFinishAt } = props;
    return preparingFinishAt
      ? new Date(preparingFinishAt)
      : new Date(new Date().setHours(0, 0, 0, 0));
  }

  const { formType, startedFinishAt } = props;

  let finishDate: Date = new Date();

  finishDate.setDate(finishDate.getDate() + 2);

  if (formType === 'creating' && startedFinishAt) {
    finishDate = new Date(startedFinishAt);
    finishDate.setDate(finishDate.getDate() + 2);
  } else if (formType === 'started') {
    finishDate = startedFinishAt ? new Date(startedFinishAt) : finishDate;
  }
  finishDate.setHours(0, 0, 0, 0);
  return finishDate;
}

export function getDiffInDays(finish: Date, start: Date): number {
  return (finish.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
}

export const validateLength = (str: string, min: number, max: number): boolean => {
  const string = str.trim();

  if (string.length < min || string.length > max) {
    return false;
  }

  return true;
};

export const formatDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('sv-SE');
  return formatter.format(date);
};
