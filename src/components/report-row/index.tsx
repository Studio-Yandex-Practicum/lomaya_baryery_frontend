import React, { useMemo } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { IReport } from '../../redux-store/api/models';
import { StatusLabel } from '../../ui/status-label';
import { Button } from '../../ui/button';
import { CellDate, CellLink, CellText } from '../../ui/table';
import { ZoomIcon } from '../../ui/icons';
import styles from './styles.module.css';

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
  reportData: IReport;
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
        return <StatusLabel icon="CircleCheckIcon" type="approved" statusText="Задание принято" />;
      }

      if (reportData.report_status === 'declined') {
        return <StatusLabel icon="CircleStopIcon" type="rejected" statusText="Задание отклонено" />;
      }
    }

    return (
      <div className={styles.taskRow__actions}>
        <Button
          size="small"
          type="primary"
          htmlType="button"
          onClick={approve}
          extClassName={styles.taskRow__approveButton}
        >
          Принять
        </Button>
        <Button size="small" type="primary" htmlType="button" onClick={decline}>
          Отклонить
        </Button>
      </div>
    );
  }, [reportData]); // eslint-disable-line

  return (
    <div className={cn(styles.taskRow, extClassName, 'tableContentRow')}>
      <CellLink routeTo={reportData.report_id} text={reportData.task_description} />
      <CellText type="accent" text={`${reportData.user_name} ${reportData.user_surname}`} />
      <CellDate type="default" date={reportData.report_created_at} />
      <CellPreview img={reportData.photo_url} id={reportData.report_id} />
      {actions}
    </div>
  );
};
