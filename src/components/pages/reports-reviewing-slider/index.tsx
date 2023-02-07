import { useMemo } from 'react';
import cn from 'classnames';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import {
  useApproveReportMutation,
  useDeclineReportMutation,
  useGetReportsReviewingQuery,
} from '../../../redux-store/api';
import { useAppSelector } from '../../../redux-store/hooks';
import { selectRootShifts } from '../../../redux-store/root-shifts';
import { ContentContainer } from '../../../ui/content-container';
import { ReportDetails } from '../../report-detail';
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon } from '../../../ui/icons';
import { Button } from '../../../ui/button';
import { selectTasks } from '../../../redux-store/reports-slider';
import { Alert } from '../../../ui/alert';
import { Loader } from '../../../ui/loader';
import styles from './styles.module.css';

export function PageReportsReviewingSlider() {
  const { started } = useAppSelector(selectRootShifts);
  const tasks = useAppSelector(selectTasks);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();

  const parentRoutePath = useMemo(() => pathname.slice(0, pathname.lastIndexOf('/')), [pathname]);

  const currentTaskIndex = tasks.findIndex((task) => task.report_id === id);

  const { isError, isLoading } = useGetReportsReviewingQuery(started?.id ?? skipToken);

  const [approveRequest] = useApproveReportMutation();
  const [declineRequest] = useDeclineReportMutation();

  const handlePrevTask = () => {
    if (currentTaskIndex > 0) {
      const prevTaskIndex = currentTaskIndex - 1;
      navigate(`${parentRoutePath}/${tasks[prevTaskIndex].report_id}`);
    }
  };

  const handleNextTask = () => {
    const lastTaskIndex = tasks.length - 1;
    if (currentTaskIndex < lastTaskIndex) {
      const nextTaskIndex = currentTaskIndex + 1;
      navigate(`${parentRoutePath}/${tasks[nextTaskIndex].report_id}`);
    }
  };

  const content = useMemo(() => {
    if (isError) {
      return <h1 className="text text_type_main-large text_color_primary">Что-то пошло не так</h1>;
    }

    if (isLoading) {
      return <Loader extClassName={styles.slider__loader} />;
    }

    if (currentTaskIndex === -1) {
      return <Alert extClassName={styles.slider__alert} title="Отчёт не найден" />;
    }

    const navigateAfterReview = () => {
      if (tasks.length > 0) {
        if (currentTaskIndex === tasks.length - 1) {
          navigate(`${parentRoutePath}/${tasks[currentTaskIndex - 1].report_id}`);
          return;
        }
        navigate(`${parentRoutePath}/${tasks[currentTaskIndex + 1].report_id}`);
        return;
      }

      navigate(parentRoutePath);
    };

    const handleApprove = async () => {
      try {
        await approveRequest({
          reportId: tasks[currentTaskIndex].report_id,
          shiftId: tasks[currentTaskIndex].shift_id,
          patch: { task_status: 'approved' },
        }).unwrap();

        navigateAfterReview();
      } catch (error) {
        console.error(error);
      }
    };

    const handleDecline = async () => {
      try {
        await declineRequest({
          reportId: tasks[currentTaskIndex].report_id,
          shiftId: tasks[currentTaskIndex].shift_id,
          patch: { task_status: 'declined' },
        }).unwrap();

        navigateAfterReview();
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <ReportDetails
        extClassName={styles.slider__taskDetails}
        taskUrl={tasks[currentTaskIndex].task_url}
        photoUrl={tasks[currentTaskIndex].photo_url}
        userName={tasks[currentTaskIndex].user_name}
        userSurname={tasks[currentTaskIndex].user_surname}
        createdAt={tasks[currentTaskIndex].report_created_at}
        accept={handleApprove}
        decline={handleDecline}
      />
    );
  }, [
    isError,
    isLoading,
    currentTaskIndex,
    tasks,
    approveRequest,
    declineRequest,
    navigate,
    parentRoutePath,
  ]);

  if (!started) {
    return <Navigate to={parentRoutePath} />;
  }

  return (
    <>
      <ContentContainer>
        <Link to={parentRoutePath} className={cn(styles.slider__backLink, 'link')}>
          <ChevronLeftIcon type="interface-secondary" />
          <p
            className={cn(
              styles.slider__linkText,
              'text',
              'text_type_main-small',
              'text_color_secondary',
              'm-0'
            )}
          >
            Назад
          </p>
        </Link>
        {content}
      </ContentContainer>
      {!isLoading && !isError && tasks.length > 0 && currentTaskIndex !== -1 && (
        <nav className={styles.slider__nav}>
          <Button
            extClassName={styles.slider__navButton}
            htmlType="button"
            type="secondary"
            onClick={handlePrevTask}
          >
            <ArrowLeftIcon type="link-active" />
            Предыдущий отчёт
          </Button>
          <p className="text text_type_main-default text_color_secondary m-0">{`${
            currentTaskIndex + 1
          } из ${tasks.length}`}</p>
          <Button
            extClassName={styles.slider__navButton}
            htmlType="button"
            type="secondary"
            onClick={handleNextTask}
          >
            Следующий отчёт
            <ArrowRightIcon type="link-active" />
          </Button>
        </nav>
      )}
    </>
  );
}
