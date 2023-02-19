import React, { useMemo } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { StatusLabel } from '../shared/ui-kit/status-label';
import { Button } from '../shared/ui-kit/button';
import { CellDate, CellLink, CellText } from '../shared/ui-kit/table';
import { ZoomIcon } from '../shared/ui-kit/icons';
import styles from './styles.module.css';
import { Reports } from '../../services/api/models';

interface ICellPreviewProps {
  id: string;
  img: string;
}

const CellPreview: React.FC<ICellPreviewProps> = ({ id, img }) => (
  <Link to={`${id}`} className={styles.cellPreview}>
    <img src={img} className={styles.cellPreview__image} alt="user task" />
    <ZoomIcon type="interface-white" className={styles.cellPreview__icon} />
  </Link>
);

interface IReportRowProps {
  extClassName?: string;
  reportData: Reports.IReport;
  approve?: () => void;
  decline?: () => void;
}

export const ReportRow: React.FC<IReportRowProps> = ({
  reportData,
  approve,
  decline,
  extClassName,
}) => {
  const actions = useMemo(() => {
    if (reportData.report_status) {
      if (reportData.report_status === 'approved') {
        return (
          <StatusLabel
            icon="CircleCheckIcon"
            type="approved"
            statusText="Задание принято"
          />
        );
      }

      if (reportData.report_status === 'declined') {
        return (
          <StatusLabel
            icon="CircleStopIcon"
            type="rejected"
            statusText="Задание отклонено"
          />
        );
      }
    }

    return (
      <div className={styles.taskRow__actions}>
        <Button
          size="small"
          type="primary"
          htmlType="button"
          onClick={approve}
          extClassName={[styles.button, styles.taskRow__approveButton].join(
            ' '
          )}
        >
          Принять
        </Button>
        <Button
          extClassName={styles.button}
          size="small"
          type="primary"
          htmlType="button"
          onClick={decline}
        >
          Отклонить
        </Button>
      </div>
    );
  }, [reportData]); // eslint-disable-line

  return (
    <div className={cn(styles.taskRow, extClassName, 'tableContentRow')}>
      <CellLink
        routeTo={reportData.report_id}
        text={reportData.task_description}
      />
      <CellText
        type="accent"
        text={`${reportData.user_name} ${reportData.user_surname}`}
      />
      <CellDate type="default" date={reportData.report_created_at} />
      <CellPreview img={reportData.photo_url} id={reportData.report_id} />
      {actions}
    </div>
  );
};
