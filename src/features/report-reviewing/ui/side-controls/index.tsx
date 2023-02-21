import { reportReviewModel } from 'features/report-reviewing';
import { ReportStatus } from 'shared/api';
import { Button } from 'shared/ui-kit/button';
import { CheckIcon, CloseIcon } from 'shared/ui-kit/icons';
import styles from './styles.module.css';

interface SideControlsProps {
  reportId: string;
  reportStatus: ReportStatus;
  extClassName?: string;
}

export function SideControls({
  reportId,
  reportStatus,
  extClassName,
}: SideControlsProps) {
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
    <div className={extClassName}>
      <Button
        htmlType="button"
        type="negative"
        extClassName={styles.button}
        onClick={handleDecline}
      >
        <CloseIcon className={styles.declineIcon} type="link-active" />
        Отклонить
      </Button>
      <Button
        htmlType="button"
        type="primary"
        extClassName={styles.button}
        onClick={handleApprove}
      >
        <CheckIcon type="interface-white" /> Принять
      </Button>
    </div>
  );
}
