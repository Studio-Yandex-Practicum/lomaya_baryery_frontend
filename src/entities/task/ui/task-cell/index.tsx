import { useMemo } from 'react';
import {
  CircleCancelIcon,
  CircleCheckIcon,
  CircleForwardIcon,
  CircleMinusIcon,
  CircleWaitingIcon,
  CircleWarningIcon,
} from 'shared/ui-kit/icons';
import { withTooltip } from 'shared/ui-kit/tooltip';
import styles from './styles.module.css';

interface StatusCellProps {
  status:
    | 'not_participate'
    | 'waiting'
    | 'skipped'
    | 'reviewing'
    | 'approved'
    | 'declined';
}

function StatusCell({ status, ...props }: StatusCellProps) {
  const renderIcon = useMemo(() => {
    switch (status) {
      case 'approved':
        return <CircleCheckIcon color="green" />;
      case 'reviewing':
        return <CircleWarningIcon color="yellow" />;
      case 'declined':
        return <CircleCancelIcon color="red" />;
      case 'not_participate':
        return <CircleMinusIcon color="gray" />;
      case 'skipped':
        return <CircleForwardIcon color="orange" />;
      case 'waiting':
        return <CircleWaitingIcon color="blue-dark" />;
      default:
        // eslint-disable-next-line no-case-declarations, @typescript-eslint/no-unused-vars
        const exhaustiveCheck: never = status;
        return null;
    }
  }, [status]);

  return (
    <div className={styles.taskCell} {...props}>
      {renderIcon}
    </div>
  );
}

const StatusCellWithTooltip = withTooltip<StatusCellProps>(StatusCell);

interface ITaskCellProps {
  description: string | null;
  date: string;
  status: StatusCellProps['status'];
}

export function TaskCell({ description, date, status }: ITaskCellProps) {
  const statusText = (() => {
    switch (status) {
      case 'approved':
        return 'Принято';
      case 'reviewing':
        return 'Проверяется';
      case 'declined':
        return 'Отклонено';
      case 'not_participate':
        return 'Не назначалось\u000A(участник присоединился позже)';
      case 'skipped':
        return 'Пропущено';
      case 'waiting':
        return 'Выполняется';
      default:
        // eslint-disable-next-line no-case-declarations, @typescript-eslint/no-unused-vars
        const exhaustiveCheck: never = status;
        return '';
    }
  })();

  const tooltipText = `${date}\u000AЗадание: ${
    description || 'загружается...'
  }\u000A${statusText}`;

  return (
    <StatusCellWithTooltip
      tooltipText={tooltipText}
      status={status}
      tooltipEnabled
    />
  );
}
