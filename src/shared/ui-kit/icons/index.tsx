import type { IIconProps } from './utils';

export { AlertIcon } from './alert-icon';
export { ArrowLeftIcon } from './arrow-left-icon';
export { ArrowRightIcon } from './arrow-right-icon';
export { AwardIcon } from './award-icon';
export { CalendarIcon } from './calendar-icon';
export { CheckIcon } from './check-icon';
export { ChevronDownIcon } from './chevron-down-icon';
export { ChevronLeftIcon } from './chevron-left-icon';
export { ChevronRightIcon } from './chevron-right-icon';
export { CircleCheckIcon } from './circle-check-icon';
export { CircleStopIcon } from './circle-stop-icon';
export { CircleWarningIcon } from './circle-warning-icon';
export { CloseIcon } from './close-icon';
export { EnterIcon } from './enter-icon';
export { FileCheckIcon } from './file-check-icon';
export { NoteEditIcon } from './note-edit-icon';
export { PlusIcon } from './plus-icon';
export { RefreshIcon } from './refresh-icon';
export { SearchIcon } from './search-icon';
export { ShieldIcon } from './shield-icon';
export { UserIcon } from './user-icon';
export { UsersIcon } from './users-icon';
export { ZoomIcon } from './zoom-icon';

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
  CircleStopIcon: React.FC<IIconProps>;
  CircleWarningIcon: React.FC<IIconProps>;
};
