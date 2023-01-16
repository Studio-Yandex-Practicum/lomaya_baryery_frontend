import { AlertIcon } from './alert-icon';
import { ArrowLeftIcon } from './arrow-left-icon';
import { ArrowRightIcon } from './arrow-right-icon';
import { AwardIcon } from './award-icon';
import { CalendarIcon } from './calendar-icon';
import { CheckIcon } from './check-icon';
import { ChevronDownIcon } from './chevron-down-icon';
import { ChevronLeftIcon } from './chevron-left-icon';
import { ChevronRightIcon } from './chevron-right-icon';
import { CircleCheckIcon } from './circle-check-icon';
import { CircleStopIcon } from './circle-stop-icon';
import { CircleWarningIcon } from './circle-warning-icon';
import { CloseIcon } from './close-icon';
import { EnterIcon } from './enter-icon';
import { FileCheckIcon } from './file-check-icon';
import { NoteEditIcon } from './note-edit-icon';
import { PlusIcon } from './plus-icon';
import { SearchIcon } from './search-icon';
import { UserIcon } from './user-icon';
import { UsersIcon } from './users-icon';
import { ZoomIcon } from './zoom-icon';
import { RefreshIcon } from './refresh-icon';
import type { IIconProps } from './utils';

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
  RefreshIcon: React.FC<IIconProps>;
} & TStatusIcons;

export type TStatusIcons = {
  CircleCheckIcon: React.FC<IIconProps>;
  CircleStopIcon: React.FC<IIconProps>;
  CircleWarningIcon: React.FC<IIconProps>;
};

export {
  AlertIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  AwardIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  CircleStopIcon,
  CircleWarningIcon,
  CloseIcon,
  EnterIcon,
  FileCheckIcon,
  NoteEditIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
  UsersIcon,
  ZoomIcon,
  RefreshIcon,
};
