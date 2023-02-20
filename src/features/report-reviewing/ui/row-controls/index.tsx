import cn from 'classnames';
import { useStore } from 'effector-react';
import { reportReviewModel } from 'features/report-reviewing';
import { ReportStatus } from 'shared/api';
import { Button } from 'shared/ui-kit/button';
import styles from './styles.module.css';

interface RowControlsProps {
  reportId: string;
  reportStatus: ReportStatus;
  extClassName?: string;
}

export function RowControls({
  reportId,
  reportStatus,
  extClassName,
}: RowControlsProps) {
  const { approve, decline } = reportReviewModel.events;

  const handleApprove = () => {
    approve(reportId);
  };

  const handleDecline = () => {
    decline(reportId);
  };

  if (reportStatus !== 'reviewing') {
    return null;
  }

  return (
    <div className={cn(styles.container, extClassName)}>
      <Button
        size="small"
        type="primary"
        htmlType="button"
        onClick={handleApprove}
        extClassName={cn(styles.button, styles.button_type_approve)}
      >
        Принять
      </Button>
      <Button
        size="small"
        type="primary"
        htmlType="button"
        onClick={handleDecline}
        extClassName={styles.button}
      >
        Отклонить
      </Button>
    </div>
  );
}
