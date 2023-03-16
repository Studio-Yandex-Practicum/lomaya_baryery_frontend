import type { IIconProps } from './utils';

export * from './alert-icon';
export * from './arrow-left-icon';
export * from './arrow-right-icon';
export * from './award-icon';
export * from './calendar-icon';
export * from './check-icon';
export * from './chevron-down-icon';
export * from './chevron-left-icon';
export * from './chevron-right-icon';
export * from './circle-check-icon';
export * from './circle-stop-icon'; // delete after refactor
export * from './circle-warning-icon';
export * from './circle-cancel';
export * from './circle-forward';
export * from './circle-minus';
export * from './circle-waiting';
export * from './close-icon';
export * from './enter-icon';
export * from './file-check-icon';
export * from './note-edit-icon';
export * from './plus-icon';
export * from './refresh-icon';
export * from './search-icon';
export * from './shield-icon';
export * from './user-icon';
export * from './users-icon';
export * from './zoom-icon';

export type TIcons = {
  AlertIcon: React.FC<IIconProps>;
  ArrowLeftIcon: React.FC<IIconProps>;
  ArrowRightIcon: React.FC<IIconProps>;
  AwardIcon: React.FC<IIconProps>;
  CalendarIcon: React.FC<IIconProps>;
  CheckIcon: React.FC<IIconProps>;
  ChevronDownIcon: React.FC<IIconProps>;
  ChevronLeftIcon: React.FC<IIconProps>;
  ChevronRightIcon: React.FC<IIconProps>;
  CloseIcon: React.FC<IIconProps>;
  EnterIcon: React.FC<IIconProps>;
  FileCheckIcon: React.FC<IIconProps>;
  NoteEditIcon: React.FC<IIconProps>;
  PlusIcon: React.FC<IIconProps>;
  SearchIcon: React.FC<IIconProps>;
  UserIcon: React.FC<IIconProps>;
  UsersIcon: React.FC<IIconProps>;
  ZoomIcon: React.FC<IIconProps>;
  ShieldIcon: React.FC<IIconProps>;
  RefreshIcon: React.FC<IIconProps>;
} & TStatusIcons;

export type TStatusIcons = {
  CircleCheckIcon: React.FC<IIconProps>;
  CircleStopIcon: React.FC<IIconProps>; // delete after refactor
  CircleWarningIcon: React.FC<IIconProps>;
  CircleCancelIcon: React.FC<IIconProps>;
  CircleForwardIcon: React.FC<IIconProps>;
  CircleMinusIcon: React.FC<IIconProps>;
  CircleWaitingIcon: React.FC<IIconProps>;
};
